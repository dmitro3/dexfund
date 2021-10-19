import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import addIcon from '../assets/add-icon.svg';
import minusIcon from '../assets/minus-icon.svg';
import wethIcon from '../assets/weth-icon.svg';

// CSS
import '../styles/yourTransactions.css';

class YourTransactionsTableRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchedValue: this.props.searchedValueFromParent,

            action: this.props.actionFromParent,
            token: this.props.tokenFromParent,
            value: this.props.valueFromParent,
            vault: this.props.vaultFromParent,
            type: this.props.typeFromParent,
            time: this.props.timeFromParent,
        }
    }

    render() {

        return (

            <>
                <div className="w-your-transactions-table-row">
                    <div className="w-your-transactions-table-cell action">
                        <div className="w-your-transactions-action-section">
                            <img src={this.state.action === 'Invest' ? addIcon : minusIcon} />
                            <div className="w-your-transactions-action-text">
                                {this.state.action}
                            </div>
                        </div>
                    </div>
                    <div className="w-your-transactions-table-cell token">
                        <div className="w-investment-funds-token-bullet">
                            <img src={wethIcon} alt='weth-icon' className="your-transactions-weth-icon" />
                            <div className="w-investment-funds-token-bullet-text">
                                {this.state.token}WETH
                            </div>
                        </div>
                    </div>
                    <div className="w-your-transactions-table-cell value">
                        ${this.state.value}
                    </div>
                    <div className="w-your-transactions-table-cell vault">
                        {this.state.vault}
                    </div>
                    <div className="w-your-transactions-table-cell type">
                        {this.state.type}
                    </div>
                    <div className="w-your-transactions-table-cell time">
                        {this.state.time}
                    </div>
                </div>
            </>
        )
    }
}

export default YourTransactionsTableRow;