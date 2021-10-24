import axios from 'axios'
import configs from '../../config';


export const getAllInvestments = async () => {
  try {
    const url = "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme";

    const {data} = await axios.post(
        url,
        {
            query: `
            {
                funds(first: 5, orderBy: lastKnowGavInEth, orderDirection: desc) {
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
    
        console.log("FUNDS")
        console.log(data.data)

    return data.data.funds
  } catch (error) {
    console.log(error)
  }
}