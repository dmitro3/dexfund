import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS


class InvestmentFundsTableHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {

        return (

            <>
                <div className="w-your-transactions-table-header">
                    <div className="w-your-transactions-table-header-cell"
                    style={{width:'26.6%'}}>
                        Name
                    </div>
                    <div className="w-your-transactions-table-header-cell"
                    style={{width:'16.6%'}}>
                        Top Asset
                    </div>
                    <div className="w-your-transactions-table-header-cell"
                    style={{width:'16.6%'}}>
                        AUM ($)
                    </div>
                    <div className="w-your-transactions-table-header-cell"
                    style={{width:'5%'}}>
                        Depositors
                    </div>
                    <div className="w-your-transactions-table-header-cell"
                    style={{width:'16.6%', textAlign:'right'}}>
                        Lifetime gain
                    </div>
                </div>
            </>
        )
    }
}

export default InvestmentFundsTableHeader;