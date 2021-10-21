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

class AddNewFundFees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      managementFee: "",
      performanceFee: "",
      entryFee: "",

      displayManagementFee: false,
      displayPerformanceFee: false,
      displayEntryFee: false,
      ...this.props.state,
    };
  }

  setManagementFee = (e) => {
    if (e.target.value < 0) {
      return;
    }

    if (e.target.value > 100) {
      return;
    }

    if (e.target.value === "") {
      this.setState({
        managementFee: "0",
      });
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ managementFee: value });
  };

  setPerformanceFee = (e) => {
    if (e.target.value < 0) {
      return;
    }

    if (e.target.value > 100) {
      return;
    }

    if (e.target.value === "") {
      this.setState({
        performanceFee: "0",
      });
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ performanceFee: value });
  };

  setEntryFee = (e) => {
    if (e.target.value < 0) {
      return;
    }

    if (e.target.value > 100) {
      return;
    }

    if (e.target.value === "") {
      this.setState({
        entryFee: "0",
      });
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ entryFee: value });
  };

  renderManagementFeeOff() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOffIcon}
            alt="toggle-off-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayManagementFee: true })}
          />
          <div className="w-add-new-fund-toggle-text">Management fee</div>
        </div>
      </>
    );
  }

  renderManagementFeeOn() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOnIcon}
            alt="toggle-on-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayManagementFee: false })}
          />
          <div className="w-add-new-fund-toggle-text">Management fee</div>
        </div>
        <div className="w-add-new-fund-step-input toggle-input">
          <input
            type="text"
            id="management-fee"
            name="managementFee"
            placeholder="Management fee"
            value={this.state.managementFee}
            onChange={(e) => this.setManagementFee(e)}
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
            id="management-fee"
            name="managementFee"
            placeholder="%"
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

  renderPerformanceFeeOff() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOffIcon}
            alt="toggle-off-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayPerformanceFee: true })}
          />
          <div className="w-add-new-fund-toggle-text">Performance fee</div>
        </div>
      </>
    );
  }

  renderPerformanceFeeOn() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOnIcon}
            alt="toggle-on-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayPerformanceFee: false })}
          />
          <div className="w-add-new-fund-toggle-text">Performance fee</div>
        </div>
        <div className="w-add-new-fund-step-input toggle-input">
          <input
            type="text"
            id="management-fee"
            name="managementFee"
            placeholder="Performance fee"
            value={this.state.performanceFee}
            onChange={(e) => this.setPerformanceFee(e)}
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
            id="percent"
            name="percent"
            placeholder="%"
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

  renderEntryFeeOff() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOffIcon}
            alt="toggle-off-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayEntryFee: true })}
          />
          <div className="w-add-new-fund-toggle-text">Entry fee</div>
        </div>
      </>
    );
  }

  renderEntryFeeOn() {
    return (
      <>
        <div className="w-add-new-fund-toggle-row">
          <img
            src={toggleOnIcon}
            alt="toggle-on-icon"
            className="add-new-fund-toggle-icon"
            onClick={() => this.setState({ displayEntryFee: false })}
          />
          <div className="w-add-new-fund-toggle-text">Entry fee</div>
        </div>
        <div className="w-add-new-fund-step-input toggle-input">
          <input
            type="text"
            id="entry-fee"
            name="entryFee"
            placeholder="Entry fee"
            value={this.state.entryFee}
            onChange={(e) => this.setEntryFee(e)}
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
            id="percent"
            name="percent"
            placeholder="%"
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
              <div className="w-add-new-fund-step-text current">General</div>
            </div>
            <div className="w-add-new-fund-step current">
              <img
                src={pinkOutlineButtonIcon}
                alt="pink-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text current">
                Fees (optional)
              </div>
            </div>
            <div className="w-add-new-fund-step">
              <img
                src={greyOutlineButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">
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
            {this.state.displayManagementFee === false &&
              this.renderManagementFeeOff()}
            {this.state.displayManagementFee === true &&
              this.renderManagementFeeOn()}

            {this.state.displayPerformanceFee === false &&
              this.renderPerformanceFeeOff()}
            {this.state.displayPerformanceFee === true &&
              this.renderPerformanceFeeOn()}

            {this.state.displayEntryFee === false && this.renderEntryFeeOff()}
            {this.state.displayEntryFee === true && this.renderEntryFeeOn()}

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

export default AddNewFundFees;
