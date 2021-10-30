// import { TimerSharp } from '@material-ui/icons';
import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import wethIcon from '../assets/weth-icon.svg';

// CSS
import '../styles/yourInvestments.css';

class YourInvestmentsTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            asset: this.props.assetFromParent,
            price: this.props.priceFromParent,
            value: this.props.valueFromParent,
            performance: this.props.performanceFromParent,
            ...this.props.state,
            ...this.props.props
        }
    }

    render() {

        return (

            <>
                <div className="w-fund-your-investments-table-row">
                    <div className="w-fund-your-investments-table-row-cell asset">
                        <div className="w-fund-your-investments-asset-bullet">
                            {/* <img src={wethIcon} alt='weth-icon' className="fund-your-investments-weth-icon" /> */}
                            <div className="w-fund-your-investments-asset-bullet-text">
                                {this.state.asset}
                            </div>
                        </div>
                    </div>
                    <div className="w-fund-your-investments-table-row-cell price">
                        {this.state.price} WETH
                    </div>
                    <div className="w-fund-your-investments-table-row-cell value">
                        {this.state.value} WETH
                    </div>
                    <div className="w-fund-your-investments-table-row-cell performance">
                        {this.state.performance}%
                    </div>
                </div>
            </>
        )
    }
}

export default YourInvestmentsTableRow;
