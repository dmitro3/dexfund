import { FeeHook, feeManagerConfigArgs, FeeSettlementType, IFee } from '@enzymefinance/protocol';
import { ethers, constants, utils } from 'ethers';
import FeeManager from '../abis/FeeManager.json'
import EntranceRateBurnFee from './../abis/EntranceRateBurnFee.json';
import PerformanceFee from './../abis/PerformanceFee.json';
import ManagementFee from './../abis/ManagementFee.json';
import EntranceRateDirectFee from './../abis/EntranceRateDirectFee.json';
import { connectMetamask } from './../../ethereum/web3'

let feeManagerContract,
    entranceRateBurnFeeContract,
    managementFeeContract,
    performanceFeeContract,
    entranceRateDirectFeeContract;


const init = async () => {
    const { provider, signer, address, balance } = await connectMetamask()
    const nonce = await provider.getTransactionCount(address, "pending");

    // GET FeeManager
    const FeeManagerInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(FeeManager.abi))
    );
    feeManagerContract = new ethers.Contract(FeeManager.address, FeeManagerInterface, signer);
    // EntranceRateBurnFees

    const EntranceRateBurnFeeInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(EntranceRateBurnFee.abi))
    );
    entranceRateBurnFeeContract = new ethers.Contract(EntranceRateDirectFee.address, EntranceRateBurnFeeInterface, signer);
    // Performance Fees
    const PerformanceFeeInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(PerformanceFee.abi))
    );
    performanceFeeContract = new ethers.Contract(PerformanceFee.address, PerformanceFeeInterface, signer);


    // Performance Fees
    const ManagementFeeInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(ManagementFee.abi))
    );
    managementFeeContract = new ethers.Contract(ManagementFee.address, ManagementFeeInterface, signer);

}

init();



export async function generateFeeManagerConfigData() {
    const fees = [ManagementFee.address, PerformanceFee.address, EntranceRateDirectFee.address]

    const feeManagerSettingsData = [utils.randomBytes(10), utils.randomBytes(2), utils.randomBytes(2)];

    // await feeManagerContract.registerFees(fees)

    return feeManagerConfigArgs({
        fees: fees,
        settings: feeManagerSettingsData,
    });
}
