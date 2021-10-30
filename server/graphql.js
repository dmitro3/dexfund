const holdingStates = `
query{
  holdingStates(where: {fund: "0x24f3b37934d1ab26b7bda7f86781c90949ae3a79"}, orderBy: timestamp, orderDirection: asc, first: 1000) {
    timestamp
    asset {
      symbol
    }
    amount
  }
}

`;

const newFundCreatedEvents = `
{
 newFundCreatedEvents {
   id
   fund{
     id
     name
     comptrollerProxies{
       id 
       denominationAsset{
         id
         name
         symbol
         price{
           id
           price
         }
         uniswapV2PoolAssetDetails{
           token0{
             id
             symbol
             name
           }
           token1{
             id
             symbol
             name
           }
         }
       }
     }
   }
 }
}

`;

module.exports = { newFundCreatedEvents, holdingStates };
