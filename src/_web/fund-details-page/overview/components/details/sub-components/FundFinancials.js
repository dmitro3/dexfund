import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ... 

// CSS
import '../styles/fundDetails.css';

class FundFinancials extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shareSupply: '2,000,000.000 WETH',
            sharePrice: '$2000',
        }
    }

    render() {

        return (

            <>
                <div className="w-fund-info-table">
                    <div className="w-fund-info-table-row">
                        <div className="w-fund-info-row-cell type">
                            Share supply
                        </div>
                        <div className="w-fund-info-row-cell value">
                            {this.state.shareSupply}
                        </div>
                    </div>
                    <div className="w-fund-info-table-row">
                        <div className="w-fund-info-row-cell type">
                            Share price
                        </div>
                        <div className="w-fund-info-row-cell value">
                            {this.state.sharePrice}
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default FundFinancials;
