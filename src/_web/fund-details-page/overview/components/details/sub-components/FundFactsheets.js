import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ... 

// CSS
import '../styles/fundDetails.css';

class FundFactsheets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Radar Swap',
            creationDate: 'August 20, 2021',
            manager: '0xf5be8b4c82b8a681bacf357cfb712ab9e9296cb2',
            denominationAsset: 'WETH',
        }
    }

    render() {

        return (

            <>
                <div className="w-fund-info-table">
                    <div className="w-fund-info-table-row">
                        <div className="w-fund-info-row-cell type">
                            Name
                        </div>
                        <div className="w-fund-info-row-cell value">
                            {this.state.name}
                        </div>
                    </div>
                    <div className="w-fund-info-table-row">
                        <div className="w-fund-info-row-cell type">
                            Creation date
                        </div>
                        <div className="w-fund-info-row-cell value">
                            {this.state.creationDate}
                        </div>
                    </div>
                    <div className="w-fund-info-table-row">
                        <div className="w-fund-info-row-cell type">
                            Manager
                        </div>
                        <div className="w-fund-info-row-cell value"
                        style={{fontSize:'13px'}}>
                            {this.state.manager}
                        </div>
                    </div>
                    <div className="w-fund-info-table-row">
                        <div className="w-fund-info-row-cell type">
                            Denomination asset
                        </div>
                        <div className="w-fund-info-row-cell value">
                            {this.state.denominationAsset}
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default FundFactsheets;
