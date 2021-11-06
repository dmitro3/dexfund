import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
import greyOutlineButtonIcon from "../assets/grey-outline-button-icon.svg";
import pinkOutlineButtonIcon from "../assets/pink-outline-button-icon.svg";
import caretDownIcon from "../assets/caret-down-icon.svg";
import caretUpIcon from "../assets/caret-up-icon.svg";

// STYLES
import "../styles/addNewFundSteps.css";

class AddNewFundGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fundName: "",
      managerName: "",
      denominationAsset: "Denomination asset",
      denominationAddress: null,
      denominationAssetsList: false,
      ...this.props.state,
    };
  }

  goToNextStep = () => {
    if (
      this.state.fundName === "" ||
      // this.state.managerName === "" ||
      this.state.denominationAddress === null ||
      this.state.denominationAsset === "Denomination asset"
    ) {
      return;
    } else {
      this.props.goToNextStepEvent({ ...this.state });
    }
  };

  renderAssetsListOn() {
    return (
      <>
        <div
          className="w-add-new-fund-step-input denomination-asset-input"
          style={{ border: "1px solid #E926C3" }}
          onClick={() =>
            this.setState({
              denominationAssetsList: false,
            })
          }
        >
          <div className="w-add-new-fund-denomination-asset-input-text">
            {this.state.denominationAsset}
          </div>
          <img src={caretUpIcon} alt="caret-up-icon" />
        </div>
        <div
          style={{ overflowY: "scroll", height: "25vh" }}
          className="w-add-new-fund-denomination-assets-list"
        >
          {this.state.assets.map((asset) => {
            return (
              <div
                className="w-add-new-fund-denomination-asset-row"
                onClick={() =>
                  this.setState({
                    denominationAsset: asset.symbol,
                    denominationAddress: asset.id,
                    denominationAssetsList: false,
                  })
                }
              >
                <div className="w-denomination-asset-primary-text">
                  {asset.symbol}
                </div>
                <div className="w-denomination-asset-secondary-text">
                  {asset.name}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  renderAssetsListOff() {
    return (
      <>
        <div
          className="w-add-new-fund-step-input denomination-asset-input"
          onClick={() =>
            this.setState({
              ...this.props.state,
              denominationAssetsList: true,
            })
          }
        >
          <div className="w-add-new-fund-denomination-asset-input-text">
            {this.state.denominationAsset}
          </div>
          <img src={caretDownIcon} alt="caret-down-icon" />
        </div>
      </>
    );
  }

  setFundName = (e) => {
    if (e.target.value === "") {
      this.setState({
        fundName: "",
      });
      return;
    }

    var value = e.target.value;
    this.setState({ fundName: value });
  };

  setManagerName = (e) => {
    if (e.target.value === "") {
      this.setState({
        managerName: "",
      });
      return;
    }

    var value = e.target.value;
    this.setState({ managerName: value });
  };

  render() {
    const disabledNextButtonStyle = {
      background: "linear-gradient(to right, #17171C 10%, #17171C 100%)",
      backgroundColor: "#17171C",
      color: "#999",
    };

    return (
      <>
        <div className="w-add-new-fund-step-card">
          <div className="w-add-new-fund-step-sidebar">
            <div className="w-add-new-fund-step current">
              <img
                src={pinkOutlineButtonIcon}
                alt="pink-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text current">General</div>
            </div>
            <div className="w-add-new-fund-step">
              <img
                src={greyOutlineButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">Fees (optional)</div>
            </div>
            <div className="w-add-new-fund-step">
              <img
                src={greyOutlineButtonIcon}
                alt="grey-outline-button-icon"
                className="add-new-fund-button-icon"
              />
              <div className="w-add-new-fund-step-text">
                Depositors (optional)
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
            <div className="w-add-new-fund-step-input">
              <input
                type="text"
                id="new-fund-name"
                name="fundName"
                placeholder="Vault name"
                value={this.state.fundName}
                onChange={(e) => this.setFundName(e)}
                style={{
                  color: "#fff",
                  backgroundColor: "#070708",
                  fontFamily: "Bai Jamjuree, sans-serif",
                  borderWidth: "0",
                  fontSize: "15px",
                  fontWeight: "400",
                  outline: "none",
                  textAlign: "left",
                  width: "100%",
                }}
              ></input>
            </div>
            <br />

            {/* <div
              className="w-add-new-fund-step-input"
              style={{ margin: "16px 0" }}
            >
              <input
                type="text"
                id="new-fund-manager-name"
                name="managerName"
                placeholder="Manager name"
                value={this.state.managerName}
                onChange={(e) => this.setManagerName(e)}
                style={{
                  color: "#fff",
                  backgroundColor: "#070708",
                  fontFamily: "Bai Jamjuree, sans-serif",
                  borderWidth: "0",
                  fontSize: "15px",
                  fontWeight: "400",
                  outline: "none",
                  textAlign: "left",
                  width: "100%",
                }}
              ></input>
            </div> */}
            {this.state.denominationAssetsList === false &&
              this.renderAssetsListOff()}
            {this.state.denominationAssetsList === true &&
              this.renderAssetsListOn()}
            <div className="w-add-new-fund-step-info-text">
              The denomination asset is the asset in which depositors deposit
              into your vault and in which the vault's share price and the
              performance are measured.
            </div>
            <div
              className="w-add-new-fund-step-next-button"
              onClick={() => this.goToNextStep()}
              style={
                this.state.fundName === "" ||
                this.state.denominationAsset === "Denomination asset"
                  ? disabledNextButtonStyle
                  : {}
              }
            >
              NEXT
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddNewFundGeneral;
