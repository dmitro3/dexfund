import axios from "axios";
import configs from "../../config";

export const getFundDetails = async (fundAddress) => {
  const endpoint = configs.DEBUG_MODE
    ? configs.MAINNET_ENDPOINT
    : configs.MAINNET_ENDPOINT;
  const { data } = await axios.post(endpoint, {
    query: `
            {
            funds(where: {id: "${fundAddress}"}) {
                id
                name
                creator {
                  id
                }
                comptrollerProxies{
                  id
                }
                manager {
                  id
                }
                migrator
                trackedAssets {
                  id
                  name
                  symbol
                  decimals
                }
                trades {
                  id
                  adapter{
                    id
                    identifier
                  }
                  method
                  timestamp
                }
                investments {
                  id
                  since
                  investor {
                    id
                  }
                  shares
                }
            }
        }
            `,
  });

  return data.data.funds;
};
