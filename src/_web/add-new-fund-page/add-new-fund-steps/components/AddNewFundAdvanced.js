import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
import greyOutlineButtonIcon from "../assets/grey-outline-button-icon.svg";
import pinkOutlineButtonIcon from "../assets/pink-outline-button-icon.svg";
import pinkFillButtonIcon from "../assets/pink-fill-button-icon.svg";
import closeIcon from "../assets/close-icon.svg";
import caretDownIcon from "../assets/caret-down-icon.svg";
import caretUpIcon from "../assets/caret-up-icon.svg";

// STYLES
import "../styles/addNewFundSteps.css";

class AddNewFundAdvanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLock: "24",

      displayPolicyPopup: false,
      displayPolicyPopupList: false,

      displayPoliciesList: false,
      selectedPolicy: "Select",

      selectedPolicyItem: "",
      displaySelectedPolicyList: false,
    };
  }

  goToNextStep = () => {
    this.props.goToNextStepEvent();
  };

  goToPreviousStep = () => {
    this.props.goToPreviousStepEvent();
  };

  setTimeLock = (e) => {
    if (e.target.value < 0) {
      return;
    }

    if (e.target.value === "") {
      this.setState({
        timeLock: "0",
      });
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ timeLock: value });
  };

  renderPoliciesListOn() {
    return (
      <>
        <div
          className="w-add-new-fund-step-input denomination-asset-input"
          style={{ border: "1px solid #E926C3" }}
          onClick={() => this.setState({ displayPolicyPopupList: false })}
        >
          <div className="w-add-new-fund-denomination-asset-input-text">
            {this.state.selectedPolicy}
          </div>
          <img src={caretUpIcon} alt="caret-up-icon" />
        </div>
        <div className="w-add-new-fund-denomination-assets-list">
          <div
            className="w-add-new-fund-denomination-asset-row"
            onClick={() =>
              this.setState({
                selectedPolicy: "Adapter Blacklist",
                displayPolicyPopupList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">
              Adapter Blacklist
            </div>
          </div>
          <div
            className="w-add-new-fund-denomination-asset-row"
            onClick={() =>
              this.setState({
                selectedPolicy: "Adapter Whitelist",
                displayPolicyPopupList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">
              Adapter Whitelist
            </div>
          </div>
          <div
            className="w-add-new-fund-denomination-asset-row"
            onClick={() =>
              this.setState({
                selectedPolicy: "Asset Blacklist",
                displayPolicyPopupList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">
              Asset Blacklist
            </div>
          </div>
          <div
            className="w-add-new-fund-denomination-asset-row"
            onClick={() =>
              this.setState({
                selectedPolicy: "Adapter Whitelist",
                displayPolicyPopupList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">
              Adapter Whitelist
            </div>
          </div>
        </div>
      </>
    );
  }

  renderPoliciesListOff() {
    return (
      <>
        <div
          className="w-add-new-fund-step-input denomination-asset-input"
          onClick={() => this.setState({ displayPolicyPopupList: true })}
        >
          <div className="w-add-new-fund-denomination-asset-input-text">
            {this.state.selectedPolicy}
          </div>
          <img src={caretDownIcon} alt="caret-down-icon" />
        </div>
      </>
    );
  }

  renderSelectedPolicyListOn() {
    return (
      <>
        <div
          className="w-add-new-fund-step-input denomination-asset-input"
          style={{ border: "1px solid #E926C3" }}
          onClick={() => this.setState({ displaySelectedPolicyList: false })}
        >
          <div className="w-add-new-fund-denomination-asset-input-text">
            {this.state.selectedPolicy}
          </div>
          <img src={caretUpIcon} alt="caret-up-icon" />
        </div>
        <div className="w-add-new-fund-denomination-assets-list">
          <div
            className="w-add-new-fund-denomination-asset-row"
            onClick={() =>
              this.setState({
                selectedPolicyItem: "Item 1",
                displaySelectedPolicyList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">Item 1</div>
          </div>
          <div
            className="w-add-new-fund-denomination-asset-row"
            onClick={() =>
              this.setState({
                selectedPolicyItem: "Item 2",
                displaySelectedPolicyList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">Item 2</div>
          </div>
          <div
            className="w-add-new-fund-denomination-asset-row"
            onClick={() =>
              this.setState({
                selectedPolicyItem: "Item 3",
                displaySelectedPolicyList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">Item 3</div>
          </div>
        </div>
      </>
    );
  }

  renderSelectedPolicyListOff() {
    return (
      <>
        <div
          className="w-add-new-fund-step-input denomination-asset-input"
          onClick={() => this.setState({ displaySelectedPolicyList: true })}
        >
          <div className="w-add-new-fund-denomination-asset-input-text">
            {this.state.selectedPolicyItem}
          </div>
          <img src={caretDownIcon} alt="caret-down-icon" />
        </div>
      </>
    );
  }

  renderPolicyPopup() {
    return (
      <>
        <div className="w-add-new-fund-policy-popup-wrapper">
          <div className="w-add-new-fund-policy-popup-box">
            <div className="w-add-new-fund-policy-popup-header">
              <div className="w-add-new-fund-policy-popup-header-text">
                ADD A POLICY
              </div>
              <img
                src={closeIcon}
                alt="close-icon"
                className="policy-popup-close-icon"
                onClick={() => this.setState({ displayPolicyPopup: false })}
              />
            </div>
            <div className="w-add-new-fund-policy-popup-info">
              Available Policies
            </div>
            {this.state.displayPolicyPopupList === false &&
              this.renderPoliciesListOff()}
            {this.state.displayPolicyPopupList === true &&
              this.renderPoliciesListOn()}
            <div className="w-add-new-fund-policy-popup-policy-header">
              {this.state.selectedPolicy !== "Select" &&
                this.state.selectedPolicy}
            </div>
            {this.state.selectedPolicy !== "Select" &&
              this.state.displaySelectedPolicyList === false &&
              this.renderSelectedPolicyListOff()}
            {this.state.selectedPolicy !== "Select" &&
              this.state.displaySelectedPolicyList === true &&
              this.renderSelectedPolicyListOn()}
          </div>
        </div>
      </>
    );
  }

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
            <div className="w-add-new-fund-step current">
              <img
                src={pinkOutlineButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text current">
                Advanced Settings (optional)
              </div>
            </div>
            <div className="w-add-new-fund-step ">
              <img
                src={greyOutlineButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">Review</div>
            </div>
          </div>
          <div className="w-add-new-fund-step-input-section">
            <div className="w-add-new-fund-advanced-info">
              Only change these settings if you know what you are doing.
              <span style={{ fontWeight: "600", color: "#fff" }}>
                {" "}
                Advanced settings cannot be changed after creation.{" "}
              </span>
            </div>
            <div className="w-add-new-fund-advanced-info header">
              Flash Loan Protection
            </div>
            <div className="w-add-new-fund-advanced-info">
              Setting a minimum time between deposits and withdrawals can
              protect a vault from various forms of arbitrage. It defaults to 24
              hours.
            </div>
            <div
              className="w-add-new-fund-step-input"
              style={{ margin: "32px 0" }}
            >
              <input
                type="text"
                id="entry-fee"
                name="entryFee"
                value={this.state.timeLock}
                onChange={(e) => this.setTimeLock(e)}
                style={{
                  color: "#fff",
                  backgroundColor: "#070708",
                  fontFamily: "Bai Jamjuree, sans-serif",
                  borderWidth: "0",
                  fontSize: "15px",
                  fontWeight: "400",
                  outline: "none",
                  textAlign: "left",
                  width: "20%",
                }}
              ></input>
              <input
                type="text"
                id="hours"
                name="hours"
                placeholder="hours"
                disabled
                style={{
                  color: "#fff",
                  backgroundColor: "#070708",
                  fontFamily: "Bai Jamjuree, sans-serif",
                  borderWidth: "0",
                  fontSize: "15px",
                  fontWeight: "400",
                  outline: "none",
                  textAlign: "left",
                  width: "80%",
                }}
              ></input>
            </div>
            <div className="w-add-new-fund-advanced-info header">
              Risk Management Policies
            </div>
            <div
              className="w-add-new-fund-add-policy-button"
              onClick={() => this.setState({ displayPolicyPopup: true })}
            >
              <div className="w-add-new-fund-add-policy-button-text">
                ADD A POLICY
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
                NEXT
              </div>
            </div>
          </div>
        </div>
        {this.state.displayPolicyPopup === true && this.renderPolicyPopup()}
      </>
    );
  }
}

export default AddNewFundAdvanced;
