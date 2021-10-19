import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import wethIcon from '../../assets/weth-icon.svg';

// CSS
import '../../styles/fundOverview.css';

class FundOverviewCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AUM: 10,
            depositors: 5,
            lifetimeReturn: 10,
            denominationAsset: 'WETH',
        }
    }

    render() {

        var width = window.innerWidth;

        return (

            <>
                <div className="w-fund-overview-cards-wrapper">
                    <div className="w-fund-overview-cards-content">
                        <div className="w-fund-overview-card">
                            <div className="w-fund-overview-card-value">
                                ${this.state.AUM}M
                            </div>
                            <div className="w-fund-overview-card-type">
                                AUM
                            </div>
                        </div>
                        <div className="w-fund-overview-card">
                            <div className="w-fund-overview-card-value">
                                {this.state.depositors}
                            </div>
                            <div className="w-fund-overview-card-type">
                                Depositors
                            </div>
                        </div>
                        <div className="w-fund-overview-card">
                            <div className="w-fund-overview-card-value">
                                {this.state.lifetimeReturn}%
                            </div>
                            <div className="w-fund-overview-card-type">
                                Lifetime return
                            </div>
                        </div>
                        <div className="w-fund-overview-card">
                            <div className="w-fund-overview-card-value-section">
                                <img src={wethIcon} alt='weth-icon' className="fund-overview-weth-icon" />
                                <div className="w-fund-overview-card-value">
                                    {this.state.denominationAsset}
                                </div>
                            </div>
                            <div className="w-fund-overview-card-type">
                                Denomination asset
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default FundOverviewCards;
