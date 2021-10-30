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
                <div className="w-your-investments-table-header">
                    <div className="w-your-investments-table-header-item name">
                        Vault Name
                    </div>
                    <div className="w-your-investments-table-header-item your-deposits">
                        Your Total Deposits
                    </div>
                    <div className="w-your-investments-table-header-item current-value">
                        Your Current value
                    </div>
                    <div className="w-your-investments-table-header-item performance">
                        Your Performance
                    </div>
                </div>
            </>
        )
    }
}

export default YourInvestmentsTableHeader;