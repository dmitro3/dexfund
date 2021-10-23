import { utils, BigNumber } from 'ethers';
import { resolveArguments } from '@enzymefinance/ethers';


export function sighash(fragment) {
    return utils.hexDataSlice(utils.id(fragment.format()), 0, 4);
}




export function encodeArgs(types, args) {
    const params = types.map((type) => utils.ParamType.from(type));
    const resolved = resolveArguments(params, args);
    const hex = utils.defaultAbiCoder.encode(params, resolved);
    return utils.hexlify(utils.arrayify(hex));
}

export function encodeFunctionData(fragment, args) {
    const encodedArgs = encodeArgs(fragment.inputs, args);
    return utils.hexlify(utils.concat([sighash(fragment), encodedArgs]));
}


export function feeManagerConfigArgs({ fees, settings }) {
    console.log(encodeArgs(['address[]', 'bytes[]'], [fees, settings]))
    return encodeArgs(['address[]', 'bytes[]'], [fees, settings]);
}

export function payoutSharesOutstandingForFeesArgs(fees) {
    return encodeArgs(['address[]'], [fees]);
}


// START OF MANANGEMENT FEES
export function managementFeeConfigArgs(scaledPerSecondRate) {
    console.log(encodeArgs(['uint256'], [scaledPerSecondRate]))
    return encodeArgs(['uint256'], [scaledPerSecondRate]);
}
// END OF MANAGEMENT FEES



// PERFORMANCE FEES
export function performanceFeeConfigArgs(rate, period) {
    console.log([rate, period])
    console.log([parseInt(rate), parseInt(period)])
    return encodeArgs(['uint256', 'uint256'], [parseInt(rate), parseInt(period)]);
}

// END OF PERFORMANCE FEES


// ENTRANCE FEES
export function entranceRateFeeConfigArgs(rate) {
    return encodeArgs(['uint256'], [rate]);
}

export function entranceRateFeeSharesDue({ rate, sharesBought }) {
    return BigNumber.from(sharesBought).mul(rate).div(utils.parseEther('1').add(rate));
}


// END OF ENTRACE FEES


export function adapterBlacklistArgs(adapters) {
    return encodeArgs(['address[]'], [adapters]);
  }
  
  export function adapterWhitelistArgs(adapters) {
    return encodeArgs(['address[]'], [adapters]);
  }
  
  export function assetBlacklistArgs(assets) {
    return encodeArgs(['address[]'], [assets]);
  }
  
  export function assetWhitelistArgs(assets) {
    return encodeArgs(['address[]'], [assets]);
  }
  
  export function buySharesCallerWhitelistArgs({
    buySharesCallersToAdd = [],
    buySharesCallersToRemove = [],
  }) {
    return encodeArgs(['address[]', 'address[]'], [buySharesCallersToAdd, buySharesCallersToRemove]);
  }
  
  export function buySharesPriceFeedToleranceArgs(tolerance) {
    return encodeArgs(['uint256'], [tolerance]);
  }
  
  export function guaranteedRedemptionArgs({
    startTimestamp,
    duration,
  }) {
    return encodeArgs(['uint256', 'uint256'], [startTimestamp, duration]);
  }
  
  export function investorWhitelistArgs({
    investorsToAdd = [],
    investorsToRemove = [],
  }) {
    return encodeArgs(['address[]', 'address[]'], [investorsToAdd, investorsToRemove]);
  }
  
  export function maxConcentrationArgs(maxConcentration) {
    return encodeArgs(['uint256'], [maxConcentration]);
  }
  
  export function minMaxInvestmentArgs({
    minInvestmentAmount,
    maxInvestmentAmount,
  }) {
    return encodeArgs(['uint256', 'uint256'], [minInvestmentAmount, maxInvestmentAmount]);
  }
