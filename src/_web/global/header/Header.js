import React, { Component } from "react";
import { connect } from "react-redux";
// COMPONENTS
// ...

// ASSETS
import radarIcon from "./assets/radar-icon.png";
import ethIcon from "./assets/eth-icon.svg";
import warningIcon from "./assets/warning-icon.svg";
import chevronDownIcon from "./assets/chevron-down-icon.svg";
import activityIcon from "./assets/activity-icon.svg";
// CSS
import "./styles/header.css";

import configs from "./../../../config";
import {
  connectAccountOnboard,
  disconnectAccountOnboard,
  checkWallet,
} from "./../../../redux/actions/OnboardActions";

import { ethers } from "ethers";

import {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
} from "./../../../redux/actions/LoaderAction";

class Header extends Component {
  constructor(props) {
    super(props);
    this.toPage = this.toPage.bind(this);
    this.state = {
      settingsPopup: false,
      selectedPage:
        typeof this.props.selectedPage !== "undefined"
          ? this.props.selectedPage
          : "",
      expectedNetworkId: configs.DEBUG_MODE
        ? configs.networkId_DEBUG
        : configs.networkId,
    };
  }

  toPage(path) {
    this.props.history.push(path);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  displaySettingsPopup = () => {
    this.setState({ settingsPopup: true });
    this.props.displaySettingsPopupEvent();
  };

  displayAddress = (address) => {
    return `${address.substring(0, 4)} ... ${address.substring(39)}`;
  };

  doCheckWallet(e) {
    e.preventDefault();
    if (this.props.onboard.networkId !== this.state.expectedNetworkId) {
      this.props.checkWallet();
    }
  }

  render() {
    const selectedNavbarItemStyle = {
      background: "linear-gradient(to right, #E926C3 10%, #FF4D86 100%)",
      WebkitBackgroundClip: "text",
      WebkiTtextFillColor: "transparent",
    };

    return (
      <>
        <div className="w-header-wrapper">
          <div className="w-header-content">
            <div className="w-header-navbar-section">
              <img
                src={radarIcon}
                alt="radar-protocol-icon"
                className="radar-protocol-icon"
              />
              <div
                className={
                  "w-header-navbar-item" +
                  (this.state.selectedPage === "home" ? "-selected" : "")
                }
                onClick={() => this.toPage("/", { name: "home-page" })}
              >
                HOME
              </div>
              <div
                className={
                  "w-header-navbar-item" +
                  (this.state.selectedPage === "vaults" ? "-selected" : "")
                }
                onClick={() => this.toPage("/vaults")}
              >
                VAULTS
              </div>

              <div
                className={
                  "w-header-navbar-item" +
                  (this.state.selectedPage === "yourfunds" ? "-selected" : "")
                }
                onClick={() => this.toPage("/your-funds")}
              >
                YOUR VAULTS
              </div>
            </div>
            <div className="w-header-account-section">
              <div className="w-header-settings-button">
                {/* <img
                  src={activityIcon}
                  alt="activity-icon"
                  className="activity-icon"
                /> */}
              </div>
              <div
                onClick={(e) => this.doCheckWallet(e)}
                className="w-header-eth-button"
              >
                <div className="w-header-eth-button-asset-section">
                  <img
                    src={
                      this.props.onboard.networkId ===
                      this.state.expectedNetworkId
                        ? ethIcon
                        : warningIcon
                    }
                    alt="eth-icon"
                    className="eth-icon"
                  />
                  <div className="w-header-eth-button-asset-text">
                    {this.props.onboard.networkId ===
                    this.state.expectedNetworkId
                      ? "Ethereum"
                      : "Unsupported Network"}
                  </div>
                </div>
                {/* <img
                  src={chevronDownIcon}
                  alt="arrow-down-icon"
                  className="chevron-down-icon"
                /> */}
              </div>

              {this.props.onboard.walletConnected ? (
                <>
                  <div
                    className="w-header-address-button"
                    onClick={() => this.displaySettingsPopup()}
                  >
                    <div className="w-header-address-button-amount-button">
                      <div className="w-header-address-button-amount-button-text">
                        {parseFloat(
                          this.props.onboard.balance == null
                            ? 0
                            : this.props.onboard.balance / 10 ** 18
                        ).toFixed(4)}{" "}
                        ETH
                      </div>
                    </div>
                    <div className="w-header-address-button-text">
                      {this.displayAddress(
                        this.props.onboard.address
                          ? this.props.onboard.address
                          : ""
                      )}
                    </div>
                    <img
                      src={chevronDownIcon}
                      alt="arrow-down-icon"
                      className="chevron-down-icon address"
                    />
                  </div>
                  <button
                    className="w-header-connect-wallet-button"
                    onClick={() => this.props.disconnectAccountOnboard()}
                  >
                    <div className="w-header-connect-wallet-button-text">
                      DISCONNECT
                    </div>
                  </button>
                </>
              ) : (
                <button
                  className="w-header-connect-wallet-button"
                  onClick={() => {
                    this.props.connectAccountOnboard();
                  }}
                >
                  <div className="w-header-connect-wallet-button-text">
                    CONNECT WALLET
                  </div>
                </button>
              )}
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
  connectAccountOnboard,
  disconnectAccountOnboard,
  checkWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
