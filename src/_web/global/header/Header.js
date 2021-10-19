import React, { Component } from 'react';

// COMPONENTS
// ... 

// ASSETS
import radarIcon from './assets/radar-icon.svg';
import ethIcon from './assets/eth-icon.svg';
import chevronDownIcon from './assets/chevron-down-icon.svg';
import activityIcon from './assets/activity-icon.svg';

// CSS
import './styles/header.css';

class Header extends Component {

    constructor() {
        super();
        this.toPage = this.toPage.bind(this);
        this.state = {
            settingsPopup: false,
        }
    }

    toPage(path) {
        this.props.history.push(path);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    displaySettingsPopup = () => {
        this.setState({ settingsPopup: true });
        this.props.displaySettingsPopupEvent();
    }

    render() {

        const selectedNavbarItemStyle = {
            background: 'linear-gradient(to right, #E926C3 10%, #FF4D86 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent'
        }

        return (

            <>
                <div className="w-header-wrapper">
                    <div className="w-header-content">
                        <div className="w-header-navbar-section">
                            <img src={radarIcon} alt='radar-protocol-icon' className="radar-protocol-icon" />
                            <div className="w-header-navbar-item"
                                style={this.props.match.path === "/" ? selectedNavbarItemStyle : {}} onClick={() => this.toPage('/')}>
                                HOME
                            </div>
                            <div className="w-header-navbar-item"
                                style={this.props.match.path === "/vaults" ? selectedNavbarItemStyle : {}} onClick={() => this.toPage('/vaults')}>
                                VAULTS
                            </div>
                            <div className="w-header-navbar-item"
                                style={this.props.match.path === "/your-funds" ? selectedNavbarItemStyle : {}} onClick={() => this.toPage('/your-funds')}>
                                YOUR FUNDS
                            </div>
                        </div>
                        <div className="w-header-account-section">
                            <div className="w-header-settings-button">
                                <img src={activityIcon} alt='activity-icon' className="activity-icon" />
                            </div>
                            <div className="w-header-eth-button">
                                <div className="w-header-eth-button-asset-section">
                                    <img src={ethIcon} alt='eth-icon' className="eth-icon" />
                                    <div className="w-header-eth-button-asset-text">
                                        Ethereum
                                    </div>
                                </div>
                                <img src={chevronDownIcon} alt='arrow-down-icon' className="chevron-down-icon" />
                            </div>
                            {/* <div className="w-header-connect-wallet-button">
                                <div className="w-header-connect-wallet-button-text">
                                    CONNECT WALLET
                                </div>
                            </div> */}
                            <div className="w-header-address-button" onClick={() => this.displaySettingsPopup()}>
                                <div className="w-header-address-button-amount-button">
                                    <div className="w-header-address-button-amount-button-text">
                                        5.00 ETH
                                    </div>
                                </div>
                                <div className="w-header-address-button-text">
                                    0xb58...6c1
                                </div>
                                <img src={chevronDownIcon} alt='arrow-down-icon' className="chevron-down-icon address" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;
