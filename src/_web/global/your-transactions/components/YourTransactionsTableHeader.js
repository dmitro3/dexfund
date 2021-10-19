import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/yourTransactions.css';

class YourTransactionsTableHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {

        return (

            <>
                <div className="w-your-transactions-table-header">
                    <div className="w-your-transactions-table-header-cell action">
                        Action
                    </div>
                    <div className="w-your-transactions-table-header-cell token">
                        Token
                    </div>
                    <div className="w-your-transactions-table-header-cell value">
                        Value($)
                    </div>
                    <div className="w-your-transactions-table-header-cell vault">
                        Vault
                    </div>
                    <div className="w-your-transactions-table-header-cell type">
                        Type
                    </div>
                    <div className="w-your-transactions-table-header-cell time">
                        Time
                    </div>
                </div>
            </>
        )
    }
}

export default YourTransactionsTableHeader;