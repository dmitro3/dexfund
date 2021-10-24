import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import curveIcon from '../assets/curve-icon.png';
import depositIcon from '../assets/deposit-icon.svg';
import withdrawIcon from '../assets/withdraw-icon.svg';

// CSS
import '../styles/fundStake.css';

class StakeTableRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            asset: this.props.assetFromParent,
            fullAsset: this.props.fullAssetFromParent,
            exchange: this.props.exchangeFromParent,
            balance: this.props.balanceFromParent,
            balanceAsset: this.props.balanceAssetFromParent,
            value: this.props.valueFromParent
        }
    }


    displayStakePopup = () => {
        this.props.displayStakePopupEvent();
    }

    displayUnstakePopup = () => {
        this.props.displayUnstakePopupEvent();
    }

    render() {

        const doNotDisplay = {
            display: 'none',
        }


        return (

            <>
                <div className="w-stake-table-row">
                    <div className="w-stake-table-row-cell">
                        <div className="w-stake-table-asset-cell">
                            <img
                                src={curveIcon}
                                alt='curve-icon'
                                className="w-stake-table-curve-icon"
                            />
                            <div className="w-stake-table-asset-text-section">
                                <div className="w-stake-table-asset">
                                    {this.state.fullAsset}
                                </div>
                                <div className="w-stake-table-exchange">
                                    {this.state.exchange}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-stake-table-row-cell">
                        {this.state.balance} <a style={this.state.balance === '-' ? doNotDisplay : {}}>{this.state.asset}</a>
                    </div>
                    <div className="w-stake-table-row-cell">
                        {this.state.value}
                    </div>
                    <div className="w-stake-table-row-cell">
                        <div className="w-stake-table-stake-cell">
                            <div className="w-stake-table-stake-button"
                                onClick={() => this.displayStakePopup()}
                                >
                                    <img 
                                        src={depositIcon}
                                        alt='deposit-icon'
                                        className=""
                                    />
                                    <div className="w-stake-table-stake-button-text">
                                        STAKE
                                    </div>
                                </div>
                            <div className="w-stake-table-unstake-button"
                                style={this.state.balance === '-' ? doNotDisplay : {}}
                                onClick={() => this.displayUnstakePopup()}
                            >
                                <img 
                                    src={withdrawIcon}
                                    alt='withdraw-icon'
                                    className=""
                                />
                                <div className="w-stake-table-unstake-button-text">
                                    UNSTAKE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default StakeTableRow;