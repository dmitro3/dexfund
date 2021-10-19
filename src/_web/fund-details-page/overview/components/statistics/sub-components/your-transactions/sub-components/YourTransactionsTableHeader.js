import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../../your-transactions/styles/yourTransactions.css';

class YourTransactionsTableHeader extends Component {

    render() {

        return (

            <>
                <div className="w-fund-transactions-table-header">
                    <div className="w-fund-transactions-table-header-item action">
                        Action
                    </div>
                    <div className="w-fund-transactions-table-header-item token">
                        Token
                    </div>
                    <div className="w-fund-transactions-table-header-item value">
                        Value($)
                    </div>
                    <div className="w-fund-transactions-table-header-item time">
                        Time
                    </div>
                </div>
            </>
        )
    }
}

export default YourTransactionsTableHeader;