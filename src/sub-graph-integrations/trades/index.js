import configs from "../../config";
import axios from "axios";

// Get trades
export const getFundSwapTrades = async (id) => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const { data } = await axios.post(endpoint, {
      query: `
          {
            tokenSwapTrades(where: {fund: "${id}"}){
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
      
          `,
    });
    console.log("Your trades: ", data.data);

    return data.data.tokenSwapTrades;
  } catch (error) {
    console.log(error);
  }
};
