import { TimerSharp } from '@material-ui/icons';
import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../../../styles/fundOverview.css';

class PerformanceTableHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        let width = window.innerWidth;

        if (width > 1360) {

            return (

                <>
                    <div className="w-fund-performance-table-header">
                        <div className="w-fund-performance-table-header-item year">
                            Year
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            January
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            February
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            March
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            April
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            May
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            June
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            July
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            August
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            September
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            October
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            November
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            December
                        </div>
                    </div>
                </>
            )
        } else {

            return (

                <>
                    <div className="w-fund-performance-table-header">
                        <div className="w-fund-performance-table-header-item year">
                            Year
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            01
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            02
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            03
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            04
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            05
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            06
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            07
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            08
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            09
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            10
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            11
                        </div>
                        <div className="w-fund-performance-table-header-item month">
                            12
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default PerformanceTableHeader;
