import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
import greyOutlineButtonIcon from "../assets/grey-outline-button-icon.svg";
import pinkOutlineButtonIcon from "../assets/pink-outline-button-icon.svg";
import pinkFillButtonIcon from "../assets/pink-fill-button-icon.svg";
import toggleOffIcon from "../assets/toggle-off-icon.svg";
import toggleOnIcon from "../assets/toggle-on-icon.svg";

// STYLES
import "../styles/addNewFundSteps.css";

class AddNewFundDeposits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDeposit: "",
      maxDeposit: "",

      displayMinDeposit: false,
      displayMaxDeposit: false,

      ...this.props.state,
    };
  }

  setMinDeposit = (e) => {
    if (e.target.value < 0) {
      return;
    }

    if (e.target.value > 100) {
      return;
    }

    if (e.target.value === "") {
      this.setState({
        minDeposit: "0",
      });
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ minDeposit: value });
  };

  setMaxDeposit = (e) => {
    if (e.target.value < 0) {
      return;
    }

    if (e.target.value === "") {
      this.setState({
        maxDeposit: "0",
      });
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ maxDeposit: value });
  };

  renderMinDepositOff() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOffIcon}
            alt="toggle-off-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayMinDeposit: true })}
          />
          <div className="w-add-new-fund-toggle-text">Minimum deposit</div>
        </div>
      </>
    );
  }

  renderMinDepositOn() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOnIcon}
            alt="toggle-on-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayMinDeposit: false })}
          />
          <div className="w-add-new-fund-toggle-text">Minimum deposit</div>
        </div>
        <div className="w-add-new-fund-step-input toggle-input">
          <input
            type="text"
            id="minimum-deposit"
            name="minimumDeposit"
            placeholder="Minimum deposit"
            value={this.state.minDeposit}
            onChange={(e) => this.setMinDeposit(e)}
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
            id="minimum-deposit"
            name="minimumDeposit"
            placeholder="Asset"
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
      </>
    );
  }

  renderMaxDepositOff() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOffIcon}
            alt="toggle-off-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayMaxDeposit: true })}
          />
          <div className="w-add-new-fund-toggle-text">Maximum deposit</div>
        </div>
      </>
    );
  }

  renderMaxDepositOn() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOnIcon}
            alt="toggle-on-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayMaxDeposit: false })}
          />
          <div className="w-add-new-fund-toggle-text">Maximum deposit</div>
        </div>
        <div className="w-add-new-fund-step-input toggle-input">
          <input
            type="text"
            id="maximum-deposit"
            name="maximumDeposit"
            placeholder="Maximum deposit"
            value={this.state.maxDeposit}
            onChange={(e) => this.setMaxDeposit(e)}
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
            id="maximum-deposit"
            name="maximumDeposit"
            placeholder="Asset"
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
      </>
    );
  }

  goToNextStep = () => {
    this.props.goToNextStepEvent({
      ...this.state,
    });
  };

  goToPreviousStep = () => {
    this.props.goToPreviousStepEvent({
      ...this.state,
    });
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
              <div className="w-add-new-fund-step-text">General</div>
            </div>
            <div className="w-add-new-fund-step">
              <img
                src={pinkFillButtonIcon}
                alt="pink-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">Fees (optional)</div>
            </div>
            <div className="w-add-new-fund-step current">
              <img
                src={pinkOutlineButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text current">
                Deposits (optional)
              </div>
            </div>
            <div className="w-add-new-fund-step">
              <img
                src={greyOutlineButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">
                Advanced Settings (optional)
              </div>
            </div>
            <div className="w-add-new-fund-step">
              <img
                src={greyOutlineButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">Review</div>
            </div>
          </div>
          <div className="w-add-new-fund-step-input-section">
            {this.state.displayMinDeposit === false &&
              this.renderMinDepositOff()}
            {this.state.displayMinDeposit === true && this.renderMinDepositOn()}

            {this.state.displayMaxDeposit === false &&
              this.renderMaxDepositOff()}
            {this.state.displayMaxDeposit === true && this.renderMaxDepositOn()}

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
      </>
    );
  }
}

export default AddNewFundDeposits;
