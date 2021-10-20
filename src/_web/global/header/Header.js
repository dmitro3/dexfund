import React, { useState } from 'react';

// COMPONENTS
// ... 

// ASSETS
import radarIcon from './assets/radar-icon.svg';
import ethIcon from './assets/eth-icon.svg';
import chevronDownIcon from './assets/chevron-down-icon.svg';
import activityIcon from './assets/activity-icon.svg';

// CSS
import './styles/header.css';

// Web3
import { injected } from './../../../ethereum/walletConnect'
import { useWeb3React } from '@web3-react/core'



const Header = (props) => {

    const [settingsPopup, setSettingsPopup] = useState(false);
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const [selectedNavbarItemStyle, setSelectedNavbarItemStyle] = useState({
        background: 'linear-gradient(to right, #E926C3 10%, #FF4D86 100%)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent'
    })

    const toPage = (path) => {
        props.history.push(path);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    const displayAccountAddress = (address) => {
        return `${address.substring(0, 4)} ... ${address.substring(39)}`
    }

    const connect = async () => {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    const disconnect = async () => {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }



    const displaySettingsPopup = () => {
        if (activate) {
            setSettingsPopup({ settingsPopup: true });
            props.displaySettingsPopupEvent();
        }
    }


    return (

        <>
            <div className="w-header-wrapper">
                <div className="w-header-content">
                    <div className="w-header-navbar-section">
                        <img src={radarIcon} alt='radar-protocol-icon' className="radar-protocol-icon" />
                        <div className="w-header-navbar-item"
                            style={props.match.path === "/" ? selectedNavbarItemStyle : {}} onClick={() => toPage('/')}>
                            HOME
                        </div>
                        <div className="w-header-navbar-item"
                            style={props.match.path === "/vaults" ? selectedNavbarItemStyle : {}} onClick={() => toPage('/vaults')}>
                            VAULTS
                        </div>
                        <div className="w-header-navbar-item"
                            style={props.match.path === "/your-funds" ? selectedNavbarItemStyle : {}} onClick={() => toPage('/your-funds')}>
                            YOUR FUNDS
                        </div>
                    </div>
                    <div className="w-header-account-section">
                        <div className="w-header-settings-button">
                            <img src={activityIcon} alt='activity-icon' className="activity-icon" />
                        </div>


                        {active ? (<React.Fragment><div className="w-header-address-button" onClick={() => displaySettingsPopup()}>
                            <div className="w-header-address-button-amount-button">
                                <div className="w-header-address-button-amount-button-text">
                                    5.00 ETH
                                </div>
                            </div>
                            <div className="w-header-address-button-text">
                                {displayAccountAddress(account)}
                            </div>
                            <img src={chevronDownIcon} alt='arrow-down-icon' className="chevron-down-icon address" />
                           
                        </div>
                         <button onClick={disconnect} style={{border: 'none !important'}} className="w-header-connect-wallet-button">
                            <div className="w-header-connect-wallet-button-text">
                                Disconnect
                            </div>
                        </button>
                        </React.Fragment>
                        ) : (<button onClick={connect} style={{ border: 'none !important' }} className="w-header-connect-wallet-button">
                            <div className="w-header-connect-wallet-button-text">
                                CONNECT WALLET
                            </div>
                        </button>)}


                    </div>
                </div>
            </div>
        </>
    )

}

export default Header;
