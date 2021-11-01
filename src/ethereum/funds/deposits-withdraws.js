import { ethers } from 'ethers';
import FundActionsWrapper from './../abis/FundActionsWrapper.json';
import VaultLib from './../abis/VaultLib.json';
import ComptrollerLib from './../abis/ComptrollerLib.json';

export const getDenominationAllowance = async (
    fundAddress,
    investor,
    provider
) => {
    const VaultLibInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(VaultLib.abi))
    );
    const ComptrollerLibInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(ComptrollerLib.abi))
    );

    const vaultLibContract = new ethers.Contract(
        fundAddress,
        VaultLibInterface,
        provider
    );

    // Estimation
    const comptroller = await vaultLibContract.getAccessor();
    const comptrollerContract = new ethers.Contract(
        comptroller,
        ComptrollerLibInterface,
        provider
    );
    const denominationAsset = await comptrollerContract.getDenominationAsset();

    // Use VaultLib interface for shares functions
    const assetContract = new ethers.Contract(
        denominationAsset,
        VaultLibInterface,
        provider
    );

    const allowance = await assetContract.allowance(investor, comptroller);

    return allowance;
}

export const investFundDenomination = async (
    fundAddress,
    investor,
    provider,
    amount
) => {

}

// export const investFundEth = async (
//     fundAddress,
//     amount,
//     buyer,
//     provider
// ) => {

// }

// export const estimateInvestFundEth = async (
//     fundAddress,
//     amount,
//     buyer,
//     provider
// ) => {
//     var signer = await provider.getSigner();

//     // Interfaces
//     const FundActionsWrapperInterface = new ethers.utils.Interface(
//         JSON.parse(JSON.stringify(FundActionsWrapper.abi))
//     );
//     const VaultLibInterface = new ethers.utils.Interface(
//         JSON.parse(JSON.stringify(VaultLib.abi))
//     );
//     const ComptrollerLibInterface = new ethers.utils.Interface(
//         JSON.parse(JSON.stringify(ComptrollerLib.abi))
//     );

//     // Contracts
//     const actionsWrapperContract = new ethers.Contract(
//         FundActionsWrapper.address,
//         FundActionsWrapperInterface,
//         signer
//     );
//     const vaultLibContract = new ethers.Contract(
//         fundAddress,
//         VaultLibInterface,
//         signer
//     );

//     // Estimation
//     const comptroller = await vaultLibContract.getAccessor();
//     const comptrollerContract = new ethers.Contract(
//         comptroller,
//         ComptrollerLibInterface,
//         signer
//     );
//     const denominationAsset = await comptrollerContract.getDenominationAsset();
//     const estimation = await actionsWrapperContract.estimateGas.exchangeAndBuyShares(
//         comptroller,
//         denominationAsset,
//         buyer,

//     );
// }