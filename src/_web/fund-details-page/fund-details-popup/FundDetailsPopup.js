import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import closeIcon from './assets/close-icon.svg';
import caretDownIcon from './assets/caret-down-icon.svg';
import caretUpIcon from './assets/caret-up-icon.svg';
import networkFeeIcon from './assets/network-fee-icon.svg';

// CSS
import './styles/fundDetailsPopup.css';

class FundProvideLiquidity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token1: this.props.token1FromParent,
            token2: this.props.token2FromParent,
            token3: this.props.token3FromParent,

            title: this.props.titleFromParent,
            subtitle: this.props.subtitleFromParent,

            selectedToken: this.props.token1FromParent,
            tokenList: false,

            amount: '0.0',
        }
    }

    callbackFunction = (childData) => {
        this.setState({ searchedValue: childData })
    }

    closePopup = () => {
        this.props.closePopupEvent();
    }

    setAmount = (e) => {

        const re = /^[0-9.\b]+$/;
        if (!re.test(e.target.value)) {
            return;
        }

        var value = e.target.value;
        this.setState({ amount: value });
    }

    selectToken = (token) => {
        this.setState({
            selectedToken: token, 
            tokenList: false
        })
    }

    displayTokenList() {
        if (this.state.title === 'STAKE' || this.state.title === 'UNSTAKE' || this.state.token2 === '') {
            return
        } else {
            this.setState({
                tokenList: true
            })
        }
    }

    renderTokenListOff() {

        const doNotDisplay = {
            display: 'none'
        }

        return (

            <>
                <div className="w-fund-details-popup-input-section">
                    <div className="w-fund-details-popup-asset-input"
                        onClick={() => this.displayTokenList()}
                    >
                        <div className="w-fund-details-popup-asset-input-text">
                            {this.state.selectedToken}
                        </div>
                        <img
                            style={this.state.title === 'STAKE' 
                            || this.state.title === 'UNSTAKE' 
                            || this.state.token2 === ''
                            ? doNotDisplay : {}}
                            src={caretDownIcon}
                            alt='caret-down-icon'
                            className="w-fund-details-popup-asset-caret-icon"
                        />
                    </div>
                    <div className="w-fund-details-popup-amount-input">
                        <input type="text" id="amount" name="amount" placeholder=""
                            value={this.state.amount} onChange={(e) => this.setAmount(e)}
                            style={{
                                color: '#fff',
                                backgroundColor: '#020202',
                                fontFamily: 'Bai Jamjuree, sans-serif',
                                borderWidth: '0',
                                fontSize: '15px',
                                fontWeight: '400',
                                outline: 'none',
                                textAlign: 'left',
                                width: '100%',
                            }}>
                        </input>        
                    </div>
                </div>
                <div className="w-fund-details-popup-footer">
                    <div className="w-fund-details-popup-network-fee-section">
                        <img 
                            src={networkFeeIcon}
                            alt='network-fee-icon'
                            className="w-fund-details-popup-network-fee-icon"
                        />
                        <div className="w-fund-details-popup-network-fee-text">
                            <div className="w-fund-details-popup-network-fee-header">
                                Network Fees
                            </div>
                            <div className="w-fund-details-popup-network-fee-eth">
                                0.003232 ETH
                            </div>
                            <div className="w-fund-details-popup-network-fee-usd">
                                $9.45
                            </div>
                        </div>
                    </div>
                    <div className="w-fund-details-popup-deposit-button">
                        <div className="w-fund-details-popup-deposit-button-text">
                            {this.state.title}
                        </div>
                    </div>
                </div>
            </>
        )
    }


    renderTokenListOn() {

        const doNotDisplay = {
            display: 'none'
        }

        const token1 = this.state.token1;
        const token2 = this.state.token2;
        const token3 = this.state.token3;

        return (

            <>
                <div className="w-fund-details-popup-input-section">
                    <div className="w-fund-details-popup-asset-input clicked"
                        onClick={() => this.setState({tokenList: false})}
                    >
                        <div className="w-fund-details-popup-asset-input-text">
                            {this.state.selectedToken}
                        </div>
                        <img
                            src={caretUpIcon}
                            alt='caret-up-icon'
                            className="w-fund-details-popup-asset-caret-icon"
                        />
                    </div>
                    <div className="w-fund-details-popup-amount-input">
                        <input type="text" id="amount" name="amount" placeholder=""
                            value={this.state.amount} onChange={(e) => this.setAmount(e)}
                            style={{
                                color: '#fff',
                                backgroundColor: '#020202',
                                fontFamily: 'Bai Jamjuree, sans-serif',
                                borderWidth: '0',
                                fontSize: '15px',
                                fontWeight: '400',
                                outline: 'none',
                                textAlign: 'left',
                                width: '100%',
                            }}>
                        </input>        
                    </div>
                </div>
                <div className="w-fund-details-popup-asset-list">
                    <div className="w-fund-details-popup-asset-row"
                        onClick={() => this.selectToken(token1)}
                    >
                        {token1}
                    </div>
                    <div className="w-fund-details-popup-asset-row"
                        style={this.state.token2 === '' ? doNotDisplay : {}}
                        onClick={() => this.selectToken(token2)}
                    >
                        {token2}
                    </div>
                    <div className="w-fund-details-popup-asset-row"
                        style={this.state.token3 === '' ? doNotDisplay : {}}
                        onClick={() => this.selectToken(token3)}
                    >
                        {token3}
                    </div>
                </div>
            </>
        )
    }


    render() {

        var width = window.innerWidth;

        if (width > 1000) {
            return (

                <>
                    <div className="w-fund-details-popup-wrapper">
                        <div className="w-fund-details-popup-box">
                            <div className="w-fund-details-popup-header">
                                <div className="w-fund-details-popup-title">
                                    {this.state.title}
                                </div>
                                <div onClick={() => this.closePopup()}>
                                    <img
                                        src={closeIcon}
                                        alt='close-icon'
                                        className="w-fund-details-popup-close-icon"
                                    />
                                </div>
                            </div>
                            <div className="w-fund-details-popup-subtitle">
                                {this.state.subtitle}
                            </div>
                            {this.state.tokenList === false && this.renderTokenListOff()}
                            {this.state.tokenList === true && this.renderTokenListOn()}
                        </div>
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

export default FundProvideLiquidity;
