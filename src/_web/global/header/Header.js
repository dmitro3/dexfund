import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
// COMPONENTS
// ...

// ASSETS
import logoIcon from "./assets/logo.png";
import moreIcon from './assets/moreIcon.png';
import collapseIcon from './assets/collapseIcon.png';
// import ethIcon from "./assets/eth-icon.svg";
import ethIcon from '../../../assets/images/eth-icon.svg';

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
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);
  const [isExpand, setExpand] = useState(false);

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
  }, [location]);

  useEffect(() => {
    if (!onboard.provider) {
      dispatch(connectAccountOnboard());
    }
  }, [])

  const toPage = (path) => {
    history.push(path);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const displayAddress = (address) => {
    return `${address.substring(0, 4)} ... ${address.substring(39)}`;
  };

  const doCheckWallet = (e) => {
    e.preventDefault();
    if (onboard.networkId !== expectedNetworkId) {
      dispatch(checkWallet());
    }
  }

  const toggleDisconnectButton = () => {
    setShowDisconnectButton(!showDisconnectButton);
  }

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
            <h2 className="title"><span className="hightlight">DEX</span><span>IFY</span></h2>

            <div
              className={
                "w-header-navbar-item" +
                (selectedPage === "home" ? "-selected" : "")
              }
              onClick={() => toPage("/", { name: "home-page" })}
            >
              DEXFUNDS
            </div>
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
                <div className="w-header-address-button">
                  <img src={ethIcon} className="ether-icon" alt="eth-icon"/>
                  <div className="account-information-wrapper">
                    <div className="w-header-address-button-amount-button">
                      <div className="w-header-address-button-amount-button-text">
                        {parseFloat(
                          onboard.balance == null
                            ? 0
                            : onboard.balance / 10 ** 18
                        ).toFixed(4)}{" "}
                        BNB
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
                
                <div className="header-profile-layout" 
                  onClick={(e) => {
                    toggleDisconnectButton()
                  }}
                >
                  <img src={avatarImage} className="avatar-image" alt="avatar" />
                  <div className="user-description">
                    <span className="username">{'New User'}</span>
                    <span className="detail">{'New User'}</span>
                  </div>
                  <ChevronDown className="user-expand" />
                  {
                  showDisconnectButton && (
                    <button className="btn-disconnect"
                      onClick={() => {
                        dispatch(disconnectAccountOnboard())
                        setShowDisconnectButton(false)
                      }
                      }
                    >Disconnect</button>
                    )
                  }
                </div>
                
                
              </>
            ) : (
              <button
                className="w-header-connect-wallet-button"
                onClick={() => {
                  dispatch(connectAccountOnboard())
                }}
              >
                  CONNECT
              </button>
            )}
            {
              onboard.provider && (
                !isExpand ? (
                  <img src={moreIcon} className="more-icon" onClick={() => {setExpand(true)}}/>
                ) : (
                  <img src={collapseIcon} className="collapse-icon" onClick={() => {setExpand(false)}}/>
                )
              )
            }
          </div>
        </div>
        {
          isExpand &&  (
            <div className="w-header-mobile-content">
              <div className="mobile-row">
                <div className="header-profile-layout" 
                  onClick={(e) => {
                    toggleDisconnectButton()
                  }}
                >
                  <img src={avatarImage} className="avatar-image" alt="avatar" />
                  <div className="user-description">
                    <span className="username">{'New User'}</span>
                    <span className="detail">{'New User'}</span>
                  </div>
                  <ChevronDown className="user-expand" />
                  {
                  showDisconnectButton && (
                    <button className="btn-disconnect"
                      onClick={() => {
                        dispatch(disconnectAccountOnboard())
                        setShowDisconnectButton(false)
                      }
                      }
                    >Disconnect</button>
                    )
                  }
                </div>
              </div>
              <div className="mobile-row">

                <div
                  className={
                    "w-header-navbar-item" +
                    (selectedPage === "home" ? "-selected" : "")
                  }
                  onClick={() => {
                    toPage("/", { name: "home-page" });
                    setExpand(false);
                  }}
                >
                  DEXFUNDS
                </div>
                <div
                  className={
                    "w-header-navbar-item" +
                    (selectedPage === "manage" ? "-selected" : "")
                  }
                  onClick={() => {
                    toPage("/manage")
                  setExpand(false)
                  }
                  }
                >
                  MANAGE
                </div>
                <div
                  className={
                    "w-header-navbar-item" +
                    (selectedPage === "profile" ? "-selected" : "")
                  }
                  onClick={() => {
                    toPage("/profile")
                    setExpand(false)
                  }
                  }
                >
                  PROFILE
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}

export default Header;