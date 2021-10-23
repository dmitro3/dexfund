import { utils, ethers } from 'ethers'
import FundDeployer from './../abis/FundDeployer.json'
import { connectMetamask } from './../web3'
import { managementFeeConfigArgs, performanceFeeConfigArgs, feeManagerConfigArgs } from './../utils/index'
import ManagementFee from './../abis/ManagementFee.json'
import PerformanceFee from './../abis/PerformanceFee.json'
import FeeManager from './../abis/FeeManager.json'
import EntranceRateDirectFee from './../abis/EntranceRateDirectFee.json'
import { encodeArgs, } from './../utils/index'


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