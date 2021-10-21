import React, { Component } from "react";
import { connect } from "react-redux";
import { utils } from 'ethers'
import { activateLoaderOverlay, deactivateLoaderOverlay } from './../../../../redux/actions/LoaderAction'

// COMPONENTS
// ...

// ASSETS
import pinkOutlineButtonIcon from "../assets/pink-outline-button-icon.svg";
import pinkFillButtonIcon from "../assets/pink-fill-button-icon.svg"


// STYLES
import "../styles/addNewFundSteps.css";


// CREATE FUND 
import { createNewFund } from './../../../../ethereum/release/fund'

class AddNewFundReview extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  goToNextStep = async () => {
    console.log("Create Fund")
    this.props.activateLoaderOverlay();
    const fundOwner = this.props.account.account.address;
    const fundName = "Mashujaa Fund";
    const timeLockInSeconds = 1;
    const denominationAsset = "0xd0a1e359811322d97991e03f863a0c30c2cf029c"
    // console.log(this.state)

    this.props.activateLoaderOverlay();

    // if (this.state.managerName && !this.state.fundName && !this.state.denominationAddress && !this.state.timeLock) {
    try {
      const fund = await createNewFund(
        this.state.managerName,
        this.state.fundName,
        this.state.denominationAddress,
        this.state.timeLock,
        utils.hexlify('0x'),
        utils.hexlify('0x'),
        1000000
      );
      console.log(fund)
      this.props.deactivateLoaderOverlay();
      
      this.props.goToNextStepEvent({
        ...this.state,
      });
  
    } catch (error) {
      console.log(error)
    }

    // save Fundd
    
    // } else {
    //   console.log("Provide all fields")
    // }





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
                <div className="w-fund-review-info-type">Manager</div>
                <div className="w-fund-review-info-value">
                  {this.state.managerName}
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
            <div className="w-fund-review-header">ADVANCES</div>
            <div className="w-fund-review-info-box">
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Adapter Blacklist</div>
                <div className="w-fund-review-info-value">*AB from parent*</div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Adapter Whitelist</div>
                <div className="w-fund-review-info-value">*AW from parent*</div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Asset Blacklist</div>
                <div className="w-fund-review-info-value">*aB from parent*</div>
              </div>
              <div className="w-fund-review-info-box-row">
                <div className="w-fund-review-info-type">Asset Whitelist</div>
                <div className="w-fund-review-info-value">*aW from parent*</div>
              </div>
            </div>
            <div className="w-fund-review-header">TERMS AND CONDITIONS</div>
            <div className="w-fund-review-info-box">
              <div className="w-fund-review-terms">
                By using this software, you understand, acknowledge and accept
                that Radar Protocol and/or the underlying software are provided
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
                SAVE FUND
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
  };
};


const mapDispatchToProps = {
  deactivateLoaderOverlay,
  activateLoaderOverlay
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewFundReview);


