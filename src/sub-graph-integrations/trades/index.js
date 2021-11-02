import configs from "../../config";
import axios from "axios";

// Get trades
export const getFundSwapTrades = async (id) => {
  try {
    const endpoint = configs.DEBUG_MODE
      ? configs.ENZYME_ENDPOINT
      : configs.MAINNET_ENDPOINT;
    const trades = await axios.post(endpoint, {
      query: `
          {
            tokenSwapTrades(where: {fund: "${id}"}, orderBy:  timestamp, orderDirection:desc){
              id
              timestamp
              method
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


            redeemTrades(where: {fund: "${id}"}, orderBy:  timestamp, orderDirection:desc){
              id
              timestamp
              method
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

            lendTrades(where: {fund: "${id}"}, orderBy:  timestamp, orderDirection:desc){
              id
              timestamp
              method
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

    return [
      ...trades.data.data.tokenSwapTrades,
      ...trades.data.data.redeemTrades,
      ...trades.data.data.lendTrades,
    ];

    return [];
  } catch (error) {
    console.log(error);
  }
};
