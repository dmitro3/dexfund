import { utils, ethers } from "ethers";
import FundDeployer from "./../abis/FundDeployer.json";
import { connectMetamask } from "./../web3";
import {
  managementFeeConfigArgs,
  performanceFeeConfigArgs,
  feeManagerConfigArgs,
  adapterBlacklistArgs,
  adapterWhitelistArgs,
  assetBlacklistArgs,
  assetWhitelistArgs,
  maxConcentrationArgs,
  minMaxInvestmentArgs,
  policyManagerConfigArgs,
} from "./../utils/index";
import ManagementFee from "./../abis/ManagementFee.json";
import PerformanceFee from "./../abis/PerformanceFee.json";
import FeeManager from "./../abis/FeeManager.json";
import ComptrollerLib from "./../abis/ComptrollerLib.json";
import EntranceRateDirectFee from "./../abis/EntranceRateDirectFee.json";
import MinMaxInvestment from "./../abis/MinMaxInvestment.json";
import AssetBlacklist from "./../abis/AssetBlacklist.json";
import AssetWhitelist from "./../abis/AssetWhitelist.json";
import AdapterBlacklist from "./../abis/AdapterBlacklist.json";
import AdapterWhitelist from "./../abis/AdapterWhitelist.json";
import { encodeArgs, convertRateToScaledPerSecondRate } from "./../utils/index";
import { Decimal } from "decimal.js";
import axios from "axios";
import { VaultLib, redeemShares } from "@enzymefinance/protocol";
import configs from "../../config";

export {
  PerformanceFee,
  ManagementFee,
  EntranceRateDirectFee,
  MinMaxInvestment,
  AssetBlacklist,
  AssetWhitelist,
  AdapterBlacklist,
  AdapterWhitelist,
};

/* CREATE NEW FUND with Configurations*/

export const createNewFund = async (
  fundOwner,
  fundName,
  denominationAsset,
  timeLockInSeconds,
  feeManagerConfig,
  policyManagerConfigData,
  gaslimit,
  provider,
  address
) => {
  provider = new ethers.providers.Web3Provider(provider);
  const signer = await provider.getSigner();
  const nonce = await provider.getTransactionCount(address, "pending");

  // GET FundDeployer Interface Data
  const FundDeployerInterface = new ethers.utils.Interface(
    JSON.parse(JSON.stringify(FundDeployer.abi))
  );
  // FundDeployer Contract
  try {
    const fundDeployer = new ethers.Contract(
      FundDeployer.address,
      FundDeployerInterface,
      signer
    );
    //0xd0a1e359811322d97991e03f863a0c30c2cf029c
    const fund = await fundDeployer.createNewFund(
      fundOwner,
      fundName,
      denominationAsset,
      timeLockInSeconds,
      feeManagerConfig,
      policyManagerConfigData,
      { nonce: nonce }
    );

    return fund;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Rate is  number representing a 1%
 */
export const getManagementFees = (rate) => {
  // Must convert from rate to scaledPerSecondRate
  var scaledPerSecondRate = convertRateToScaledPerSecondRate(
    new Decimal(rate / 100)
  );
  return managementFeeConfigArgs(scaledPerSecondRate);
};

/**
 *
 * @param {*} rate Rate in percentage
 * @param {*} period Period at which it will be applied
 */
export const getPerformanceFees = (rate, period) => {
  // The period will default to 30 days
  const defaultPeriod = 2592000;

  // The rate must be (rate/100 * 10**18) or directly rate * 10**16;
  rate = utils.parseEther((rate / 100).toString());
  return performanceFeeConfigArgs(rate, defaultPeriod);
};

/**
 * Rate is  number representing a 1%
 */
export function getEntranceRateFeeConfigArgs(rate) {
  // The rate must be (rate/100 * 10**18) or directly rate * 10**16;
  rate = utils.parseEther((rate / 100).toString());
  return encodeArgs(["uint256"], [rate]);
}

export const getPolicyArgsData = (policies, policySettings) => {
  return encodeArgs(["address[]", "bytes[]"], [policies, policySettings]);
};

/**
 *
 * @param {*} fees
 * @param {*} feeManagerSettingsData
 * @param {*} signer
 * @param {*} allow
 * @returns
 */

export const getFeesManagerConfigArgsData = async (
  fees,
  feeManagerSettingsData,
  signer,
  allow
) => {
  const FeeManagerInterface = new ethers.utils.Interface(
    JSON.parse(JSON.stringify(FeeManager.abi))
  );

  // remove in mainnet
  const feeManager = new ethers.Contract(
    FeeManager.address,
    FeeManagerInterface
  );
  let fees_unregister = [];
  // end

  // try {
  //   if (allow) {
  //     const registeredFees = await feeManager.getRegisteredFees();

  //     if (registeredFees.length === 0) {
  //       fees_unregister = [ManagementFee.address, PerformanceFee.address];
  //       await feeManager.registerFees(fees_unregister, { gasLimit: 300000 });
  //     } else {
  //       if (!registeredFees.includes(ManagementFee.address)) {
  //         fees_unregister.push(ManagementFee.address);
  //       }

  //       if (!registeredFees.includes(PerformanceFee.address)) {
  //         fees_unregister.push(PerformanceFee.address);
  //       }

  //       if (!registeredFees.includes(EntranceRateDirectFee.address)) {
  //         fees_unregister.push(EntranceRateDirectFee.address);
  //       }
  //     }
  //     // Register this fees for app use
  //     if (fees_unregister.length > 0) {
  //       await feeManager.registerFees(fees_unregister, { gasLimit: 300000 });
  //     }
  //   }

    // Convert Fees
    return feeManagerConfigArgs({
      fees: fees,
      settings: feeManagerSettingsData,
    });
  // } catch (error) {
  //   console.log(error);
  // }
};

export const getMinMaxDepositPolicyArgs = (minDeposit, maxDeposit) => {
  return encodeArgs(["uint256", "uint256"], [minDeposit, maxDeposit]);
};

export const getAddressArrayPolicyArgs = (ars) => {
  return encodeArgs(["address[]"], [ars]);
};

export const withdraw = async (fundAddress, amount, signer, provider) => {
  provider = new ethers.providers.Web3Provider(provider)
  signer = await provider.getSigner();
  const ComptrollerLibInterface = new ethers.utils.Interface(
    JSON.parse(JSON.stringify(ComptrollerLib.abi))
  );

  // remove in mainnet
  const comptrollerLibContract = new ethers.Contract(
    ComptrollerLib.address,
    ComptrollerLibInterface,
    signer
  );

  await comptrollerLibContract.redeemShares();
};

const getVaultProxyAddress = async (fundAddress) => {
  const url =  configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.MAINNET_ENDPOINT;
  // const url = config.MAINNET_ENDPOINT;

  fundAddress = "0xee89c37bf01b115a79242a98ef4f90939b59a58b"; //dummy for now.
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
    
        `,
  };

  let vaultProxy = await axios
    .post(url, fundQuery)
    .then((response) => {
      console.log("newFundCreatedEvents: ", response.data);
      const fundData = response.data.data.newFundCreatedEvents;
      console.log("fundData", fundData);
      if (fundData) {
        return fundData[0].vaultProxy.id;
      } else {
        return undefined;
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  return vaultProxy;
};

export const getPolicies = async () => {
  // policies
  const maxConcentrationSettings = maxConcentrationArgs(utils.parseEther("1"));
  const adapterBlacklistSettings = adapterBlacklistArgs([]);
  const adapterWhitelistSettings = adapterWhitelistArgs([
    "0xec5588AEd6c5a1238261D77B450951A3bb4e4dE6",
    "0x532D0653f8E1D998671718cbccB939599A7ebeAA",
  ]);
  const assetBlacklistSettings = assetBlacklistArgs([
    "0x0707de6ea02d4558fea1e0a96cad9003f8c1d384",
  ]);
  const policyManagerConfig = policyManagerConfigArgs({
    policies: [
      maxConcentrationSettings,
      adapterBlacklistSettings,
      adapterWhitelistSettings,
      assetBlacklistSettings,
    ],
    settings: [
      maxConcentrationSettings,
      adapterBlacklistSettings,
      adapterWhitelistSettings,
      assetBlacklistSettings,
    ],
  });

  console.log(policyManagerConfig);
  return policyManagerConfig;
};


export const getTransactions = async (address) => {
  const url = configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.MAINNET_ENDPOINT;
  // const url = config.MAINNET_ENDPOINT;

  const transactionQuery = {
    query: `
    {
      fundEventInterfaces(first: 10, orderBy: timestamp orderDirection: desc) {
        fund{
          name
        }
        __typename
        transaction {
          from
          to
          timestamp
          input
          value

        }
      }
    }
    `
  }

  const transactionQuery1 = {
    query: `
    {
      transferEvents(first: 10, where: {from: "${address}"},orderBy: timestamp orderDirection: desc) {
        fund {
          name
        }
        transaction {
          from
          to
          value
          timestamp
        }
      }
    }
    `,
  };

  const transactionQuery2 = {
    query: `
    {
      transferEvents(first: 10, where: {to: "${address}"},orderBy: timestamp orderDirection: desc) {
        fund {
          name
        }
        transaction {
          from
          to
          value
          timestamp
        }
      }
    }
    `,
  };

  let result1 = await axios
    .post(url, transactionQuery1)
    .then((response) => {
      const transactions = response.data.data.transferEvents;
      console.log("transactions", transactions);
      return transactions || [];
    })
    .catch((err) => {
      console.log("Error: ", err);
    });

  let transactions1 = [];
  if (result1) {
    result1.map((transaction) => {
      transactions1.push({
        fundName: transaction.fund.name,
        to: transaction.transaction.to,
        from: transaction.transaction.from,
        value: transaction.transaction.value,
        type: transaction.transaction.to === address ? "Withdraw" : "Invest",
        timestamp: transaction.transaction.timestamp
      });

      return transactions1
    })
  }

  let result2 = await axios
    .post(url, transactionQuery2)
    .then((response) => {
      const transactions = response.data.data.transferEvents;
      console.log("transactions", transactions);
      return transactions || [];
    })
    .catch((err) => {
      console.log("Error: ", err);
    });

  let transactions2 = [];
  if (result2) {
    result2.map((transaction) => {
      transactions2.push({
        fundName: transaction.fund.name,
        to: transaction.transaction.to,
        from: transaction.transaction.from,
        value: transaction.transaction.value,
        type: transaction.transaction.to === address ? "Withdraw" : "Invest",
        timestamp: transaction.transaction.timestamp
      });

      return transactions2;
    })
  }
  let result = [].concat(transactions1).concat(transactions2);
  result.sort((a, b) => {
    return a.timestamp > b.timestamp;
  });
  return result.slice(0, 5) || [];
  // return [];
};

export const getEthPrice = async () => {
  const url =  configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.MAINNET_ENDPOINT;

  const priceQuery = {
    query: `
    { 
      currency(id:"ETH") {
        price {
          price
        }
      }
    }
    `,
  };

  let response = await axios.post(url, priceQuery);
  console.log("prices: ", response.data);
  const currency = response.data.data.currency;
  console.log("prices", currency);
  return parseFloat(currency.price.price) || 0;
};
