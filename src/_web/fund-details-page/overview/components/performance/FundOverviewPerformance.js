// import { TimerSharp } from '@material-ui/icons';
import React, { Component } from 'react';

// COMPONENTS
import PerformanceTableHeader from './sub-components/PerformanceTableHeader';
import PerformanceTableRow from './sub-components/PerformanceTableRow';

// ASSETS
// ...

// CSS
import '../../styles/fundOverview.css';

class FundOverviewPerformance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        return (

            <>
                <div className="w-fund-overview-performance-wrapper">
                    <div className="w-fund-overview-performance-content">
                        <div className="w-fund-overview-performance-title">
                            PERFORMANCE
                        </div>
                        <div className="w-fund-overview-performance-table">
                            <PerformanceTableHeader />
                            <PerformanceTableRow />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FundOverviewPerformance;
