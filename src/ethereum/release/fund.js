import { utils, ethers } from 'ethers'
import FundDeployer from './../abis/FundDeployer.json'
import { connectMetamask } from './../web3'





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
            { nonce: nonce, gasLimit:  gaslimit }
        );

        return fund;
    } catch (error) {
        console.log(error)
    }

}



