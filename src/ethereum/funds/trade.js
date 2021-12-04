import axios from 'axios';
import { getAssetsDecimals } from './../../sub-graph-integrations/assets-and-adapters/index';
import { fullNumber } from '../utils';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { getContracts } from './deposits-withdraws';
import VaultLib from "./../abis/VaultLib.json";
import ParaSwapV4Adapter  from './../abis/ParaSwapV4Adapter.json';
import IntegrationManager from './../abis/IntegrationManager.json'

export const getParaswapData = async (
    fundAddress,
    src,
    dest,
    amount,
    slippage
) => {
    try {
        const decimalData = await getAssetsDecimals([src, dest]);
        console.log("DECIMAL DATA: "+JSON.stringify(decimalData));
        if (!decimalData || decimalData.assets.length != 2)
            return false;
        var srcSymbol, srcDecs;
        var destSymbol, destDecs;
        if (decimalData.assets[0].id.toLowerCase() == src.toLowerCase()) {
            srcSymbol = decimalData.assets[0].symbol;
            srcDecs = parseInt(decimalData.assets[0].decimals);
            destSymbol = decimalData.assets[1].symbol;
            destDecs = parseInt(decimalData.assets[1].decimals);
        } else {
            srcSymbol = decimalData.assets[1].symbol;
            srcDecs = parseInt(decimalData.assets[1].decimals);
            destSymbol = decimalData.assets[0].symbol;
            destDecs = parseInt(decimalData.assets[0].decimals);
        }

        const scaledAmount = fullNumber(amount * 10**srcDecs);

        const getPathRequestEndpoint = `https://apiv4.paraswap.io/v2/prices/?network=1&includeContractMethods=multiSwap&side=SELL&from=${srcSymbol}&to=${destSymbol}&amount=${scaledAmount}&fromDecimals=${srcDecs}&toDecimals=${destDecs}`
        const { data } = await axios.get(getPathRequestEndpoint);

        const {
            bestRoute,
            fromUSD,
            toUSD,
            priceWithSlippage,
            destAmount
        } = data.priceRoute;

        console.log("Expected amount: "+data.priceRoute.details.destAmount)
        var minSlippageExpected = new BigNumber(data.priceRoute.details.destAmount)
        minSlippageExpected = fullNumber(parseInt(minSlippageExpected.multipliedBy(new BigNumber(100-slippage)).dividedBy(new BigNumber(100))));
    
        console.log("minSlippageExpected: "+minSlippageExpected.toString());

        var paramBuilderBody = {
            referrer: "Dexify",
            userAddress: fundAddress,
            receiver: fundAddress,
            srcToken: src,
            destToken: dest,
            fromDecimals: srcDecs,
            toDecimals: destDecs,
            srcAmount: scaledAmount.toString(),
            destAmount: minSlippageExpected.toString(),
            priceRoute: data.priceRoute,
        }

        var pPath = await axios.post("https://apiv4.paraswap.io/v2/transactions/1?skipChecks=true&onlyParams=true&useReduxToken=false", paramBuilderBody, {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        });

        if (pPath.status != 200)
            return false;

        var contractData = pPath.data;

        return {
            contractData,
            fromUSD,
            toUSD,
            priceWithSlippage,
            minSlippageExpected,
            srcDecs,
            destDecs,
            src,
            dest,
            outgoingAssetAmount: scaledAmount
        }

    } catch(e) {
        console.log("Getting paraswap data error: "+e)
        return false;
    }

    
}

export const doParaswapTrade = async (
    fundAddress,
    contractData,
    provider
) => {
    provider = new ethers.providers.Web3Provider(provider);
    const signer = await provider.getSigner();

    const { comptrollerContract } = await getContracts(fundAddress, signer);

    
}

export const getFundAvailable = async (fundAddress, asset, provider) => {
    try {
        provider = new ethers.providers.Web3Provider(provider);
        
        const VaultLibInterface = new ethers.utils.Interface(
            JSON.parse(JSON.stringify(VaultLib.abi))
        );

        const assetContract = new ethers.Contract(
            asset,
            VaultLibInterface,
            provider
        );

        const balance = await assetContract.balanceOf(fundAddress);

        return balance;
    } catch (e) {
        console.log(e)
        return 0
    }
}

export const getTradePaths = async (fund, from, to, amount, slippage) => {
    var swapPaths = [];

    var paraswapData = await getParaswapData(fund, from, to, amount, slippage);
    console.log("paraswapData: "+JSON.stringify(paraswapData))
    if (paraswapData) {
        swapPaths.push({
            exchange: "Paraswap V4",
            price: 1/parseFloat(parseInt(paraswapData.priceWithSlippage) / (10**paraswapData.destDecs)),
            amount: parseFloat(parseInt(paraswapData.contractData.data.expectedAmount) / (10**paraswapData.destDecs)),
            ...paraswapData
        })
    }

    return swapPaths;
}

export const doTrade = async (fund, provider, pathData) => {
    provider = new ethers.providers.Web3Provider(provider);
    const signer = await provider.getSigner();
    var integrationData;
    const abiCoder = new ethers.utils.AbiCoder();
    console.log("PATH DATA: "+JSON.stringify(pathData))

    const { comptrollerContract } = await getContracts(fund, provider);
    console.log("COMPTROLLER LIB ADDRESS: "+comptrollerContract.address)
    switch(pathData.exchange) {
        case "Paraswap V4":
            var paths = [];
            for(var j = 0; j < pathData.contractData.data.path.length; j++) {
                var routes = [];
                for(var i = 0; i < pathData.contractData.data.path[j].routes.length; i++) {
                    var route = pathData.contractData.data.path[j].routes[i];
                    routes.push([
                            route.exchange,
                            route.targetExchange,
                            route.percent,
                            route.payload,
                            route.networkFee
                        ])
                }

                paths.push([
                    pathData.contractData.data.path[j].to,
                    pathData.contractData.data.path[j].totalNetworkFee,
                    routes
                ])
            }

            const integrationData = abiCoder.encode(['uint256', 'uint256', 'address', 'uint256', 'tuple(address,uint256,tuple(address,address,uint256,bytes,uint256)[])[]'], [
                pathData.minSlippageExpected.toString(),
                pathData.contractData.data.expectedAmount.toString(),
                pathData.src,
                pathData.outgoingAssetAmount.toString(),
                paths
            ]);

            const integrationCallArgs = abiCoder.encode(['address', 'bytes4', 'bytes'], [
                ParaSwapV4Adapter.address,
                '0x03e38a2b', // takeOrder
                integrationData
            ]);

            const receipt = await comptrollerContract.callOnExtension(
                IntegrationManager.address,
                '0',
                integrationCallArgs
            );
            await receipt.wait();
            break;
    }
}