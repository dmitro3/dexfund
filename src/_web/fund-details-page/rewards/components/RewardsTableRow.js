import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import wethIcon from '../assets/weth-icon.svg';

// CSS
import '../styles/fundRewards.css';

class RewardsTableRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            protocol: this.props.protocolFromParent,
            amount: this.props.amountFromParent,
            asset: this.props.assetFromParent,
            value: this.props.valueFromParent,
            claimed: this.props.claimedFromParent,
        }
    }

    renderClaim() {

        return (

            <>
                <div className="w-rewards-claim-button">
                    CLAIM
                </div>
            </>
        )
    }

    renderClaimedAlready() {

        return (

            <>
                <div className="w-rewards-claimed">
                    Claimed {this.state.claimed}
                </div>
            </>
        )
    }

    render() {

        return (

            <>
                <div className="w-rewards-table-row">
                    <div className="w-rewards-table-row-cell">
                        <div className="w-rewards-table-protocol-cell">
                            {this.state.protocol}
                        </div>
                    </div>
                    <div className="w-rewards-table-row-cell">
                        {this.state.amount} {this.state.asset}
                    </div>
                    <div className="w-rewards-table-row-cell">
                        ${this.state.value}
                    </div>
                    <div className="w-rewards-table-row-cell">
                        {this.state.claimed === false && this.renderClaim()}
                        {this.state.claimed !== false && this.renderClaimedAlready()}
                    </div>
                </div>
            </>
        )
    }
}

export default RewardsTableRow;