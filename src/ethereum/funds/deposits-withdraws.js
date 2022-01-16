import {
  ethers,
  providers
} from "ethers";
import FundActionsWrapper from "./../abis/FundActionsWrapper.json";
import VaultLib from "./../abis/VaultLib.json";
import ComptrollerLib from "./../abis/ComptrollerLib.json";
import MinMaxInvestment from "./../abis/MinMaxInvestment.json";

const getProvider = (onboardProvider) => {
  return new ethers.providers.Web3Provider(onboardProvider);
};

export const getContracts = async (fundAddress, provider) => {
  const signer = await provider.getSigner();

  const VaultLibInterface = new ethers.utils.Interface(
    JSON.parse(JSON.stringify(VaultLib.abi))
  );
  const ComptrollerLibInterface = new ethers.utils.Interface(
    JSON.parse(JSON.stringify(ComptrollerLib.abi))
  );

  const vaultLibContract = new ethers.Contract(
    fundAddress,
    VaultLibInterface,
    signer
  );

  console.log('getContracts: ', fundAddress, vaultLibContract);

  // Estimation
  let comptroller;
  try {

    const comptroller = await vaultLibContract.getAccessor();
    const comptrollerContract = new ethers.Contract(
      comptroller,
      ComptrollerLibInterface,
      signer
    );

    console.log('getComptroller Contracts: ', comptroller)
    const denominationAsset = await comptrollerContract.getDenominationAsset();

    // Use VaultLib interface for shares functions
    const assetContract = new ethers.Contract(
      denominationAsset,
      VaultLibInterface,
      signer
    );

    return {
      assetContract,
      comptrollerContract,
      vaultLibContract,
    };
  } catch (e) {
    console.log('error: ', e);
  }
  return comptroller;
};

export const getDenominationAllowance = async (
  fundAddress,
  investor,
  provider
) => {
  provider = getProvider(provider);
  const signer = await provider.getSigner();
  console.log('signer: ', signer);
  const {
    assetContract,
    comptrollerContract
  } = await getContracts(
    fundAddress,
    provider
  );

  const allowance = await assetContract.allowance(
    investor,
    comptrollerContract.address
  );

  return allowance;
};

export const approveForInvestment = async (fundAddress, provider, amount) => {
  provider = getProvider(provider);
  const signer = await provider.getSigner();

  const {
    assetContract,
    comptrollerContract
  } = await getContracts(
    fundAddress,
    provider
  );

  const receipt = await assetContract.approve(
    comptrollerContract.address,
    amount
  );
  await receipt.wait();

  return;
};

export const investFundDenomination = async (
  fundAddress,
  investor,
  provider,
  amount
) => {
  provider = getProvider(provider);
  const signer = await provider.getSigner();
  const {
    comptrollerContract
  } = await getContracts(fundAddress, provider);

  const receipt = await comptrollerContract.buyShares(
    // [investor],
    [investor],
    [amount],
    [1]
  );

  await receipt.wait();
};

export const getDenominationBalance = async (
  fundAddress,
  investor,
  provider
) => {
  provider = getProvider(provider);
  const signer = await provider.getSigner();

  const {
    assetContract
  } = await getContracts(fundAddress, provider);

  const balance = await assetContract.balanceOf(investor);

  return balance;
};

export const redeemAllShares = async (fundAddress, provider) => {
  provider = getProvider(provider);
  const signer = await provider.getSigner();

  const {
    comptrollerContract
  } = await getContracts(fundAddress, provider);

  const receipt = await comptrollerContract.redeemShares();
  console.log('withdraw: ', receipt);
  await receipt.wait();
};

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

export const getFundMinMaxAdapter = async (fundAddress, provider) => {
  provider = getProvider(provider);
  const signer = await provider.getSigner();

  const {
    comptrollerContract
  } = await getContracts(fundAddress, provider);

  const MinMaxInterface = new ethers.utils.Interface(
    JSON.parse(JSON.stringify(MinMaxInvestment.abi))
  );

  const adapter = new ethers.Contract(
    MinMaxInvestment.address,
    MinMaxInterface,
    signer
  );

  var data = await adapter.getFundSettings(comptrollerContract.address);

  return data;
};