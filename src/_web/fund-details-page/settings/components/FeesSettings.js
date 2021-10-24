import React, { Component } from 'react';

// COMPONENTS
// ... 

// ASSETS
// ... 

// CSS
import '../styles/fundSettings.css';

class FeesSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

            return (

                <>
                    <div className="w-fund-settings-header">
                        CLAIM FEES
                    </div>
                    <div className="w-fund-settings-card">
                        <div className="w-fund-settings-table-header">
                            <div className="w-fund-settings-table-header-item fee">
                                Fee
                            </div>
                            <div className="w-fund-settings-table-header-item value">
                                Value
                            </div>
                            <div className="w-fund-settings-table-header-item add-info">
                                Additional
                            </div>
                            <div className="w-fund-settings-table-header-item action">
                                Action
                            </div>
                        </div>
                        <div className="w-fund-settings-table-row">
                            <div className="w-fund-settings-table-row-cell fee">
                                Management fee
                            </div>
                            <div className="w-fund-settings-table-row-cell value">
                                1%
                            </div>
                            <div className="w-fund-settings-table-row-cell add-info">
                                -
                            </div>
                            <div className="w-fund-settings-table-row-cell action">
                                <div className="w-fund-settings-claim-button on">
                                    CLAIM
                                </div>
                            </div>
                        </div>
                        <div className="w-fund-settings-table-row">
                            <div className="w-fund-settings-table-row-cell fee">
                                Performance fee
                            </div>
                            <div className="w-fund-settings-table-row-cell value">
                                1%
                            </div>
                            <div className="w-fund-settings-table-row-cell add-info">
                                Can be claimed after: May 16, 2021 22:48:20 GMT
                            </div>
                            <div className="w-fund-settings-table-row-cell action">
                                <div className="w-fund-settings-claim-button off">
                                    CLAIM
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )
    }
}

export default FeesSettings;
