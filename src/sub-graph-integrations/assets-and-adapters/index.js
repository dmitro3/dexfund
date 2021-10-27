import axios from "axios";
import configs from "../../config";

export const queryFundOverviewDetails = async (fundId) => {
  try {
    let query = `
    {
      fund(id: "${fundId}"){
        id
        name
        accessor {
          denominationAsset {
            id
            name
            symbol
          }
        }
        investmentCount
      }
    }`;
    const { data } = await axios.post(configs.ENZYME_ENDPOINT, {
      query,
    });

    return data.data.fund;
  } catch (error) {
    console.log(error);
  }
};

export const queryFundDetails = async (fundId) => {
  try {
    let query = `
       { 
          fund(id: "${fundId}") {
          id
          accessor {
            id
            sharesActionTimelock
            denominationAsset {
              id
              name
              symbol
              decimals
              type
              price {
                id
                price
                timestamp
              }
            }
          }
          inception
          investmentCount
          name
          manager {
            id
            manager
          }
          release {
            id
          }
          shares {
            id
            totalSupply
          }
        }
      }
    `;
    const { data } = await axios.post(configs.ENZYME_ENDPOINT, {
      query,
    });

    return data.data.fund;
  } catch (error) {
    console.log(error);
  }
};

export const queryFundFinancials = async (fundId) => {
  try {
    let query = `
       { 
          fund(id: "${fundId}") {
          id
          shares {
            id
            totalSupply
          }
          accessor {
            denominationAsset {
              name
              symbol
            }
          }
        }
      }
    `;
    const { data } = await axios.post(configs.ENZYME_ENDPOINT, {
      query,
    });

    return data.data.fund;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdapterIntegrations = async () => {
  try {
    const { data } = await axios.post(configs.SUB_GRAPH_ENDPOINT, {
      query: `
            {
              integrationAdapters {
              id
              identifier
              whitelisted {
                adapters {
                  id
                  identifier
                }
                }
              }
            }`,
    });

    return data.data.integrationAdapters;
  } catch (error) {
    console.log(error);
  }
};

// denomination Assets
export const getDenominationAssets = async () => {
  try {
    const { data } = await axios.post(configs.SUB_GRAPH_ENDPOINT, {
      query: `
      {
        assets(orderBy: symbol, orderDirection: asc, where: {type_in: [ETH, USD]}) {
         decimals
         curvePoolAssetDetails {
           pool
           gauge
           gaugeToken {
             id
             decimals
             symbol
           }
           invariantProxyAsset {
             decimals
             id
             symbol
           }
           lpToken {
             decimals
             id
             symbol
           }
           numberOfTokens
           pool
          
           token1 {
             decimals
             id
             symbol
           }
           token2 {
             decimals
             id
             symbol
           }
           
         }
         decimals
         derivativeType
         id
         name
         price {
           price
           timestamp
         }
         symbol
         type
         underlyingAsset {
           id
           decimals
           name
           symbol
         }
         uniswapV2PoolAssetDetails {
           id
         }
       }
       }   
      `,
    });

    return data.data.assets;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAssetsIntegrations = async () => {
  try {
    const { data } = await axios.post(configs.SUB_GRAPH_ENDPOINT, {
      query: `
      {
        assets (first: 1000, orderBy: symbol, orderDirection: asc){
          id
          name
          decimals
          symbol
          price{
            price
          }
        }
      }`,
    });
    return data.data.assets;
  } catch (error) {
    console.log(error);
  }
};
