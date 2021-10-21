import React, { Component } from "react";
import { connect } from "react-redux";
// COMPONENTS
// ...

// ASSETS
import radarIcon from "./assets/radar-icon.svg";
import ethIcon from "./assets/eth-icon.svg";
import chevronDownIcon from "./assets/chevron-down-icon.svg";
import activityIcon from "./assets/activity-icon.svg";
// CSS
import "./styles/header.css";
import {
  connectAccount,
  disconnectAccount,
} from "./../../../redux/actions/AccountActions";
import {utils}  from 'ethers'
import walletWrapper from "../../../ethereum/provider";
import {createNewFund}  from '@ngeni-we-do/radar-protocol'


class Header extends Component {
  constructor(props) {
    super(props);
    this.toPage = this.toPage.bind(this);
    this.state = {
      settingsPopup: false,
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

  saveItem = async () => {
    console.log("Create Fund")
    const fundOwner = this.props.account.account.address;
    const fundName = "mashujaa Fund";
    const timeLockInSeconds = 1;
    const connectedWallet  =  await walletWrapper(this.props.account.account.provider, this.props.account.account.address)
    const options = {
        nonce: await connectedWallet.getNonce(),
        gasLimit: 1000000
    }
    console.log("REACHED")
    try {
        const fund =  await createNewFund(
            fundOwner,
            fundName,
            timeLockInSeconds,
            utils.hexlify('0x'),
            utils.hexlify('0x'),
            this.props.account.account.signer,
            options);
    
        console.log(fund)
    } catch (error) {
        console.log(error)
    }
}

  displaySettingsPopup = () => {
    this.setState({ settingsPopup: true });
    this.props.displaySettingsPopupEvent();
  };

  displayAddress = (address) => {
      return `${address.substring(0,4)} ... ${address.substring(39)}`
  }

  render() {
    const selectedNavbarItemStyle = {
      background: "linear-gradient(to right, #E926C3 10%, #FF4D86 100%)",
      "WebkitBackgroundClip": "text",
      "WebkiTtextFillColor": "transparent",
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
                className="w-header-navbar-item"
                style={
                  this.props.match.path === "/" ? selectedNavbarItemStyle : {}
                }
                onClick={() => this.toPage("/")}
              >
                HOME
              </div>
              <div
                className="w-header-navbar-item"
                style={
                  this.props.match.path === "/your-funds"
                    ? selectedNavbarItemStyle
                    : {}
                }
                onClick={() => this.toPage("/your-funds")}
              >
                YOUR FUNDS
              </div>
            </div>
            <div className="w-header-account-section">
              <div className="w-header-settings-button">
                <img
                  src={activityIcon}
                  alt="activity-icon"
                  className="activity-icon"
                />
              </div>
              <div className="w-header-eth-button">
                <div className="w-header-eth-button-asset-section">
                  <img src={ethIcon} alt="eth-icon" className="eth-icon" />
                  <div className="w-header-eth-button-asset-text">Ethereum</div>
                </div>
                <img
                  src={chevronDownIcon}
                  alt="arrow-down-icon"
                  className="chevron-down-icon"
                />
              </div>

              {this.props.account.account ? (
                  <>
                <div
                  className="w-header-address-button"
                  onClick={() => this.displaySettingsPopup()}
                >
                  <div className="w-header-address-button-amount-button">
                    <div className="w-header-address-button-amount-button-text">
                      {this.props.account.account.balance} ETH
                    </div>
                  </div>
                  <div className="w-header-address-button-text">
                    {this.displayAddress(this.props.account.account.address ? this.props.account.account.address : "")}
                  </div>
                  <img
                    src={chevronDownIcon}
                    alt="arrow-down-icon"
                    className="chevron-down-icon address"
                  />
                </div>
                <button
                  className="w-header-connect-wallet-button"
                  onClick={() => this.saveItem()}
                >
                  <div className="w-header-connect-wallet-button-text">
                    Create Fund
                  </div>
                </button>
                </>
              ) : (
                <button
                  className="w-header-connect-wallet-button"
                  onClick={() => this.props.connectAccount()}
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
  };
};


const mapDispatchToProps = {
  connectAccount,
  disconnectAccount
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
