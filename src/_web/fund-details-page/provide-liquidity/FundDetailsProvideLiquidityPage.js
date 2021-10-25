import React, { Component } from 'react';

// COMPONENTS
import Header from '../../global/header/Header';
import SettingsPopup from '../../global/settings-popup/SettingsPopup';
import FundProvideLiquidity from './FundProvideLiquidity';

// ASSETS
// ... 

// CSS
import './styles/fundProvideLiquidity.css';
import '../fundDetailsPage.css';

class FundDetailsProvideLiquidityPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            fundAddress: this.props.location.state.fundAddress,
            fundName: this.props.location.state.fundName,

            sidebar: false,
            settingsPopup: false,
        }
    }

    toPage(category, params) {
        this.props.history.push(('/fund/' + this.state.fundAddress + '/' + category), params);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    };

    displaySettingsPopup = () => {
        this.setState({ settingsPopup: true })
    }

    closeSettingsPopup = () => {
        this.setState({ settingsPopup: false })
    }

    render() {

        var width = window.innerWidth;

        const doNotDisplay = {
            display: 'none',
        }

        const selectedNavbarItemStyle = {
            background: 'linear-gradient(to right, #E926C3 10%, #FF4D86 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
        }

        var fundAddress = this.state.fundAddress;
        var fundName = this.state.fundName;

        if (width > 1000) {
            return (

                <>
                    <Header {...this.props}
                        displaySettingsPopupEvent={this.displaySettingsPopup} />
                    <div className="w-fund-details-page-wrapper">
                        <div className="w-fund-details-page-content">
                            <div className="w-fund-details-page-title">
                                {this.state.fundName}
                            </div>
                            <div className="w-fund-details-page-navbar">
                                <div className="w-fund-details-page-navbar-item"
                                    onClick={() => this.toPage('overview',
                                    {
                                        fundAddress,
                                        fundName,
                                    })}
                                >
                                    Overview
                                </div>
                                <div className="w-fund-details-page-navbar-item"
                                    onClick={() => this.toPage('trade',
                                    {
                                        fundAddress,
                                        fundName,
                                    })}
                                >
                                    Trade
                                </div>
                                <div className="w-fund-details-page-navbar-item"
                                    style={selectedNavbarItemStyle}
                                >
                                    Provide liquidity
                                </div>
                                <div className="w-fund-details-page-navbar-item"
                                    onClick={() => this.toPage('stake',
                                    {
                                        fundAddress,
                                        fundName,
                                    })}
                                >
                                    Stake
                                </div>
                                <div className="w-fund-details-page-navbar-item"
                                    onClick={() => this.toPage('yield',
                                    {
                                        fundAddress,
                                        fundName,
                                    })}
                                >
                                    Yield
                                </div>
                                <div className="w-fund-details-page-navbar-item"
                                    onClick={() => this.toPage('rewards',
                                    {
                                        fundAddress,
                                        fundName,
                                    })}
                                >
                                    Rewards
                                </div>
                                <div className="w-fund-details-page-navbar-item"
                                    onClick={() => this.toPage('settings',
                                    {
                                        fundAddress,
                                        fundName,
                                    })}
                                >
                                    Settings
                                </div>
                            </div>
                            <FundProvideLiquidity /> 
                        </div>
                    </div>
                    <div style={this.state.settingsPopup === false ? doNotDisplay : {}}>
                        <SettingsPopup {...this.props}
                            closeSettingsPopupEvent={this.closeSettingsPopup} />
                    </div>
                </>

            )
        } else {
            return (

                <>

                </>
            )
        }
    }
}

export default FundDetailsProvideLiquidityPage;