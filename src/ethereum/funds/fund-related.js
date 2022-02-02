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
import { toastr } from "react-redux-toastr";
import { getYourInvestments } from "../../sub-graph-integrations";
import { getContracts, getProvider } from "./deposits-withdraws";
import BigNumber from "bignumber.js";

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

  console.log('new fund created: ', fund)

  return fund;
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
  //
  // }
};

export const getMinMaxDepositPolicyArgs = (minDeposit, maxDeposit) => {
  return encodeArgs(["uint256", "uint256"], [minDeposit, maxDeposit]);
};

export const getAddressArrayPolicyArgs = (ars) => {
  return encodeArgs(["address[]"], [ars]);
};

export const withdraw = async (fundAddress, amount, signer, provider) => {
  provider = new ethers.providers.Web3Provider(provider);
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
  const url = configs.DEBUG_MODE
    ? configs.MAINNET_ENDPOINT
    : configs.MAINNET_ENDPOINT;
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
      const fundData = response.data.data.newFundCreatedEvents;

      if (fundData) {
        return fundData[0].vaultProxy.id;
      } else {
        return undefined;
      }
    })
    .catch((err) => {});
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

  return policyManagerConfig;
};

export const getTransactions = async (address) => {
  const url = configs.DEBUG_MODE
    ? configs.MAINNET_ENDPOINT
    : configs.MAINNET_ENDPOINT;
  const query = `{
    transferEvents{
      id    
      fund {
            name
            id
            investmentSharesChanges{
              timestamp
              id
              investor{
                id
              }
              shares
              transaction{
                id
                from
                to
              }
            }
          }
          
  }
  }`;

  const { data } = await axios.post(url, { query });

  let transactions = [];

  const item = data.data.transferEvents[data.data.transferEvents.length - 1];

  data.data.transferEvents[0].fund.investmentSharesChanges.forEach((trans) => {
    if (
      trans.investor.id === address ||
      trans.transaction.from === address ||
      trans.transaction.to === address
    ) {
      transactions.push({
        fundName: data.data.transferEvents[0].fund.name,
        fundId: data.data.transferEvents[0].fund.id,
        id: trans.id,
        investor: trans.investor.id,
        type: trans.transaction.to === address ? "Withdraw" : "Invest",
        value: trans.shares,
        timestamp: trans.timestamp,
        to: trans.transaction.to,
        from: trans.transaction.from,
        trans_id: trans.transaction.id,
      });
    }
  });

  return transactions;
};

export const getFundTransactions = async (address) => {
  const url = configs.DEBUG_MODE
    ? configs.MAINNET_ENDPOINT
    : configs.MAINNET_ENDPOINT;
  // const url = config.MAINNET_ENDPOINT;

  const query = `{
    transferEvents(where:{fund: "0x86fb84e92c1eedc245987d28a42e123202bd6701"}) {
      id    
      fund {
            name
            id
            investmentSharesChanges{
              timestamp
              id
              investor{
                id
              }
              shares
              transaction{
                id
                from
                to
              }
            }
          }
          
  }
  }`;

  const { data } = await axios.post(url, { query });

  let transactions = [];
  const item = data.data.transferEvents[data.data.transferEvents.length - 1];

  item.fund.investmentSharesChanges.forEach((trans) => {
    transactions.push({
      fundName: item.fund.name,
      fundId: item.fund.id,
      id: trans.id,
      investor: trans.investor.id,
      value: trans.shares,
      timestamp: trans.timestamp,
      type: trans.transaction.to === address ? "Invest" : "Withdrawal",
      to: trans.transaction.to,
      from: trans.transaction.from,
      trans_id: trans.transaction.id,
    });
  });

  return transactions;
};

export const getEthPrice = async () => {
  const url = configs.DEBUG_MODE
    ? configs.MAINNET_ENDPOINT
    : configs.MAINNET_ENDPOINT;

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

  const currency = response.data.data.currency;

  return currency ? parseFloat(currency.price.price) || 0 : 0;
};

export const getTopAsset = (fund) => {
  const holdings = fund.portfolio.holdings || [];
  const values = holdings.map(holding => (
      parseFloat(holding.amount) * parseFloat(holding.asset.price.price)
  ));

  var indexOfMaxValue = values.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  var sum = values.reduce((a, b) => { return a + b }, 0);
  if (sum > 0) {
      return ({
          symbol: holdings[indexOfMaxValue].asset.symbol,
          percentage: values[indexOfMaxValue] * 100 / sum
      });
  } else {
    return {
      symbol: holdings[indexOfMaxValue].asset.symbol,
      percentage: 0
    }
  }
}

export const getStartAUM = async (address, memberSince, _ethPrice) => {
  console.log('calc aum: ', address, memberSince, _ethPrice);
  const investments = await getYourInvestments(address, memberSince);
  
  const _yourTotalAUM = investments.reduce((investment1, investment2) => {
    const amount2 = parseFloat(investment2.investmentAmount) || 0;
    const price2 = investment2.asset ? parseFloat(investment2.asset.price.price) : 0;
    return investment1 + amount2 * price2 * _ethPrice;
  }
  , 0);
  console.log('calc aum: ', _yourTotalAUM);

  return _yourTotalAUM;
}


export const getShareBalance = async (fundAddress, provider) => {
  provider = getProvider(provider);
  const signer = await provider.getSigner();

  // const {
  //   comptrollerContract
  // } = await getContracts(fundAddress, provider);

  const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ];

  const erc20 = new ethers.Contract(fundAddress, abi, signer);
  console.log('share_balance: ', signer.getAddress());
  const balance = await erc20.balanceOf(signer.getAddress());
  const decimals = await erc20.decimals();
  const _balance = ethers.BigNumber.from(balance);
  const _decimals = ethers.BigNumber.from(decimals)
  const __balance = _balance.mul("1000").div(ethers.BigNumber.from(10).pow(_decimals));
  return ethers.utils.formatUnits(__balance, 3); ;
}