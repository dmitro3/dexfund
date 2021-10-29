import axios from "axios";
import configs from "../../config";

<<<<<<< HEAD
const currentInvestor = "0x028a968aca00b3258b767edc9dbba4c2e80f7d00";
const currentFundId = "";
=======
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b

// Get all investments
export const getAllInvestments = async () => {
  try {
<<<<<<< HEAD
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
=======
    const endpoint = configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(
      endpoint,
      {
        query: `
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b
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
<<<<<<< HEAD
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
=======
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
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b
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
<<<<<<< HEAD
        }
    
        `,
    });
    console.log("YOUR INVESTMENTS: ", data.data);
=======
        }`
    const { data } = await axios.post(
      endpoint,
      {
        query: q


      }
    );
    console.log("YOUR INVESTMENTS: ", data.data)
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b

    return data.data.sharesBoughtEvents;
  } catch (error) {
    console.log(error);
  }
};

// Get your investemnt funds per fund
export const getYourInvestmentsPerFund = async (fundId, address) => {
  try {
<<<<<<< HEAD
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
=======
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
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b
                }
              }
            } 
          }
        }
    
<<<<<<< HEAD
        `,
    });
    console.log("YOUR INVESTMENTS: ", data.data);
=======
        `
      }
    );
    console.log("YOUR INVESTMENTS in fund: ", data.data)

    return data.data.fund.investments
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b

    return data.data.sharesBoughtEvents;
  } catch (error) {
    console.log(error);
  }
};


// Fund Compostion
export const getFundCompostion = async (fundId) => {
  try {
<<<<<<< HEAD
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
=======
    const endpoint = configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.SUB_GRAPH_ENDPOINT;
    const { data } = await axios.post(
      endpoint,
      {
        query:
          `
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b
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
<<<<<<< HEAD
       `,
    });
    console.log("FUND HOLDINGS: ", data.data);
=======
       `
      }
    );
    console.log("FUND HOLDINGS: ", data.data)

    return data.data.fund
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b

    return data.data.fund;
  } catch (error) {
    console.log(error);
  }
<<<<<<< HEAD
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
=======
}




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
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b
