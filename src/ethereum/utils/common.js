import { formatDistanceToNowStrict } from "date-fns";
import { connectMetamask } from "./../web3";
import ValutLib from "./../abis/VaultLib.json";
import { ethers } from "ethers";

import {
  ChainId,
  Token,
  WETH,
  Fetcher,
  Trade,
  Route,
  TokenAmount,
  TradeType,
} from "@uniswap/sdk";
import { BigNumber } from "bignumber.js";

/**
 *
 * @param {*} amount Amount to be converted
 * @param {*} symbol The symbol to be used.
 * @returns Formated Amount.
 */
export function currencyFormat(amount, symbol = "$") {
  const num = parseFloat(amount);
  return ` ${
    num ? num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : 0.0
  }`;
}

export const getTimeDiff = (date) => {
  if (!date) return "";
  let result = formatDistanceToNowStrict(new Date(date), {
    roundingMethod: "ceil",
    addSuffix: true,
  });
  return result;
};

export async function getAssetDecimals(assetAddress) {
  try {
    const { signer } = await connectMetamask();

    // we use VaultLib as an interface because it has the `decimals()` getter
    const assetInterface = new ethers.utils.Interface(
      JSON.parse(JSON.stringify(ValutLib.abi))
    );
    const asset = new ethers.Contract(assetAddress, assetInterface, signer);
    const decimals = await asset.decimals();
    return decimals;
  } catch (error) {
    console.log(error);
  }
}

export async function getTokenBalance(assetAddress) {
  try {
    const { signer, address } = await connectMetamask();

    console.log("Token to get balance ", assetAddress);
    console.log("Wallet ", address);

    // we use VaultLib as an interface because it has the `decimals()` getter
    const assetInterface = new ethers.utils.Interface(
      JSON.parse(JSON.stringify(ValutLib.abi))
    );
    const asset = new ethers.Contract(assetAddress, assetInterface, signer);

    const tokenBalance = await asset.balanceOf(address);

    console.log("token balance ", parseInt(tokenBalance._hex, 16));

    return parseInt(tokenBalance._hex, 16);
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @returns Get current eth price
 */
export const wrappedEthPrice = async () => {
  const token = new Token(
    ChainId.MAINNET,
    "0x97deC872013f6B5fB443861090ad931542878126",
    18
  );

  const pair = await Fetcher.fetchPairData(token, WETH[token.chainId]);

  const route = new Route([pair], WETH[token.chainId]);

  let trade = new Trade(
    route,
    new TokenAmount(
      WETH[token.chainId],
      new BigNumber(1).shiftedBy(18).toString()
    ),
    TradeType.EXACT_INPUT
  );
  const amount =
    parseFloat(trade.executionPrice.toSignificant(6)) * parseFloat(1);

  return amount;
};
