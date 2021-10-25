import { formatDistanceToNowStrict } from "date-fns";


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