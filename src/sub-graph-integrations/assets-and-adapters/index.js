import axios from 'axios'
import configs from '../../config';


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
            }`
    });

    return data.data.integrationAdapters
  } catch (error) {
    console.log(error)
  }
}



// denomination Assets
export const getDenominationAssets = async () => {
  try {
    const { data } = await axios.post(configs.SUB_GRAPH_ENDPOINT, {
      query: `
      {
        assets(orderBy: symbol, orderDirection: asc) {
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
      `
    });


    return data.data.assets
  } catch (error) {
    console.log(error)
  }
}


export const getAllAssetsIntegrations = async () => {

  try {
    const { data } = await axios.post(configs.SUB_GRAPH_ENDPOINT, {
      query: `
      {
        assets{
          id
          name
          decimals
          symbol
          price{
            price
          }
          blacklisted{
            id
            enabled
            timestamp
          }
          daily{
            high
            low 
            open
            closeRef{
              id
              timestamp
            }
          }
          hourly{
            high
            low 
            open
            closeRef{
              id
              timestamp
            }
          }
          monthly{
            high
            low 
            open
            closeRef{
              id
              timestamp
            }
          }
          priceHistory{
            price
          }
        }
      }`
    });
    return data.assets
  } catch (error) {
    console.log(error)
  }
}


