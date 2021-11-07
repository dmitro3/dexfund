import axios from "axios";
import { convertScaledPerSecondRateToRate } from "../../ethereum/utils";
import configs from "./../../config";

// Get all investments
export const getAllInvestments = async () => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
            {
                funds(first: 1000, orderBy: lastKnowGavInEth, orderDirection: desc) {
                  id
                  name
                  shares {
                    totalSupply
                  }
                  accessor {
                    denominationAsset {
                      symbol
                    }
                  }
                  portfolio {
                    holdings {
                      amount
                      asset {
                        symbol
                        price {
                          price
                        }
                      }
                    }
                  }
                  investmentCount
                  lastKnowGavInEth
                  trackedAssets {
                    name
                    symbol
                  }
                }
              }
        `,
    });

    return data.data.funds;
  } catch (error) {}
};

// Get all investments
export const getFiveInvestments = async () => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
            {
                funds(first: 5, orderBy: lastKnowGavInEth, orderDirection: desc) {
                  id
                  name
                  accessor {
                    denominationAsset {
                      symbol
                    }
                  }
                  investmentCount
                  lastKnowGavInEth
                  trackedAssets {
                    name
                    symbol
                  }
                }
              }
        `,
    });

    return data.data.funds || [];
  } catch (error) {
    return [];
  }
};

// Get your investemnt funds
export const getYourInvestments = async (address) => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;

    const q = address
      ? `
    { 
        sharesBoughtEvents(where:  {investor_contains: "${address}"}){
            investmentAmount
            investmentState {
                shares
            }
            fund {
                name
                id
                accessor{
                  denominationAsset{
                    name
                    price{
                      price
                    }
                  }
                }  
            }
            investor {
                firstSeen
                investorSince
            }
        } 
    }`
      : `
        { 
            sharesBoughtEvents(first: 5, orderBy: timestamp, orderDirection: desc){
                investmentAmount
                investmentState {
                    shares
                }
                fund {
                    name
                    id
                    accessor{
                      denominationAsset{
                        name
                        price{
                          price
                        }
                      }
                    } 
                }
                investor {
                    firstSeen
                    investorSince
                }
            } 
        }`;
    const { data } = await axios.post(endpoint, {
      query: q,
    });

    return data.data.sharesBoughtEvents;
  } catch (error) {}
};

// get featured Investments

// Get your investemnt funds per fund
export const getYourInvestmentsPerFund = async (fundId, address) => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
        {
          fund(id: "${fundId}") {
            investments(where: {investor: "${address}"}) {
              state {
                fundState {
                  portfolio {
                    holdings {
                      price {
                        price
                      }
                      amount
                      asset {
                        symbol
                      }
                    }
                  }
                }
              }
            } 
          }
        }
    
        `,
    });

    return data.data.fund.investments;
  } catch (error) {}
};

// Fund Compostion
export const getFundCompostion = async (fundId) => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
       {
        fund(id: "${fundId}"){
         name
         id
         shares {
           totalSupply
         }
         portfolio {
          holdings {
            id
            amount
            asset {
              symbol
              price {
                price
              }
            }
          }
        }
        
          lastKnowGavInEth
        }
      }   
       `,
    });

    return data.data.fund;
  } catch (error) {}
};

export const ListAllTrades = async () => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.get(endpoint, {
      query: `
      {
        trades( orderBy: timestamp, orderDirection:desc){
          id
          fund{
            id
            name
          }
          adapter{
            id
            identifier
            blacklisted{
              listed
            }
          }
          timestamp
          
        }
      }
      `,
    });

    return data.data;
  } catch (error) {}
};

export const getFundAllFunds = async () => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
       {
        funds(where: {lastKnowGavInEth_gte: "2"}, first:5){
         name
         id
          accessor{
            denominationAsset{
              name
              symbol
            }
          }
         portfolio {
          holdings(where:{amount_gte: "0.2"}, orderBy: amount, orderDirection: desc) {
            id
            amount
            asset {
              symbol
              price {
                price
              }
            }
          }
        }
          lastKnowGavInEth
        }
      }  
       `,
    });

    return data.data.funds;
  } catch (error) {}
};

// Claim Rewards
export const getClaimRewards = async (fundId) => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
          {
            claimRewardsTrades (where: {fund: "${fundId}"}){
              method
              adapter  {
                identifier
              }
              incomingAssetAmounts {
                asset {
                  symbol
                  price {
                    price
                  }
                }
                amount
              }
              timestamp
            }
          }
       `,
    });

    return data.data.claimRewardsTrades;
  } catch (error) {}
};

// Get Ruleset
export const getRuleSet = async (fundId) => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
          {
            minMaxInvestmentFundSettingsSetEvents(where: {fund: "${fundId}"}){
              fund{
                name
              }
              minInvestmentAmount
              maxInvestmentAmount
              
            }
          }
       `,
    });

    return data.data.minMaxInvestmentFundSettingsSetEvents;
  } catch (error) {}
};

export const getLiquidityPools = async () => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
       {
        uniswapV2PoolAssetDetails{
          token0{
            id
            symbol
            name
            price{
              price
            }
          }
          token1{
            id
            name
            symbol
            price{
              price
            }
          }
        }
      } 
       `,
    });

    return data.data.uniswapV2PoolAssetDetails;
  } catch (error) {}
};

export const getAUM = async (fundId) => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;

    let results;
    await axios
      .post(endpoint, {
        query: `
      {
        fund(id: "${fundId}") {
          investmentCount
          name
          portfolio {
            holdings {
              amount
              asset {
                symbol
                price {
                  price
                }
              }
            }
          }
          shares {
            totalSupply
          }
        }
      }
      
      
                `,
      })
      .then((res) => {
        results = res.data.data.fund;
      });

    const holdings = results.portfolio.holdings;

    let AUM = 0;
    holdings.forEach((holding) => {
      const amount =
        parseFloat(holding.amount) * parseFloat(holding.asset.price.price);
      AUM += amount;
    });

    return AUM;
  } catch (error) {}
};

/**
 * Fund Transactions
 */

export const allFundTransactions = async (fundId) => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.MAINNET_ENDPOINT;
  const { data } = await axios.post(url, {
    query: `{
    fund(id: "${fundId}") {
     id 
     name
      sharesChanges(orderBy: timestamp, orderDirection: desc) {
        shares
        timestamp
        fundState{
          id 
          portfolio{
            id
            holdings{
              id
              asset{
                id
                symbol
                name
              }
              price{
                price
              }
            }
          }  
        }
        ... on SharesBoughtEvent{
          id 
          investmentAmount
          asset{
            id
            name
            symbol
            price{
              price
            }
          }
          investor{
            id 
          }
          transaction{
            id
            from
            to 
          }
        }
        
        ...on SharesRedeemedEvent{
          id 
          investor{
            id
          }
          fund {
            id
            name
            accessor{
              id
              denominationAsset{
                id 
                name
                symbol
              }
            }
          }
          
          payoutAssetAmounts{
            asset{
              id
              name
              symbol
            }
            amount
            price{
              price
            }
          }
          transaction{
            id 
            from 
            to
          }
        }
      }
    } 
  }`,
  });

  const transaction = data.data.fund.sharesChanges
    .map((item) => {
      if (item.fund) {
        // withdraw
        return {
          shares: item.shares,
          timestamp: parseInt(item.timestamp),
          transaction_id: item.transaction.id,
          to: item.transaction.to,
          type: "WITHDRAW",
          from: item.transaction.from,
          amount: item.payoutAssetAmounts
            ? item.payoutAssetAmounts[0].amount
            : 0,
          symbol: item.payoutAssetAmounts
            ? item.payoutAssetAmounts[0].asset.symbol
            : "",
          price: item.payoutAssetAmounts
            ? item.payoutAssetAmounts[0].price.price
            : "",
          investor: item.investor.id,
          fundName: item.fund.name,
          fundId: item.fund.id,
        };
      } else if (item.asset && item.transaction) {
        return {
          shares: item.shares,
          timestamp: parseInt(item.timestamp),
          transaction_id: item.transaction.id,
          to: item.transaction.to,
          type: "INVEST",
          from: item.transaction.from,
          amount: item.investmentAmount,
          symbol: item.asset.symbol,
          price: item.asset.price.price,
          investor: item.investor.id,
          fundName: data.data.fund.name,
          fundId: data.data.fund.id,
        };
      }
      return;
    })
    .filter((item) => item);

  return transaction;
};

export const currentUserAllTransactions = async (walletAddress) => {
  //0xaed39f9013fe44deb694203d9d12ea4029edac49
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.MAINNET_ENDPOINT;
  const { data } = await axios.post(url, {
    query: `{
    investments(where: {investor: "${walletAddress}"}){
    fund{
     id 
     name
      sharesChanges(orderBy: timestamp, orderDirection: desc) {
        shares
        timestamp
        investmentState{
          shares
        }
        fundState{
          id 
          portfolio{
            id
            holdings{
              id
              asset{
                id
                symbol
                name
              }
              amount
              price{
                price
              }
            }
          }  
        }
        ... on SharesBoughtEvent{
          id 
          investmentAmount
          asset{
            id
            name
            symbol
            price{
              price
            }
          }
          investor{
            id 
          }
          transaction{
            id
            from
            to 
          }
        }
        
        ...on SharesRedeemedEvent{
          id 
          investor{
            id
          }
          fund {
            id
            name
            accessor{
              id
              denominationAsset{
                id 
                name
                symbol
              }
            }
          }
          
          payoutAssetAmounts{
            asset{
              id
              name
              symbol
              price{
                price
              }
            }
            amount
            price{
              price
            }
          }
          transaction{
            id 
            from 
            to
          }
        }
      }
    } 
  }
  }`,
  });

  let investments = [];
  let transactions = [];
  const funds = data.data.investments.map((fItem) => fItem.fund);

  funds.forEach((fund) => {
    fund.sharesChanges
      .map((item) => {
        if (item.fund) {
          // withdraw
          const withdraw = {
            shares: item.shares,
            timestamp: parseInt(item.timestamp),
            transaction_id: item.transaction.id,
            to: item.transaction.to,
            type: "WITHDRAW",
            from: item.transaction.from,
            amount: item.payoutAssetAmounts
              ? item.payoutAssetAmounts[0].amount
              : 0,
            symbol: item.payoutAssetAmounts
              ? item.payoutAssetAmounts[0].asset.symbol
              : "",
            price: item.payoutAssetAmounts
              ? item.payoutAssetAmounts[0].asset.price.price
              : "",
            investor: item.investor.id,
            fundName: item.fund.name,
            fundId: item.fund.id,
          };

          transactions.push(withdraw);

          return withdraw;
        } else if (item.asset && item.transaction) {
          const invest = {
            shares: item.shares,
            timestamp: parseInt(item.timestamp),
            transaction_id: item.transaction.id,
            to: item.transaction.to,
            type: "INVEST",
            investmentShares: item.investmentState.shares,
            from: item.transaction.from,
            amount: item.investmentAmount,
            symbol: item.asset.symbol,
            price: item.asset.price.price,
            investor: item.investor.id,
            fundName: fund.name,
            fundId: fund.id,
          };

          investments.push(invest);
          transactions.push(invest);
        }
        return;
      })
      .filter((item) => item);
  });

  return { transactions, investments };
};

export const currentUserVaults = async (accessor) => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.MAINNET_ENDPOINT;

  const query = `
  {
    funds(first: 5, where: {manager: "${accessor}"}){
         id 
         name
         manager 
         shares {
          totalSupply
        }
         accessor{
           id
           denominationAsset{
             symbol
             name 
             price{
               price
             }
           }
         }
         portfolio {
          holdings {
            amount
            asset {
              symbol
              price {
                price
              }
            }
          }
        }
        investmentCount
        lastKnowGavInEth
        trackedAssets {
          name
          symbol
        }
         state{
           shares{
             totalSupply
           }
         }
       }
   }`;

  const { data } = await axios.post(url, {
    query,
  });

  return data.data.funds;
};

export const getCurrentUserInvestments = async (address) => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.MAINNET_ENDPOINT;

  const query = `
  {
    accounts(where: {id: "${address}"}) {
     id
     investments {
       id
       fund {
         id
         shares {
           totalSupply
         }
         name
         portfolio {
           holdings {
             amount
             asset {
               symbol
               price {
                 price
               }
             }
           }
         }
       }
       shares
     }
   }
   }`;

  const { data } = await axios.post(url, {
    query,
  });

  return data.data.accounts.length > 0 ? data.data.accounts[0].investments : [];
};

export const minMaxDepositAmounts = async (fundId) => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.MAINNET_ENDPOINT;

  const query = `{
    minMaxInvestmentFundSettingsSetEvents(first:1, where:{fund: "${fundId}"}) {
      id
      fund{
        id
        accessor{
          denominationAsset{
            id
            symbol
            name
          }
        }
      }
      minInvestmentAmount
      maxInvestmentAmount
    }
  }`;

  const { data } = await axios.post(url, {
    query,
  });
  console.log(data.data);

  return data.data.minMaxInvestmentFundSettingsSetEvents.length
    ? data.data.minMaxInvestmentFundSettingsSetEvents[0]
    : { maxInvestmentAmount: "0.00", minInvestmentAmount: "0.00" };
};

export const performanceFee = async (comptrollerId) => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.MAINNET_ENDPOINT;

  const query = `
  {
    performanceFeeSettings(where:{comptroller: "${comptrollerId}"}){
     rate
     period
     comptroller{
       id
       fund{
         id
       }
     }
   }
   }`;

  const { data } = await axios.post(url, {
    query,
  });

  return data.data.performanceFeeSettings.length > 0
    ? {
        rate: data.data.performanceFeeSettings[0].rate,
        period: data.data.performanceFeeSettings[0].period,
      }
    : { rate: "0.00", period: "0.00" };
};

export const entranceDirectBurnFees = async (fundId) => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.MAINNET_ENDPOINT;

  const query = `
  {
    entranceRateBurnFeeSettledEvents(where:{fund: "${fundId}"}){
      fund{
        id 
      }
      sharesQuantity
    }
  }`;

  const { data } = await axios.post(url, {
    query,
  });

  return data.data.entranceRateBurnFeeSettledEvents.length > 0
    ? { rate: data.data.entranceRateBurnFeeSettledEvents[0].sharesQuantity }
    : { rate: "0.00" };
};

export const managementFee = async (comptrollerId) => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.MAINNET_ENDPOINT;

  const query = `
  {
    managementFeeSettings(where:{comptroller: "${comptrollerId}"}){
      id
      comptroller{
        id
      }    
      scaledPerSecondRate
    }
  }`;

  const { data } = await axios.post(url, {
    query,
  });

  return data.data.managementFeeSettings.length > 0
    ? {
        scaledPerSecondRate: convertScaledPerSecondRateToRate(
          data.data.managementFeeSettings[0].scaledPerSecondRate
        ),
      }
    : { scaledPerSecondRate: "0.00" };
};
