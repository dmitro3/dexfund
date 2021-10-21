import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import addIcon from '../assets/add-icon.svg';
import minusIcon from '../assets/minus-icon.svg';
import wethIcon from '../assets/weth-icon.svg';

// CSS
import '../../your-transactions/styles/yourTransactions.css';

class YourTransactionsTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            action: this.props.actionFromParent,
            token: this.props.tokenFromParent,
            value: this.props.valueFromParent,
            time: this.props.timeFromParent,
        }
    }

    render() {

        return (

            <>
                <div className="w-funds-your-transactions-table-row">
                    <div className="w-funds-your-transactions-table-cell action">
                        <div className="w-funds-your-transactions-action-cell">
                            <img alt="" src={this.state.action === 'Invest' ? addIcon : minusIcon} />
                            <div className="w-your-transactions-action-text">
                                {this.state.action}
                            </div>
                        </div>
                    </div>
                    <div className="w-funds-your-transactions-table-cell token">
                        <div className="w-fund-your-transactions-asset-bullet">
                            <img src={wethIcon} alt='weth-icon' className="fund-your-transactions-weth-icon" />
                            <div className="w-fund-your-transactions-asset-bullet-text">
                                {this.state.token} WETH
                            </div>
                        </div>
                    </div>
                    <div className="w-funds-your-transactions-table-cell value">
                        ${this.state.value}
                    </div>
                    <div className="w-funds-your-transactions-table-cell time">
                        {this.state.time}
                    </div>
                </div>
            </>
        )
    }
}

export default YourTransactionsTableRow;