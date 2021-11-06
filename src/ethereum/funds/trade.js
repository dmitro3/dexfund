import axios from 'axios';
import { getAssetsDecimals } from './../../sub-graph-integrations/assets-and-adapters/index';
import { fullNumber } from '../utils';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { getContracts } from './deposits-withdraws';

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
            referrer: "RADAR",
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
            minSlippageExpected
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