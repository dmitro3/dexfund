// import { TimerSharp } from '@material-ui/icons';
import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
import closeIcon from "../assets/close-icon.svg";
import chevronLeftIcon from "../assets/chevron-left-icon.svg";
import infoIcon from "../assets/info-icon.svg";
import ethIcon from "../assets/eth-icon.png";

// CSS
import "../styles/fundSettings.css";
import "../../fund-details-popup/styles/fundDetailsPopup.css";
import { getRuleSet } from "../../../../sub-graph-integrations";
import { getIconSource } from "../../../../icons";

class RulesetSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDeposit: "1.00",
      maxDeposit: "10.00",

      popup: false,
      currentStep: "1",

      minDepositNow: "",
      minDepositSettings: true,

      maxDepositNow: "",
      maxDepositSettings: true,
    };
  }

  async componentDidMount() {
    // const ruleset = await getRuleSet(this.props.account.account.address);
  }

  setMinDeposit = (e) => {
    if (e.target.value < 0) {
      return;
    }

    if (e.target.value > 1000000000) {
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ minDepositNow: value });
  };

  setMaxDeposit = (e) => {
    if (e.target.value < 0) {
      return;
    }

    if (e.target.value > 1000000000) {
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ maxDepositNow: value });
  };

  renderMinDepOn() {
    return (
      <>
        <div className="w-ruleset-popup-input-row">
          <div className="w-ruleset-popup-input-info">Minimum deposit</div>
          <div className="w-ruleset-popup-input">
            <input
              type="text"
              id="minimum-deposit"
              name="minimumDeposit"
              placeholder={this.state.minDeposit}
              value={this.state.minDepositNow}
              onChange={(e) => this.setMinDeposit(e)}
            ></input>
          </div>
          <div
            className="w-ruleset-popup-input-button"
            onClick={() =>
              this.setState({
                minDepositSettings: false,
                minDepositNow: "",
              })
            }
          >
            DISABLE
          </div>
        </div>
      </>
    );
  }

  renderMinDepOff() {
    return (
      <>
        <div className="w-ruleset-popup-input-row">
          <div className="w-ruleset-popup-input-info">Minimum deposit</div>
          <div
            className="w-ruleset-popup-input-button enable"
            onClick={() => this.setState({ minDepositSettings: true })}
          >
            ENABLE
          </div>
        </div>
      </>
    );
  }

  renderMaxDepOn() {
    return (
      <>
        <div className="w-ruleset-popup-input-row">
          <div className="w-ruleset-popup-input-info">Maximum deposit</div>
          <div className="w-ruleset-popup-input">
            <input
              type="text"
              id="maximum-deposit"
              name="maximumDeposit"
              placeholder={this.state.maxDeposit}
              value={this.state.maxDepositNow}
              onChange={(e) => this.setMaxDeposit(e)}
            ></input>
          </div>
          <div
            className="w-ruleset-popup-input-button"
            onClick={() =>
              this.setState({
                maxDepositSettings: false,
                maxDepositNow: "",
              })
            }
          >
            DISABLE
          </div>
        </div>
      </>
    );
  }

  renderMaxDepOff() {
    return (
      <>
        <div className="w-ruleset-popup-input-row">
          <div className="w-ruleset-popup-input-info">Maximum deposit</div>
          <div
            className="w-ruleset-popup-input-button enable"
            onClick={() => this.setState({ maxDepositSettings: true })}
          >
            ENABLE
          </div>
        </div>
      </>
    );
  }

  renderStep1() {
    return (
      <>
        <div className="w-ruleset-popup-header">
          <img src={chevronLeftIcon} alt="chevron-left-icon" />
          <div className="w-ruleset-popup-header-title">
            EDIT DEPOSIT LIMITS
          </div>
          <img
            onClick={() => this.setState({ popup: false })}
            src={closeIcon}
            alt="close-icon"
            className="w-ruleset-header-icon"
          />
        </div>
        {this.state.minDepositSettings === true && this.renderMinDepOn()}
        {this.state.minDepositSettings === false && this.renderMinDepOff()}
        {this.state.maxDepositSettings === true && this.renderMaxDepOn()}
        {this.state.maxDepositSettings === false && this.renderMaxDepOff()}
        <div className="w-ruleset-continue-button-section">
          <div
            className="w-ruleset-continue-button"
            onClick={() => this.setState({ currentStep: "2" })}
          >
            CONTINUE
          </div>
        </div>
      </>
    );
  }

  renderStep2() {
    return (
      <>
        <div className="w-ruleset-popup-header">
          <img
            src={chevronLeftIcon}
            alt="chevron-left-icon"
            className="w-ruleset-popup-back-icon"
            onClick={() => this.setState({ currentStep: "1" })}
          />
          <div className="w-ruleset-popup-header-title">
            EDIT DEPOSIT LIMITS
          </div>
          <img
            onClick={() => this.setState({ popup: false })}
            src={closeIcon}
            alt="close-icon"
            className="w-ruleset-header-icon"
          />
        </div>
        <div className="w-ruleset-popup-info-card">
          <div className="w-ruleset-popup-info-header">
            <img
              src={infoIcon}
              alt="info-icon"
              className="w-ruleset-info-icon"
            />
            <div className="w-ruleset-popup-info">Details</div>
          </div>
          <div className="w-ruleset-popup-info">
            New minimum deposit amount: {this.state.minDepositNow}
          </div>
          <div className="w-ruleset-popup-info">
            New maximum deposit amount: {this.state.maxDepositNow}
          </div>
        </div>
        <div className="w-ruleset-continue-button-section">
          <div className="w-ruleset-details-popup-network-fee">
            <img
              src={ethIcon}
              alt="eth-icon"
              className="w-ruleset-network-fee-icon token-avatar"
            />
            <div className="w-fund-details-popup-network-fee-text">
              <div className="w-fund-details-popup-network-fee-header">
                Network Fees
              </div>
              <div className="w-fund-details-popup-network-fee-eth">
                0.003232 BNB
              </div>
              <div className="w-fund-details-popup-network-fee-usd">$9.45</div>
            </div>
          </div>
          <div className="w-ruleset-continue-button">SAVE</div>
        </div>
      </>
    );
  }

  renderPopup() {
    return (
      <>
        <div className="w-ruleset-popup-wrapper">
          <div className="w-ruleset-popup-box">
            {this.state.currentStep === "1" && this.renderStep1()}
            {this.state.currentStep === "2" && this.renderStep2()}
          </div>
        </div>
      </>
    );
  }

  render() {
    return (
      <>
        <div className="w-fund-settings-header">Deposit limits</div>
        <div className="w-fund-settings-card">
          <div className="w-fund-ruleset-settings-row">
            <div className="w-fund-ruleset-settings-values-section">
              <div className="w-fund-ruleset-settings-value-row">
                <label htmlFor="value" className="w-fund-ruleset-label">Minimum deposit:</label>
                <span className="w-fund-ruleset-bullet">
                  <span className="limit-deposit-value">{this.state.minDeposit}</span>
                  <span className="token-symbol">BUSD</span>
                  <img src={getIconSource('busd')} className="small-token-avatar"/>
                </span>
              </div>
              <div className="w-fund-ruleset-settings-value-row">
                <label htmlFor="value" className="w-fund-ruleset-label">Minimum deposit:</label>
                <span className="w-fund-ruleset-bullet">
                  <span className="limit-deposit-value">{this.state.maxDeposit}</span>
                  <span className="token-symbol">BUSD</span>
                  <img src={getIconSource('busd')} className="small-token-avatar"/>
                </span>
              </div>
            </div>
            <div className="w-fund-ruleset-settings-buttons-section">
              <div
                className="w-fund-ruleset-settings-button"
                style={{ marginRight: "10px" }}
                onClick={() => this.setState({ popup: true })}
              >
                EDIT
              </div>
              <div
                className="w-fund-ruleset-settings-button"
                onClick={() =>
                  this.setState({
                    minDeposit: "- ",
                    maxDeposit: "- ",
                  })
                }
              >
                DISABLE
              </div>
            </div>
          </div>
        </div>
        {this.state.popup === true && this.renderPopup()}
      </>
    );
  }
}

export default RulesetSettings;
