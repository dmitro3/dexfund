import { formatDistanceToNowStrict } from "date-fns";
import { connectMetamask } from "./../web3";
import ValutLib from './../abis/VaultLib.json';
import { utils, ethers } from "ethers";

/**
 * 
 * @param {*} amount Amount to be converted
 * @param {*} symbol The symbol to be used.
 * @returns Formated Amount.
 */
export function currencyFormat(amount, symbol='$'){
    const num  =  parseFloat(amount)
    return `${symbol} ${num ? num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0.00}`;
}

export const getTimeDiff = (date) => {
    if (!date) return '';
    let result = formatDistanceToNowStrict(new Date(date), { roundingMethod: 'ceil', addSuffix: true});
    return result;
}

export async function getAssetDecimals(assetAddress) {
    const { provider, signer, address } = await connectMetamask();
    // we use VaultLib as an interface because it has the `decimals()` getter
    const assetInterface = new ethers.utils.Interface(
        JSON.parse(JSON.stringify(ValutLib.abi))
    );
    const asset = new ethers.Contract(assetAddress, assetInterface, signer);
    const decimals = await asset.decimals();
    return decimals;
}