import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import wethIcon from '../../assets/weth-icon.svg';

// CSS
import '../../styles/topInvestmentFunds.css';

class MostProfitableRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fundNo: this.props.fundNoFromParent,
            fundName: this.props.fundNameFromParent,
            fundAsset: this.props.fundAssetFromParent,
            fundPerformance: this.props.fundPerformanceFromParent,
        }
    }

    render() {

        return (

            <>
                <div className="w-profitable-funds-card-row">
                    <div className="w-profitable-funds-card-details-section">
                        <div className="w-profitable-funds-card-details">
                            {this.state.fundNo}. {this.state.fundName}
                        </div>
                        <div className="w-profitable-funds-card-asset-bullet">
                            <img src={wethIcon} alt='weth-icon' className="profitable-funds-card-weth-icon" />
                            <div className="w-profitable-funds-card-asset-bullet-text">
                                {this.state.fundAsset}
                            </div>
                        </div>
                    </div>
                    <div className="w-profitable-funds-card-performance"
                        style={{ color: '#00AF00' }}>
                        {this.state.fundPerformance}
                    </div>
                </div>
            </>
        )
    }
}

export default MostProfitableRow;