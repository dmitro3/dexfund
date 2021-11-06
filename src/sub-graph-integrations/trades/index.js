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
        trades(where:{fund: "${id}"}, orderBy: timestamp, orderDirection: desc){
          fund{
            id
          }
          timestamp
        adapter {
                    identifier
                  }
                  method
                  ...on TokenSwapTrade{
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
                  ...on RedeemTrade{
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
        
        ...on LendTrade{
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
          
          ...on LendAndStakeTrade{
                    incomingAssetAmount {
                    amount
                    asset {
                      symbol
                    }
                    price {
                      price
                    }
                  }
                    outgoingAssetAmounts {
                    amount
                     asset {
                      symbol
                    }
                    price {
                      price
                    }
                  }
                  }
          
          ...on UnstakeTrade{
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
          
          ...on UnstakeAndRedeemTrade{
                    incomingAssetAmounts {
                    amount
                    asset {
                      symbol
                    }
                    price {
                      price
                    }
                  }
                   
                  }
          ...on ClaimRewardsAndReinvestTrade{
                    incomingAssetAmount {
                    amount
                    asset {
                      symbol
                    }
                    price {
                      price
                    }
                  }
                  }
          
          ...on ClaimRewardsAndSwapTrade{
                    incomingAssetAmount {
                    amount
                    asset {
                      symbol
                    }
                    price {
                      price
                    }
                  }
                  }
          
          ...on ClaimRewardsTrade{
                    incomingAssetAmounts {
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
              }
    
    `,
    });

    return [...trades.data.data.trades];

    return [];
  } catch (error) {}
};
