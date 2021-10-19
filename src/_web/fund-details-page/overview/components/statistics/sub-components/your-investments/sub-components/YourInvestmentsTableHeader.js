import { TimerSharp } from '@material-ui/icons';
import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/yourInvestments.css';

class YourInvestmentsTableHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (

            <>
                <div className="w-fund-your-investments-table-header">
                    <div className="w-fund-your-investments-table-header-item asset">
                        Asset
                    </div>
                    <div className="w-fund-your-investments-table-header-item price">
                        Price
                    </div>
                    <div className="w-fund-your-investments-table-header-item value">
                        Value($)
                    </div>
                    <div className="w-fund-your-investments-table-header-item performance">
                        Performance
                    </div>
                </div>
            </>
        )
    }
}

export default YourInvestmentsTableHeader;
