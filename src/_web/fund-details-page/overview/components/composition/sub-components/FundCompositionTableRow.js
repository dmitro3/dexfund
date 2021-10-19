import { TimerSharp } from '@material-ui/icons';
import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import wethIcon from '../assets/weth-icon.svg';

// CSS
import '../../../styles/fundOverview.css';

class PerformanceTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            asset: this.props.assetFromParent,
            value: this.props.valueFromParent,
            weight: this.props.weightFromParent,
        }
    }

    render() {

        return (

            <>
                <div className="w-fund-composition-table-row">
                    <div className="w-fund-composition-table-row-cell asset">
                        <div className="w-fund-composition-asset-bullet">
                            <img src={wethIcon} alt='weth-icon' className="fund-composition-weth-icon" />
                            <div className="w-fund-composition-asset-bullet-text">
                                {this.state.asset} WETH
                            </div>
                        </div>
                    </div>
                    <div className="w-fund-composition-table-row-cell value">
                        ${this.state.value}
                    </div>
                    <div className="w-fund-composition-table-row-cell weight">
                        {this.state.weight}%
                    </div>
                </div>
            </>
        )
    }
}

export default PerformanceTableRow;
