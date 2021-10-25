import {BigNumber, ethers, utils}  from  'ethers'
import {UniswapV2Router, encodeFunctionData}  from '@enzymefinance/protocol'
import FundActionsWrapper from  './../abis/FundActionsWrapper.json'



export const investToAFundActionWrapper = async(
    comptrollerProxy,
    denominationAsset,
    buyerAddress,
    signer, 
    provider,
    exchangeAddress,
    exchangeApproveTargetAddress) => {

    // FUND Action Wrapper Interface
    const FundActionsWrapperInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(FundActionsWrapper.abi))
    );
        // fundActionsWrapperContacts
    const fundActionsWrapperContract = new ethers.Contract(
        FundActionsWrapper.address,
        FundActionsWrapperInterface,
        signer
    );

    const nonce = await provider.getTransactionCount(buyerAddress, "pending");

    const uniswapRouter = new UniswapV2Router(
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        provider
    );
    
    const uniswapPath = [
        denominationAsset,
        "0xdcfab8057d08634279f8201b55d311c2a67897d2",
    ];
    
    const uniswapExchangeData = encodeFunctionData(
        uniswapRouter.swapExactTokensForTokens.fragment,
        [
            utils.parseEther("0.00002"),
            1,
            uniswapPath,
            fundActionsWrapperContract,
            BigNumber.from((await provider.getBlock("latest")).timestamp).add(300),
        ]
    );


    const deposit = await fundActionsWrapperContract.exchangeAndBuyShares(
        comptrollerProxy, // Comptroller proxy
        denominationAsset, // usdc address in Kovan
        buyerAddress, // Buyer
        1, // Min share quantity
        exchangeAddress, // _exchange (uniswap)
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // _exchangeApproveTarget
        uniswapExchangeData, // _exchangeData
        0, // _minInvestmentAmount
        { nonce, gasLimit: 600000, value: "100000000000" }
    );
    
    console.log(deposit);

    return deposit;

}
