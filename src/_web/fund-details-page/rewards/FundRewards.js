import React, { Component } from 'react';

// COMPONENTS
import RewardsTableHeader from './components/RewardsTableHeader';
import RewardsTableRow from './components/RewardsTableRow';

// ASSETS
// ... 

// CSS
import './styles/fundRewards.css';

class FundRewards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            protocol: 'Compound',
            amount: '2,000.00',
            asset: 'WETH',
            value: '2,000',
            claimed: false,
        }
    }

    render() {

        var width = window.innerWidth;

        if (width > 1000) {
            return (

                <>
                    <div className="w-fund-rewards-wrapper">
                        <div className="w-fund-rewards-header">
                            REWARDS
                        </div>
                        <RewardsTableHeader />
                        <RewardsTableRow
                            protocolFromParent={this.state.protocol}
                            amountFromParent={this.state.amount}
                            assetFromParent={this.state.asset}
                            valueFromParent={this.state.value}
                            claimedFromParent={this.state.claimed}
                        />
                        <RewardsTableRow
                            protocolFromParent={this.state.protocol}
                            amountFromParent={this.state.amount}
                            assetFromParent={this.state.asset}
                            valueFromParent={this.state.value}
                            claimedFromParent={this.state.claimed}
                        />
                        <RewardsTableRow
                            protocolFromParent={this.state.protocol}
                            amountFromParent={this.state.amount}
                            assetFromParent={this.state.asset}
                            valueFromParent={this.state.value}
                            claimedFromParent={this.state.claimed}
                        />
                        <RewardsTableRow
                            protocolFromParent={this.state.protocol}
                            amountFromParent={this.state.amount}
                            assetFromParent={this.state.asset}
                            valueFromParent={this.state.value}
                            claimedFromParent='2 days ago'
                        />
                        <RewardsTableRow
                            protocolFromParent={this.state.protocol}
                            amountFromParent={this.state.amount}
                            assetFromParent={this.state.asset}
                            valueFromParent={this.state.value}
                            claimedFromParent='1 week ago'
                        />
                        <RewardsTableRow
                            protocolFromParent={this.state.protocol}
                            amountFromParent={this.state.amount}
                            assetFromParent={this.state.asset}
                            valueFromParent={this.state.value}
                            claimedFromParent='3 week ago'
                        />
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

export default FundRewards;
