import { utils, BigNumber } from "ethers";
import { resolveArguments } from "@enzymefinance/ethers";
import { Decimal } from "decimal.js";

export function sighash(fragment) {
  return utils.hexDataSlice(utils.id(fragment.format()), 0, 4);
}

export const managementFeeDigits = 27;
export const managementFeeScale = BigNumber.from(10).pow(managementFeeDigits);
export const managementFeeScaleDecimal = new Decimal(
  managementFeeScale.toString()
);
export const secondsPerYear = 365 * 24 * 60 * 60;

Decimal.set({ precision: 2 * managementFeeDigits });

// ethers.utils.parseEther("0.1") // 10%

export function encodeArgs(types, args) {
  const params = types.map((type) => utils.ParamType.from(type));
  const resolved = resolveArguments(params, args); // byteLike value
  const hex = utils.defaultAbiCoder.encode(params, resolved);
  return utils.hexlify(utils.arrayify(hex));
}

export function encodeFunctionData(fragment, args) {
  const encodedArgs = encodeArgs(fragment.inputs, args);
  return utils.hexlify(utils.concat([sighash(fragment), encodedArgs]));
}

export function feeManagerConfigArgs({ fees, settings }) {
  return encodeArgs(["address[]", "bytes[]"], [fees, settings]);
}

export function payoutSharesOutstandingForFeesArgs(fees) {
  return encodeArgs(["address[]"], [fees]);
}

// START OF MANANGEMENT FEES
export function managementFeeConfigArgs(scaledPerSecondRate) {
  return encodeArgs(["uint256"], [scaledPerSecondRate]);
}

export function convertRateToScaledPerSecondRate(rate) {
  const effectivRate = rate.div(new Decimal(1).minus(rate));

  const factor = new Decimal(1)
    .plus(effectivRate)
    .pow(1 / secondsPerYear)
    .toSignificantDigits(managementFeeDigits)
    .mul(managementFeeScaleDecimal);

  return BigNumber.from(factor.toFixed(0));
}
// END OF MANAGEMENT FEES

// PERFORMANCE FEES
export function performanceFeeConfigArgs(rate, period) {
  return encodeArgs(["uint256", "uint256"], [rate, period]);
}

// END OF PERFORMANCE FEES

// ENTRANCE FEES
export function entranceRateFeeConfigArgs(rate) {
  return encodeArgs(["uint256"], [rate]);
}

export function entranceRateFeeSharesDue({ rate, sharesBought }) {
  return BigNumber.from(sharesBought)
    .mul(rate)
    .div(utils.parseEther("1").add(rate));
}

// END OF ENTRACE FEES

// START OF MANANGEMENT FEES

export function rpow(x, n, b) {
  const xD = new Decimal(BigNumber.from(x).toString());
  const bD = new Decimal(BigNumber.from(b).toString());
  const nD = new Decimal(BigNumber.from(n).toString());

  const xDPow = xD.div(bD).pow(nD);

  return BigNumber.from(xDPow.mul(bD).toFixed(0));
}

export function managementFeeSharesDue({
  scaledPerSecondRate,
  sharesSupply,
  secondsSinceLastSettled,
}) {
  const timeFactor = rpow(
    scaledPerSecondRate,
    secondsSinceLastSettled,
    managementFeeScale
  );

  const sharesDue = BigNumber.from(sharesSupply)
    .mul(timeFactor.sub(managementFeeScale))
    .div(managementFeeScale);

  return sharesDue;
}

// END OF MANAGEMENT FEES

///

export function adapterBlacklistArgs(adapters) {
  return encodeArgs(["address[]"], [adapters]);
}

export function adapterWhitelistArgs(adapters) {
  return encodeArgs(["address[]"], [adapters]);
}

export function assetBlacklistArgs(assets) {
  return encodeArgs(["address[]"], [assets]);
}

export function assetWhitelistArgs(assets) {
  return encodeArgs(["address[]"], [assets]);
}

export function buySharesCallerWhitelistArgs({
  buySharesCallersToAdd = [],
  buySharesCallersToRemove = [],
}) {
  return encodeArgs(
    ["address[]", "address[]"],
    [buySharesCallersToAdd, buySharesCallersToRemove]
  );
}

export function buySharesPriceFeedToleranceArgs(tolerance) {
  return encodeArgs(["uint256"], [tolerance]);
}

export function guaranteedRedemptionArgs({ startTimestamp, duration }) {
  return encodeArgs(["uint256", "uint256"], [startTimestamp, duration]);
}

export function investorWhitelistArgs({
  investorsToAdd = [],
  investorsToRemove = [],
}) {
  return encodeArgs(
    ["address[]", "address[]"],
    [investorsToAdd, investorsToRemove]
  );
}

export function maxConcentrationArgs(maxConcentration) {
  return encodeArgs(["uint256"], [maxConcentration]);
}

export function minMaxInvestmentArgs({
  minInvestmentAmount,
  maxInvestmentAmount,
}) {
  return encodeArgs(
    ["uint256", "uint256"],
    [minInvestmentAmount, maxInvestmentAmount]
  );
}

export function policyManagerConfigArgs({ policies, settings }) {
  return encodeArgs(["address[]", "bytes[]"], [policies, settings]);
}
