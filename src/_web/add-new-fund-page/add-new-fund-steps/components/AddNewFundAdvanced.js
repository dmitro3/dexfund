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
import configs from './../../../../config';

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
      blackListingAssets: [],
      whiteListingAssets: [],
      blackListingAdapters: [],
      whiteListingAdapters: [],
      protocols: configs.ADAPTERS,
      policyPopupWarningText: "",
      timelockWarningText: "",
      ...this.props.state
    };
    this.checkTimelockValue = this.checkTimelockValue.bind(this);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
    this.policyPopupRef = React.createRef();
  }

  handleClickEvent(event) {
    if (this.state.displayPolicyPopup && this.policyPopupRef && !this.policyPopupRef.current.contains(event.target)) {
      this.setState({displayPolicyPopup: false});
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickEvent);
}

componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickEvent);
}

  goToNextStep = async () => {
    await this.checkTimelockValue();
    this.props.goToNextStepEvent({
      ...this.state,
    });
  };

  goToPreviousStep = () => {
    this.props.goToPreviousStepEvent({
      ...this.state,
    });
  };

  setTimeLock = async (e) => {
    if (e.target.value < 0) {
      return;
    }

    if (e.target.value.length > 5) {
      return;
    }

    if (e.target.value === "" || e.target.value == 0) {
      await this.setState({
        timelockWarningText: "Warning: This number should be greater than 0.",
        timeLock: e.target.value
      });
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value) && e.target.value !== "") {
      return;
    }

    var value = e.target.value;
    await this.setState({ timeLock: value, timelockWarningText: "" });
  };

  checkTimelockValue() {
    if (this.state.timeLock === "" || parseFloat(this.state.timeLock) <= 0) {
      this.setState({
        timeLock: "1",
        timelockWarningText: ""
      })
    }
  }

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
                selectedPolicy: "Protocol Blacklist",
                displayPolicyPopupList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">
              Protocol Blacklist
            </div>
          </div>
          <div
            className="w-add-new-fund-denomination-asset-row"
            onClick={() =>
              this.setState({
                selectedPolicy: "Protocol Whitelist",
                displayPolicyPopupList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">
              Protocol Whitelist
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
                selectedPolicy: "Asset Whitelist",
                displayPolicyPopupList: false,
              })
            }
          >
            <div className="w-denomination-asset-primary-text">
              Asset Whitelist
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

    arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

  toggleProtocol (address, action) {
    if (action == "whitelist") {
      if (this.state.whiteListingAdapters.includes(address)) {
        this.setState({
          whiteListingAdapters: this.arrayRemove(this.state.whiteListingAdapters, address)
        })
      } else {
        this.setState({
          whiteListingAdapters: this.state.whiteListingAdapters.concat(address)
        });
      }
    } else if (action == "blacklist") {
      if (this.state.blackListingAdapters.includes(address)) {
        this.setState({
          blackListingAdapters: this.arrayRemove(this.state.blackListingAdapters, address)
        })
      } else {
        this.setState({
          blackListingAdapters: this.state.blackListingAdapters.concat(address)
        });
      }
    }
  }

  async toggleAsset (address, action) {
    if (action == "whitelist") {
      if (this.state.whiteListingAssets.includes(address)) {
        await this.setState({
          whiteListingAssets: this.arrayRemove(this.state.whiteListingAssets, address)
        })
      } else {
        await this.setState({
          whiteListingAssets: this.state.whiteListingAssets.concat(address)
        });
      }
    } else if (action == "blacklist") {
      if (this.state.blackListingAssets.includes(address)) {
        await this.setState({
          blackListingAssets: this.arrayRemove(this.state.blackListingAssets, address)
        })
      } else {
        await this.setState({
          blackListingAssets: this.state.blackListingAssets.concat(address)
        });
      }
    }

    this.checkWarning();
  }

  checkWarning() {
    let wtext;
    console.log(!this.state.whiteListingAssets.includes(this.state.denominationAddress))
    if(this.state.selectedPolicy == "Asset Whitelist" && this.state.whiteListingAssets.length > 0 && !this.state.whiteListingAssets.includes(this.state.denominationAddress)) {
      wtext = "Warning: If you are going to use an Asset Whitelist Adaptor, you need to whitelist your denomination asset."
    } else if(this.state.selectedPolicy == "Asset Blacklist" && this.state.blackListingAssets.includes(this.state.denominationAddress)) {
      wtext = "Warning: If you are going to use an Asset Blacklist Adaptor, you cannot blacklist your denomination asset."
    } else {
      wtext = "";
    }
    this.setState({
      policyPopupWarningText: wtext
    });
  }


  // render whitelisting Adapters
  renderPoliciesListWhitelisting () {
    const preState = this;
    return (
      this.state.protocols.map((item) => (<div
        className={this.state.whiteListingAdapters.includes(item.address) ? "w-add-new-fund-denomination-asset-row-selected" : "w-add-new-fund-denomination-asset-row"}
        key={item.address}
        onClick={() => {
          this.toggleProtocol(item.address, "whitelist");
        }
        }
      >
        <div className="w-denomination-asset-primary-text">{item.name}</div>
      </div>))
    )
  }

   // render blacklisting Adapters
   renderPoliciesListBlacklisting () {
    const preState = this;
    return (
      this.state.protocols.map((item) => (<div
        className={this.state.blackListingAdapters.includes(item.address) ? "w-add-new-fund-denomination-asset-row-selected" : "w-add-new-fund-denomination-asset-row"}
        key={item.address}
        onClick={() => {
          this.toggleProtocol(item.address, "blacklist")
        }
        }
      >
        <div className="w-denomination-asset-primary-text">{item.name}</div>
      </div>))
    )
  }

  // Assets

  // render whitelisting Adapters
  renderAssetsListWhitelisting () {
    const preState = this;
    return (
      this.state.assetList.map((item) => (<div
        className={this.state.whiteListingAssets.includes(item.id) ? "w-add-new-fund-denomination-asset-row-selected" : "w-add-new-fund-denomination-asset-row"}
        key={item.id}
        onClick={() => {
          this.toggleAsset(item.id, "whitelist");
        }
        }
      >
        <div className="w-denomination-asset-primary-text">{item.name} ({item.symbol}) </div>
      </div>))
    )
  }

   // render blacklisting Adapters
   renderAssetBlacklisting () {
     const preState = this;
    return (
      this.state.assetList.map((item) => (<div
        className={this.state.blackListingAssets.includes(item.id) ? "w-add-new-fund-denomination-asset-row-selected" : "w-add-new-fund-denomination-asset-row"}
        key={item.id}
        onClick={() => {
          this.toggleAsset(item.id, "blacklist");
        }
        }
      >
        <div className="w-denomination-asset-primary-text">{item.name} ({item.symbol}) </div>
      </div>))
    )
  }

  // end of assets

  getCurrentPolicyArrayLength() {
    if(this.state.selectedPolicy === 'Protocol Blacklist') {
      return this.state.blackListingAdapters.length;
    }

    if(this.state.selectedPolicy === 'Protocol Whitelist') {
      return this.state.whiteListingAdapters.length;
    }

    if(this.state.selectedPolicy === 'Asset Blacklist') {
      return this.state.blackListingAssets.length;
    }

    if(this.state.selectedPolicy === 'Asset Whitelist') {
      return this.state.whiteListingAssets.length;
    }

    return 0;
  }


  renderWhichForm() {
    if(this.state.selectedPolicy === 'Protocol Blacklist') {
      return this.renderPoliciesListBlacklisting();
    }

    if(this.state.selectedPolicy === 'Protocol Whitelist') {
      return this.renderPoliciesListWhitelisting();
    }

    if(this.state.selectedPolicy === 'Asset Blacklist') {
      return this.renderAssetBlacklisting();
    }

    if(this.state.selectedPolicy === 'Asset Whitelist') {
      return this.renderAssetsListWhitelisting();
    }

    return (<div> </div>)
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
          Selected: {this.getCurrentPolicyArrayLength()}
          </div>
          <img src={caretUpIcon} alt="caret-up-icon" />
        </div>
        <div style={{overflowY: "scroll", height: "25vh"}} className="w-add-new-fund-denomination-assets-list">

          {
            this.renderWhichForm()
          }

          
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
            Selected: {this.getCurrentPolicyArrayLength()}
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
          <div ref={this.policyPopupRef} className="w-add-new-fund-policy-popup-box">
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

            <div className="policy-popup-warning-text">
              {this.state.policyPopupWarningText}
            </div>
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
              hours.<b> It is really important to have this number greater than 0,
              so flash loan/arbitrage attacks are not possible on your fund.</b>
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
                onBlur={() => this.checkTimelockValue()}
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
            <div className="policy-popup-warning-text">
              {this.state.timelockWarningText}
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
