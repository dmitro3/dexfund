import { utils, ethers } from 'ethers'
import FundDeployer from './../abis/FundDeployer.json'
import { connectMetamask } from './../web3'
import { managementFeeConfigArgs, performanceFeeConfigArgs, feeManagerConfigArgs } from './../utils/index'
import ManagementFee from './../abis/ManagementFee.json'
import PerformanceFee from './../abis/PerformanceFee.json'
import FeeManager from './../abis/FeeManager.json'
import EntranceRateDirectFee from './../abis/EntranceRateDirectFee.json'
import { IMigrationHookHandler, StandardToken, VaultLib, WETH } from '@enzymefinance/protocol';
import { encodeArgs, } from './../utils/index'
import config from '../../config'
import axios from 'axios';

export { PerformanceFee, ManagementFee, EntranceRateDirectFee }

/* CREATE NEW FUND with Configurations*/


export const createNewFund = async (
    fundOwner,
    fundName,
    denominationAsset,
    timeLockInSeconds,
    feeManagerConfig,
    policyManagerConfigData,
    gaslimit
) => {


    const { provider, signer, address, balance } = await connectMetamask()
    const nonce = await provider.getTransactionCount(address, "pending");

    // GET FundDeployer Interface Data
    const FundDeployerInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(FundDeployer.abi))
    );
    // FundDeployer Contract
    try {
        const fundDeployer = new ethers.Contract(FundDeployer.address, FundDeployerInterface, signer);
        //0xd0a1e359811322d97991e03f863a0c30c2cf029c
        const fund = await fundDeployer.createNewFund(
            fundOwner,
            fundName,
            denominationAsset,
            timeLockInSeconds,
            feeManagerConfig,
            utils.hexlify('0x'),
            { nonce: nonce, gasLimit: gaslimit }
        );

        return fund;
    } catch (error) {
        console.log(error)
    }

}



/**
 * Rate is  number representing a 1%
 */
export const getManagementFees = (rate) => {
    return managementFeeConfigArgs(rate)
}

/**
 * 
 * @param {*} rate Rate in percentage 
 * @param {*} period Period at which it will be applied
 */
export const getPerformanceFees = (rate, period) => {
    return performanceFeeConfigArgs(rate, period);
}

/**
 * Rate is  number representing a 1%
 */
export function getEntranceRateFeeConfigArgs(rate) {
    return encodeArgs(['uint256'], [rate]);
}

export const getFeesManagerConfigArgsData = async (fees, feeManagerSettingsData, signer, allow) => {


    const FeeManagerInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(FeeManager.abi))
    );
    const feeManager = new ethers.Contract(FeeManager.address, FeeManagerInterface, signer);
    let fees_unregister = [];

    try {

        if (allow) {

            const registeredFees = await feeManager.getRegisteredFees();

            if (registeredFees.length === 0) {
                fees_unregister = [ManagementFee.address, PerformanceFee.address]
                await feeManager.registerFees(fees_unregister, { gasLimit: 300000 });
            }

            else {
                if (!registeredFees.includes(ManagementFee.address)) {
                    fees_unregister.push(ManagementFee.address)
                }

                if (!registeredFees.includes(PerformanceFee.address)) {
                    fees_unregister.push(PerformanceFee.address)
                }

                // if(!registeredFees.includes(EntranceRateDirectFee.address)){
                //     fees_unregister.push(EntranceRateDirectFee.address)
                // }

            }
            // Register this fees for app use
            if (fees_unregister.length > 0) {
                await feeManager.registerFees(fees_unregister, { gasLimit: 300000 });
            }
        }


        // Convert Fees
        return feeManagerConfigArgs({
            fees: fees,
            settings: feeManagerSettingsData,
        });


    } catch (error) {
        console.log(error)
    }

}

export const withdraw = async (fundAddress, amount)  => {
    const vaultProxyAddress = await getVaultProxyAddress(fundAddress);
    const { provider, signer, address, balance } = await connectMetamask()
    const vaultProxy = new VaultLib(vaultProxyAddress, provider);
    const weth = "0xd0a1e359811322d97991e03f863a0c30c2cf029c";
    await vaultProxy.connect(signer).withdrawAssetTo(weth, address, utils.parseEther(amount));
}

const getVaultProxyAddress = async (fundAddress) => {
    const url = "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme";
    // const url = config.SUB_GRAPH_ENDPOINT;

    // const investorAddr = '"0x028a968aca00b3258b767edc9dbba4c2e80f7d00"'
    fundAddress = "0xee89c37bf01b115a79242a98ef4f90939b59a58b";
    const fundQuery = {
        query: `
        { 
            newFundCreatedEvents(first: 5, where: {fund: "${fundAddress}"}) {
                id
                fund {
                  id
                }
                vaultProxy {
                  id
                  name
                }
              
            }
        }
    
        `
    }


    let vaultProxy = await axios.post(
        url,
        fundQuery
    ).then((response) => {
        console.log('newFundCreatedEvents: ', response.data);
        const fundData = response.data.data.newFundCreatedEvents
        console.log('fundData', fundData);
        if (fundData) {
            return fundData[0].vaultProxy.id;
        } else {
            return undefined;
        }
    }).catch((err) => {
        console.log("Error: ", err);
    });
    return vaultProxy;
}