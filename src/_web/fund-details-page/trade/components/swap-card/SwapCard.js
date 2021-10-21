import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import middleImg from '../../assets/middle-img.svg';
import ethIcon from '../../assets/eth-icon.svg';
import usdcIcon from '../../assets/usdc-icon.svg';
import caretDownIcon from '../../assets/caret-down-icon.svg';

// CSS
import '../../styles/fundTrade.css';

class SwapCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amountToSwap: '',
            amountToReceive: '',
            maxAmountToSwap: '10.23',
        }
    }

    inputField = (e) => {

        if (e.target.value === '') {
            this.setState({ amountToSwap: '0.00' });
            return;
        }

        const re = /^[0-9.\b]+$/;
        if (!re.test(e.target.value)) {
            return;
        }

        var value = e.target.value;
        this.setState({ amountToSwap: value });
    }

    render() {

        return (

            <>
                <div className="w-swap-card-wrapper">
                    <div className="w-swap-card">
                        <div className="w-swap-card-inputs-section">
                            <div className="w-swap-card-half-section">
                                <div className="w-swap-card-half-section-header">
                                    FROM
                                </div>
                                <div className="w-swap-card-half-section-text">
                                    Asset
                                </div>
                                <div className="w-swap-card-half-section-asset-input">
                                    <div className="w-swap-card-half-section-asset-section">
                                        <img src={ethIcon} alt='eth-icon' className="swap-asset-icon" />
                                        <div className="w-swap-card-half-section-asset-text">
                                            ETH
                                        </div>
                                    </div>
                                    <img src={caretDownIcon} alt='caret-down-icon' className="swap-caret-down-icon" />
                                </div>
                                <div className="w-swap-card-half-section-text">
                                    Amount
                                </div>
                                <div className="w-swap-card-half-section-amount-input">
                                    <input type="text" id="amount" name="amount"
                                        value={this.state.amountToSwap} onChange={(e) => this.inputField(e)}
                                        style={{
                                            color: '#fff',
                                            backgroundColor: '#070708',
                                            fontFamily: 'Bai Jamjuree, sans-serif',
                                            borderWidth: '0',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            outline: 'none',
                                            textAlign: 'left',
                                            width: '100%',
                                        }}>
                                    </input>
                                    <div className="w-swap-card-max-amount-bullet"
                                        onClick={() => { this.setState({ amountToSwap: this.state.maxAmountToSwap }) }}>
                                        <div className="w-swap-card-max-amount-bullet-text">
                                            Max: {this.state.maxAmountToSwap}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-swap-card-half-section-text value">
                                    $0.00
                                </div>
                            </div>
                            <img src={middleImg} alt='middle-img' className="swap-middle-img" />
                            <div className="w-swap-card-half-section">
                                <div className="w-swap-card-half-section-header">
                                    FROM
                                </div>
                                <div className="w-swap-card-half-section-text">
                                    Asset
                                </div>
                                <div className="w-swap-card-half-section-asset-input">
                                    <div className="w-swap-card-half-section-asset-section">
                                        <img src={usdcIcon} alt='eth-icon' className="swap-asset-icon" />
                                        <div className="w-swap-card-half-section-asset-text">
                                            USDC
                                        </div>
                                    </div>
                                    <img src={caretDownIcon} alt='caret-down-icon' className="swap-caret-down-icon" />
                                </div>
                                <div className="w-swap-card-half-section-text">
                                    Amount
                                </div>
                                <div className="w-swap-card-half-section-amount-input">
                                    <div className="w-swap-card-half-section-amount-input-text">
                                        0.00
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="w-swap-card-button-section">
                            <div className="w-swap-card-button">
                                <div className="w-swap-card-button-text">
                                    SWAP
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SwapCard;