import axios from "axios";
import configs from "../../config";

const currentInvestor = "0x028a968aca00b3258b767edc9dbba4c2e80f7d00";
const currentFundId = "";

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
  } catch (error) {
    console.log(error);
  }
};

// Get your investemnt funds
export const getYourInvestments = async () => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
        { 
            sharesBoughtEvents(where:  {investor_contains: "${currentInvestor}"}){
                investmentAmount
                investmentState {
                    shares
                }
                fund {
                    name
                    id
                }
                investor {
                    firstSeen
                    investorSince
                }
            } 
        }
    
        `,
    });
    console.log("YOUR INVESTMENTS: ", data.data);

    return data.data.sharesBoughtEvents;
  } catch (error) {
    console.log(error);
  }
};

// Get your investemnt funds per fund
export const getYourInvestmentsPerFund = async () => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
        { 
            sharesBoughtEvents(where:  {investor_contains: "${currentInvestor}"}){
                investmentAmount
                investmentState {
                    shares
                }
                fund {
                    name
                }
                investor {
                    id
                    firstSeen
                    investorSince
                }
            } 
        }
    
        `,
    });
    console.log("YOUR INVESTMENTS: ", data.data);

    return data.data.sharesBoughtEvents;
  } catch (error) {
    console.log(error);
  }
};

// Fund Compostion
export const getFundCompostion = async () => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
       {
        fund(id: "0x24f3b37934d1ab26b7bda7f86781c90949ae3a79"){
         name
         id
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
    console.log("FUND HOLDINGS: ", data.data);

    return data.data.fund;
  } catch (error) {
    console.log(error);
  }
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
    console.log("LIQUIDITY POOLS: ", data.data);

    return data.data.uniswapV2PoolAssetDetails;
  } catch (error) {
    console.log(error);
  }
};

export const chart1d = async () => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.SUB_GRAPH_ENDPOINT;

  console.log(url);

  var now = Math.floor(new Date().getTime() / 1000);

  var aday = 3600 * 25;

  console.log("NOW", now);
  console.log("A D", aday);
  console.log(now - aday);

  try {
    const { data } = await axios.post(url, {
      query: `{
        fundStates(first: 1){
          currencyPrices{
            currency{
              hourlyHistory(orderBy:from orderDirection:asc, where: {from_gte: "${
                now - aday
              }", to_lte: "${now}"}){          
                id
                open
                close
                from
                to
                high
                low
                closeRef{
                  timestamp
                  price
                  currency {
                    id
                  }
                }
              }      
            }
      }
        }
      }`,
    });

    console.log("Our data ", data);
    return data.data.fundStates;
  } catch (error) {
    console.log("Data");
  }
};

export const chart1w = async () => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.SUB_GRAPH_ENDPOINT;

  console.log(url);

  var now = Math.floor(new Date().getTime() / 1000);

  var aday = 3600 * 24 * 8;

  console.log("NOW", now);
  console.log("A D", aday);
  console.log(now - aday);

  try {
    const { data } = await axios.post(url, {
      query: `{
        fundStates(first: 1){
          currencyPrices{
            currency{
              dailyHistory(orderBy:from orderDirection:asc, where: {from_gte: "${
                now - aday
              }", to_lte: "${now}"}){          
                id
                open
                close
                from
                to
                high
                low
                closeRef{
                  timestamp
                  price
                  currency {
                    id
                  }
                }
              }      
            }
      }
        }
      }`,
    });

    console.log("Our data ", data);
    return data.data.fundStates;
  } catch (error) {
    console.log("Data");
  }
};

export const chart1m = async () => {
  const url = configs.DEBUG_MODE
    ? configs.ENZYME_ENDPOINT
    : configs.SUB_GRAPH_ENDPOINT;

  console.log(url);

  var now = Math.floor(new Date().getTime() / 1000);

  var aday = 3600 * 24 * 30;

  console.log("NOW", now);
  console.log("A D", aday);
  console.log(now - aday);

  try {
    const { data } = await axios.post(url, {
      query: `{
        fundStates(first: 1){
          currencyPrices{
            currency{
              dailyHistory( where: {from_gte: "${
                now - aday
              }", to_lte: "${now}"}){          
                id
                open
                close
                from
                to
                high
                low
                closeRef{
                  timestamp
                  price
                  currency {
                    id
                  }
                }
              }      
            }
      }
        }
      }`,
    });

    console.log("Our data ", data);
    return data.data.fundStates;
  } catch (error) {
    console.log("Data");
  }
};
