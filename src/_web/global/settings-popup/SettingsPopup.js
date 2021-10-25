import React, { Component } from 'react';

// COMPONENTS
// ... 

// ASSETS
import closeIcon from './assets/close-icon.svg';

// CSS
import './styles/settingsPopup.css';

class SettingsPopup extends Component {

    constructor() {
        super();
        this.state = {
            settingsPopup: true,
            selectedSlippage: '1',
            selectedSpeed: 'Normal',
        }
    }

    closeSettingsPopup = () => {
        this.setState({ settingsPopup: false });
        this.props.closeSettingsPopupEvent();
    }

    render() {

        const selectedSlippageButton = {
            border: '1px solid #F337A8',
        }

        const selectedSlippageText = {
            color: '#FFF',
        }

        const selectedSpeedButton = {
            border: '1px solid #F337A8',
        }

        const selectedSpeedText = {
            background: 'linear-gradient(to right, #E926C3 10%, #FF4D86 100%)',
            '-webkit-background-clip': 'text',
            'WebkitTextFillColor': 'transparent'
        }

        return (

            <>
                <div className="w-settings-popup-wrapper">
                    <div className="w-settings-popup-box">
                        <div className="w-settings-popup-header">
                            <div className="w-settings-popup-title">
                                GLOBAL SETTINGS
                            </div>
                            <img src={closeIcon} alt='close-icon' className="close-icon"
                                onClick={() => this.closeSettingsPopup()} />
                        </div>
                        <div className="w-settings-category">
                            <div className="w-settings-category-type">
                                Currency
                            </div>
                            <div className="w-settings-category-value">
                                USD ($)
                            </div>
                        </div>
                        <div className="w-settings-category">
                            <div className="w-settings-category-type">
                                Vault metrics
                            </div>
                            <div className="w-settings-category-value">
                                Denomination Asset
                            </div>
                        </div>
                        <div className="w-settings-category">
                            <div className="w-settings-category-type">
                                Slippage Tolerance
                            </div>
                            <div className="w-settings-category-value-buttons-section">
                                <div className="w-settings-category-value-button first"
                                    style={this.state.selectedSlippage === '0.5' ? selectedSlippageButton : {}}
                                    onClick={() => this.setState({ selectedSlippage: '0.5' })}>
                                    <div className="w-settings-category-value-button-text"
                                        style={this.state.selectedSlippage === '0.5' ? selectedSlippageText : {}}>
                                        0.5%
                                    </div>
                                </div>
                                <div className="w-settings-category-value-button"
                                    style={this.state.selectedSlippage === '1' ? selectedSlippageButton : {}}
                                    onClick={() => this.setState({ selectedSlippage: '1' })}>
                                    <div className="w-settings-category-value-button-text"
                                        style={this.state.selectedSlippage === '1' ? selectedSlippageText : {}}>
                                        1%
                                    </div>
                                </div>
                                <div className="w-settings-category-value-button"
                                    style={this.state.selectedSlippage === '2' ? selectedSlippageButton : {}}
                                    onClick={() => this.setState({ selectedSlippage: '2' })}>
                                    <div className="w-settings-category-value-button-text"
                                        style={this.state.selectedSlippage === '2' ? selectedSlippageText : {}}>
                                        2%
                                    </div>
                                </div>
                                <div className="w-settings-category-value-button last"
                                    style={this.state.selectedSlippage === 'Custom' ? selectedSlippageButton : {}}
                                    onClick={() => this.setState({ selectedSlippage: 'Custom' })}>
                                    <div className="w-settings-category-value-button-text"
                                        style={this.state.selectedSlippage === 'custom' ? selectedSlippageText : {}}>
                                        Custom%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TRANSACTION SPEED SECTION */}
                        <div className="w-settings-category-type trans-speed">
                            Transaction speed
                        </div>
                        <div className="w-settings-category-speed-button"
                            style={this.state.selectedSpeed === 'Slow' ? selectedSpeedButton : {}}
                            onClick={() => this.setState({ selectedSpeed: 'Slow' })}>
                            <div className="w-settings-category-speed-type"
                                style={this.state.selectedSpeed === 'Slow' ? selectedSpeedText : {}}>
                                SLOW
                            </div>
                            <div className="w-settings-category-speed-value">
                                0.003232 ETH
                                <div className="w-settings-category-speed-usd-value">
                                    $9.45
                                </div>
                            </div>
                        </div>
                        <div className="w-settings-category-speed-button"
                            style={this.state.selectedSpeed === 'Normal' ? selectedSpeedButton : {}}
                            onClick={() => this.setState({ selectedSpeed: 'Normal' })}>
                            <div className="w-settings-category-speed-type"
                                style={this.state.selectedSpeed === 'Normal' ? selectedSpeedText : {}}>
                                NORMAL
                            </div>
                            <div className="w-settings-category-speed-value">
                                0.003232 ETH
                                <div className="w-settings-category-speed-usd-value">
                                    $9.45
                                </div>
                            </div>
                        </div>
                        <div className="w-settings-category-speed-button"
                            style={this.state.selectedSpeed === 'Fast' ? selectedSpeedButton : {}}
                            onClick={() => this.setState({ selectedSpeed: 'Fast' })}>
                            <div className="w-settings-category-speed-type"
                                style={this.state.selectedSpeed === 'Fast' ? selectedSpeedText : {}}>
                                FAST
                            </div>
                            <div className="w-settings-category-speed-value">
                                0.003232 ETH
                                <div className="w-settings-category-speed-usd-value">
                                    $9.45
                                </div>
                            </div>
                        </div>

                        {/* SAVE BUTTON */}
                        <div className="w-settings-save-button"
                            onClick={() => this.closeSettingsPopup()} >
                            <div className="w-settings-save-button-text">
                                SAVE
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SettingsPopup;
