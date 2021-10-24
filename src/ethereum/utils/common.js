

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