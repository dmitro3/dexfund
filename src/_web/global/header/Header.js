import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
// COMPONENTS
// ...

// ASSETS
import logoIcon from "./assets/logo.png";
// import ethIcon from "./assets/eth-icon.svg";
import ethIcon from '../../../assets/images/eth-icon.png';

// CSS
import "./styles/header.css";

import configs from "./../../../config";
import {
  connectAccountOnboard,
  disconnectAccountOnboard,
  checkWallet,
} from "./../../../redux/actions/OnboardActions";

import {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
} from "./../../../redux/actions/LoaderAction";
import avatarImage from './assets/avatar.png';
import { ChevronDown } from 'react-bootstrap-icons';
import {Bell} from 'react-bootstrap-icons'
import {useHistory, useLocation} from 'react-router-dom';
import { getOnboardInformation } from "../../../redux/reducers/OnboardReducer";
import { getConnectInformation } from "../../../redux/reducers/AccountConnectReducer";

const Header = (props) => {
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');
  const expectedNetworkId = configs.DEBUG_MODE ? configs.networkId_DEBUG : configs.networkId;
  const dispatch = useDispatch();
  const onboard = useSelector(state => getOnboardInformation(state));
  const account = useSelector(state => getConnectInformation(state));
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    console.log('pathname: ', pathName, location)
    let _page = "home";
    switch(pathName) {
      case "/manage":
        _page = "manage";
        break;
      case "/profile":
        _page = "profile";
        break;
      default:
        _page = "home";
        break;
    }

    setSelectedPage(_page);
  })
  const toPage = (path) => {
    history.push(path);
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const displaySettingsPopup = () => {
    setSettingsPopup(true);
    props.displaySettingsPopupEvent();
  };

  const displayAddress = (address) => {
    return `${address.substring(0, 4)} ... ${address.substring(39)}`;
  };

  const doCheckWallet = (e) => {
    e.preventDefault();
    if (onboard.networkId !== expectedNetworkId) {
      dispatch(checkWallet());
    }
  }

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
              src={logoIcon}
              alt="radar-protocol-icon"
              className="radar-protocol-icon"
            />
            <div
              className={
                "w-header-navbar-item" +
                (selectedPage === "home" ? "-selected" : "")
              }
              onClick={() => toPage("/", { name: "home-page" })}
            >
              HOME
            </div>
            {/* <div
              className={
                "w-header-navbar-item" +
                (selectedPage === "vaults" ? "-selected" : "")
              }
              onClick={() => toPage("/vaults")}
            >
              VAULTS
            </div>

            <div
              className={
                "w-header-navbar-item" +
                (selectedPage === "yourfunds" ? "-selected" : "")
              }
              onClick={() => toPage("/your-funds")}
            >
              YOUR VAULTS
            </div> */}
            {
              onboard.provider && (
                <>
                <div
                  className={
                    "w-header-navbar-item" +
                    (selectedPage === "manage" ? "-selected" : "")
                  }
                  onClick={() => toPage("/manage")}
                >
                  MANAGE
                </div>
                <div
                className={
                  "w-header-navbar-item" +
                  (selectedPage === "profile" ? "-selected" : "")
                }
                onClick={() => toPage("/profile")}
              >
                PROFILE
              </div>
              </>
              )
            }
            
          </div>
          <div className="w-header-account-section">

            {onboard.walletConnected ? (
              <>
                <div
                  className="w-header-address-button"
                  onClick={() => dispatch(disconnectAccountOnboard())}
                >
                  <img src={ethIcon} className="ether-icon" alt="eth-icon"/>
                  <div className="account-information-wrapper">
                    <div className="w-header-address-button-amount-button">
                      <div className="w-header-address-button-amount-button-text">
                        {parseFloat(
                          onboard.balance == null
                            ? 0
                            : onboard.balance / 10 ** 18
                        ).toFixed(4)}{" "}
                        ETH
                      </div>
                    </div>
                    <div className="w-header-address-button-text">
                      {
                      displayAddress(
                        onboard.address
                          ? onboard.address
                          : ""
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="notification-layout">
                  <Bell className="notification-icon"/>
                  <span className="badge notification-count">{1}</span>
                </div>
                <div className="header-profile-layout" 
                  // onClick={() => displaySettingsPopup()}
                >
                  <img src={avatarImage} className="avatar-image" alt="avatar" />
                  <div className="user-description">
                    <span className="username">{'Jonathan Amam'}</span>
                    <span className="detail">{'New User'}</span>
                  </div>
                  <ChevronDown className="user-expand" />
                </div>
              </>
            ) : (
              <button
                className="w-header-connect-wallet-button"
                onClick={() => {
                  dispatch(connectAccountOnboard());
                }}
              >
                  CONNECT WALLET
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;