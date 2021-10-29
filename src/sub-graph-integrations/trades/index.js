import configs from '../../config';
import axios from 'axios'

// Get trades
export const getFundSwapTrades = async () => {
    try {
      const endpoint = configs.DEBUG_MODE ? configs.ENZYME_ENDPOINT : configs.MAINNET_ENDPOINT;
      const {data} = await axios.post(
        endpoint,
        {
          query: `
          {
            tokenSwapTrades(where: {fund: "0xe8e27280722ec0b1a7b795e5105243b2a193a13e"}){
              adapter {
                identifier
              }
              incomingAssetAmount {
                amount
                asset {
                  symbol
                }
                price {
                  price
                }
              }
              outgoingAssetAmount {
                amount
                 asset {
                  symbol
                }
                price {
                  price
                }
              }
            }
          }
      
          `
        }
      );
      console.log("Your trades: " , data.data)
  
      return data.data.tokenSwapTrades
    } catch (error) {
      console.log(error);
    }
  }