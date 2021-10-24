import React, { Component } from 'react';

// COMPONENTS
import StakeTableHeader from './components/StakeTableHeader';
import StakeTableRow from './components/StakeTableRow';
import FundDetailsPopup from '../fund-details-popup/FundDetailsPopup';

// ASSETS
// ... 

// CSS
import './styles/fundStake.css';

class FundStake extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullAsset: 'ETH/sETH Gauge Deposit',
            asset: 'ETH',
            exchange: 'Curve.fi',
            balance: '2.00',
            value: '$5,200.00',

            stakePopup: false,
            unstakePopup: false,
        }
    }

    displayStakePopup = () => {
        this.setState({stakePopup: true})
    }

    closeStakePopup = () => {
        this.setState({stakePopup: false})
    }

    displayUnstakePopup = () => {
        this.setState({unstakePopup: true})
    }

    closeUnstakePopup = () => {
        this.setState({unstakePopup: false})
    }

    renderStakePopup() {

        return (

            <>
                <FundDetailsPopup {...this.props}
                    closePopupEvent={this.closeStakePopup}
                    titleFromParent='STAKE'
                    subtitleFromParent='Amount to STAKE'
                    token1FromParent={this.state.asset}
                />
            </>
        )
    }

    renderUnstakePopup() {

        return (

            <>
                <FundDetailsPopup {...this.props}
                    closePopupEvent={this.closeUnstakePopup}
                    titleFromParent='UNSTAKE'
                    subtitleFromParent='Amount to UNSTAKE'
                    token1FromParent={this.state.asset}
                />
            </>
        )
    }

    render() {

        var width = window.innerWidth;

        if (width > 1000) {
            return (

                <>
                    <div className="w-fund-stake-wrapper">
                        <div className="w-fund-stake-header">
                            STAKE
                        </div>
                        <StakeTableHeader />
                        <StakeTableRow
                            displayStakePopupEvent={this.displayStakePopup}
                            displayUnstakePopupEvent={this.displayUnstakePopup}
                            
                            fullAssetFromParent={this.state.fullAsset}
                            assetFromParent={this.state.asset}
                            exchangeFromParent={this.state.exchange}
                            balanceFromParent={this.state.balance}
                            balanceAssetFromParent={this.state.balanceAsset}
                            valueFromParent={this.state.value}
                        />
                        <StakeTableRow
                            fullAssetFromParent={this.state.fullAsset}
                            assetFromParent={this.state.asset}
                            exchangeFromParent={this.state.exchange}
                            balanceFromParent='-'
                            valueFromParent='-'
                        />
                        <StakeTableRow
                            fullAssetFromParent={this.state.fullAsset}
                            assetFromParent={this.state.asset}
                            exchangeFromParent={this.state.exchange}
                            balanceFromParent='-'
                            valueFromParent='-'
                        />
                        <StakeTableRow
                            fullAssetFromParent={this.state.fullAsset}
                            assetFromParent={this.state.asset}
                            exchangeFromParent={this.state.exchange}
                            balanceFromParent={this.state.balance}
                            valueFromParent={this.state.value}
                        />
                        <StakeTableRow
                            fullAssetFromParent={this.state.fullAsset}
                            assetFromParent={this.state.asset}
                            exchangeFromParent={this.state.exchange}
                            balanceFromParent='-'
                            valueFromParent='-'
                        />
                        <StakeTableRow
                            fullAssetFromParent={this.state.fullAsset}
                            assetFromParent={this.state.asset}
                            exchangeFromParent={this.state.exchange}
                            balanceFromParent={this.state.balance}
                            valueFromParent={this.state.value}
                        />
                        <StakeTableRow
                            fullAssetFromParent={this.state.fullAsset}
                            assetFromParent={this.state.asset}
                            exchangeFromParent={this.state.exchange}
                            balanceFromParent={this.state.balance}
                            valueFromParent={this.state.value}
                        />
                    </div>
                    {this.state.stakePopup === true && this.renderStakePopup()}
                    {this.state.unstakePopup === true && this.renderUnstakePopup()}
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

export default FundStake;
