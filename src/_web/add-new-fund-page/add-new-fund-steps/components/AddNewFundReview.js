import React, { Component } from "react";
import { connect } from "react-redux";
import { BigNumber, utils } from "ethers";
import {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
} from "./../../../../redux/actions/LoaderAction";
// COMPONENTS
// ...

// ASSETS
import pinkOutlineButtonIcon from "../assets/pink-outline-button-icon.svg";
import pinkFillButtonIcon from "../assets/pink-fill-button-icon.svg";

// STYLES
import "../styles/addNewFundSteps.css";

// CREATE FUND
import {
  createNewFund,
  getFeesManagerConfigArgsData,
  getManagementFees,
  getPerformanceFees,
  getEntranceRateFeeConfigArgs,
  PerformanceFee,
  ManagementFee,
  EntranceRateDirectFee,
  getMinMaxDepositPolicyArgs,
  MinMaxInvestment,
  getPolicyArgsData,
  AssetBlacklist,
  AssetWhitelist,
  AdapterBlacklist,
  AdapterWhitelist,
  getAddressArrayPolicyArgs,
} from "./../../../../ethereum/funds/fund-related";

import { getAssetDecimals } from "./../../../../ethereum/utils/index";
import { toastr } from "react-redux-toastr";

class AddNewFundReview extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.state, hash: "" };
  }

  goToNextStep = async () => {
    this.props.activateLoaderOverlay();

    let feeManagerSettingsData = []; // value configurations
    let fees = []; // list of address

    // make sure option feilds are formated
    if (this.state.displayManagementFee && this.state.managementFee) {
      fees.push(ManagementFee.address);
      feeManagerSettingsData.push(getManagementFees(this.state.managementFee));
    }

    if (this.state.displayEntryFee && this.state.entryFee) {
      fees.push(EntranceRateDirectFee.address);
      feeManagerSettingsData.push(
        getEntranceRateFeeConfigArgs(this.state.entryFee)
      );
    }

    if (this.state.displayPerformanceFee && this.state.performanceFee) {
      fees.push(PerformanceFee.address);
      feeManagerSettingsData.push(
        getPerformanceFees(this.state.performanceFee, 6)
      );
    }

    let feeArgsData;

    // IF CONFIGURATIONS (FEES and FEE SETTING) are not Provided
    if (fees.length === 0) {
      /// PREPARE FEE CONFIGURATIONS DATA
      // fees = utils.hexlify('0x')
      // feeManagerSettingsData = utils.hexlify('0x')

      // feeArgsData = await getFeesManagerConfigArgsData(fees, feeManagerSettingsData, this.props.account.account.signer, false);

      feeArgsData = utils.hexlify("0x");
    } else {
      /// PREPARE FEE CONFIGURATIONS DATA
      feeArgsData = await getFeesManagerConfigArgsData(
        fees,
        feeManagerSettingsData,
        this.props.onboard.address,
        true
      );
    }

    let policyManagerSettingsData = [];
    let policies = [];

    // Min / Max Investment Policy
    if (this.state.displayMinDeposit || this.state.displayMaxDeposit) {
      try {
        // Get values from frontend. Should be 0 if they are not enabled.
        var minDeposit = this.state.displayMinDeposit
          ? this.state.minDeposit
          : 0;
        var maxDeposit = this.state.displayMaxDeposit
          ? this.state.maxDeposit
          : 0;

        // Scale the minDeposit/maxDeposit values to the denomination asset's decimals
        var denominationAssetDecimals = await getAssetDecimals(
          this.state.denominationAddress,
          this.props.onboard.provider
        );
        minDeposit =
          minDeposit === 0
            ? 0
            : utils
                .parseEther(minDeposit)
                .div(10 ** (18 - denominationAssetDecimals));
        maxDeposit =
          maxDeposit === 0
            ? 0
            : utils
                .parseEther(maxDeposit)
                .div(10 ** (18 - denominationAssetDecimals));

        // Push settings and actual policy
        policies.push(MinMaxInvestment.address);
        policyManagerSettingsData.push(
          getMinMaxDepositPolicyArgs(minDeposit, maxDeposit)
        );
      } catch (e) {
        // TODO: CHANGE THIS ALERT WITH A GOOD FRONTEND ALERT

        alert("Error processing you Min/Max Deposit values");
      }
    }

    if (this.state.blackListingAssets.length != 0) {
      policies.push(AssetBlacklist.address);
      policyManagerSettingsData.push(
        getAddressArrayPolicyArgs(this.state.blackListingAssets)
      );
    }

    if (this.state.whiteListingAssets.length != 0) {
      policies.push(AssetWhitelist.address);
      policyManagerSettingsData.push(
        getAddressArrayPolicyArgs(this.state.whiteListingAssets)
      );
    }

    if (this.state.blackListingAdapters.length != 0) {
      policies.push(AdapterBlacklist.address);
      policyManagerSettingsData.push(
        getAddressArrayPolicyArgs(this.state.blackListingAdapters)
      );
    }

    if (this.state.whiteListingAdapters.length != 0) {
      policies.push(AdapterWhitelist.address);
      policyManagerSettingsData.push(
        getAddressArrayPolicyArgs(this.state.whiteListingAdapters)
      );
    }

    let policyArgsData;
    if (policies.length === 0) {
      policyArgsData = utils.hexlify("0x");
    } else {
      policyArgsData = getPolicyArgsData(policies, policyManagerSettingsData);
    }
    console.log('create new fund args: ', this.props.onboard.address,
    this.state.fundName,
    this.state.denominationAddress,
    3600,
    feeArgsData,
    policyArgsData,
    1000000,
    this.props.onboard.provider,
    this.props.onboard.address
);

    try {
      const timeLockInSeconds = this.state.timeLock * 60 * 60;
      var provider = this.props.onboard.provider;
      var adr = this.props.onboard.address;
      const fund = await createNewFund(
        this.props.onboard.address,
        this.state.fundName,
        this.state.denominationAddress,
        timeLockInSeconds,
        feeArgsData,
        policyArgsData,
        1000000,
        provider,
        adr
      );

      this.setState({ ...this.state, hash: "" });

      this.props.deactivateLoaderOverlay();
      this.props.goToNextStepEvent({
        ...this.state,
      });
      toastr.success("Successfully created a new vault");
    } catch (error) {
      toastr.error("Error occurred while creating a Vault: ", error.message);
      this.props.deactivateLoaderOverlay();
    }
  };

  goToPreviousStep = () => {
    this.props.goToPreviousStepEvent();
  };

  render() {
    return (
      <>
        <div className="w-add-new-fund-step-card">
          <div className="w-add-new-fund-step-sidebar">
            <div className="w-add-new-fund-step">
              <img
                src={pinkFillButtonIcon}
                alt="pink-fill-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text ">General</div>
            </div>
            <div className="w-add-new-fund-step">
              <img
                src={pinkFillButtonIcon}
                alt="pink-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">Fees (optional)</div>
            </div>
            <div className="w-add-new-fund-step">
              <img
                src={pinkFillButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">
                Deposits (optional)
              </div>
            </div>
            <div className="w-add-new-fund-step">
              <img
                src={pinkFillButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">
                Advanced Settings (optional)
              </div>
            </div>
            <div className="w-add-new-fund-step current">
              <img
                src={pinkOutlineButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text current">Review</div>
            </div>
          </div>
          <div className="w-add-new-fund-step-input-section">
            <div className="w-fund-review-header">GENERAL</div>
            <div className="w-fund-review-info-box">
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Name</div>
                <div className="w-fund-review-info-value">
                  {this.state.fundName}
                </div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">
                  Denomination asset
                </div>
                <div className="w-fund-review-info-value">
                  {this.state.denominationAsset}
                </div>
              </div>
            </div>
            <div className="w-fund-review-header">FEES</div>
            <div className="w-fund-review-info-box">
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Management fee</div>
                <div className="w-fund-review-info-value">
                  {this.state.managementFee ? this.state.managementFee : `N/A`}
                </div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Performance fee</div>
                <div className="w-fund-review-info-value">
                  {this.state.performanceFee
                    ? this.state.performanceFee
                    : `N/A`}
                </div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Entrance fee</div>
                <div className="w-fund-review-info-value">
                  {this.state.entryFee ? this.state.entryFee : `N/A`}
                </div>
              </div>
            </div>
            <div className="w-fund-review-header">DEPOSITS</div>
            <div className="w-fund-review-info-box">
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Minimum deposit</div>
                <div className="w-fund-review-info-value">
                  {this.state.minDeposit ? this.state.minDeposit : `N/A`}
                </div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Maximum deposit</div>
                <div className="w-fund-review-info-value">
                  {this.state.maxDeposit ? this.state.maxDeposit : `N/A`}
                </div>
              </div>
            </div>
            <div className="w-fund-review-header">ADVANCED</div>
            <div className="w-fund-review-info-box">
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Adapter Blacklist</div>
                <div className="w-fund-review-info-value">
                  {this.state.blackListingAdapters.length} Selected
                </div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Adapter Whitelist</div>
                <div className="w-fund-review-info-value">
                  {this.state.whiteListingAdapters.length} Selected
                </div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Asset Blacklist</div>
                <div className="w-fund-review-info-value">
                  {this.state.blackListingAssets.length} Selected
                </div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Asset Whitelist</div>
                <div className="w-fund-review-info-value">
                  {this.state.whiteListingAssets.length} Selected
                </div>
              </div>
            </div>
            <div className="w-fund-review-header">TERMS AND CONDITIONS</div>
            <div className="w-fund-review-info-box">
              <div className="w-fund-review-terms">
                By using this software, you understand, acknowledge and accept
                that Dexify Protocol and/or the underlying software are provided
                “as is” and without warranties or representations of any kind
                either expressed or implied.
              </div>
            </div>
            <div className="w-add-new-fund-buttons-section">
              <div
                className="w-add-new-fund-step-previous-button"
                onClick={() => this.goToPreviousStep()}
              >
                PREVIOUS
              </div>
              <div
                className="w-add-new-fund-step-next-button"
                onClick={() => this.goToNextStep()}
              >
                CREATE
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.connect,
    onboard: state.onboard,
  };
};

const mapDispatchToProps = {
  deactivateLoaderOverlay,
  activateLoaderOverlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFundReview);
