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
        `});

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
            sharesBoughtEvents(where:  {investor_contains: "${currentInvestor}", fund_contains: "${currentFundId}"}){
                investmentAmount
                investmentState {
                    shares
                }
                fund {
                    name
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

export const ListAllTrades = async () => {
  try {
    const { data } = await axios.get(configs.ENZYME_ENDPOINT, {
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
  } catch (error) {}
};
