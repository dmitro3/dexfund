import axios from "axios";
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
export const getYourInvestments = async (address) => {
  try {
    const endpoint = configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.MAINNET_ENDPOINT;

    const q = address ? `
    { 
        sharesBoughtEvents(where:  {investor_contains: "${address}"}){
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
    }` : `
        { 
            sharesBoughtEvents(first: 5){
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
        }`
    const { data } = await axios.post(
      endpoint,
      {
        query: q
      }
    );
    console.log("YOUR INVESTMENTS: ", data.data)

    return data.data.sharesBoughtEvents;
  } catch (error) {
    console.log(error);
  }
};

// Get your investemnt funds per fund
export const getYourInvestmentsPerFund = async (fundId, address) => {
  try {
    const endpoint = configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.SUB_GRAPH_ENDPOINT;
    const { data } = await axios.post(
      endpoint,
      {
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
    
        `
      }
    );
    console.log("YOUR INVESTMENTS in fund: ", data.data)

    return data.data.fund.investments

    return data.data.sharesBoughtEvents;
  } catch (error) {
    console.log(error);
  }
};


// Fund Compostion
export const getFundCompostion = async (fundId) => {
  try {
    const endpoint = configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.SUB_GRAPH_ENDPOINT;
    const { data } = await axios.post(
      endpoint,
      {
        query:
          `
       {
        fund(id: "${fundId}"){
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
    const endpoint = configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.SUB_GRAPH_ENDPOINT;
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
  } catch (error) {}
};




export const getFundAllFunds = async () => {
  try {
    const endpoint = configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.SUB_GRAPH_ENDPOINT;
    const { data } = await axios.post(
      endpoint,
      {
        query:
          `
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
       `
      }
    );
    console.log("FUND: ", data.data.funds)


    return data.data.funds

  } catch (error) {
    console.log(error);
  }
}
