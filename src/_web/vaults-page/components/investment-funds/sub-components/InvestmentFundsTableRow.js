import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS



class InvestmentFundsTableRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchedValue: this.props.searchedValueFromParent,
            name: this.props.nameFromParent,
            type: this.props.typeFromParent,
            denominationAsset: this.props.denominationAssetFromParent,
            AUM: this.props.AUMFromParent,
            depositors: this.props.depositorsFromParent,
            lifetimeGain: this.props.lifetimeGainFromParent,
        }
    }

    render() {

        return (

            <>
                <div className="w-your-transactions-table-row">
                    <div className="w-your-transactions-table-cell"
                    style={{width:'16.6%'}}>
                        {this.state.name}
                    </div>
                    <div className="w-your-transactions-table-cell"
                    style={{width:'16.6%'}}>
                        {this.state.type}
                    </div>
                    <div className="w-your-transactions-table-cell"
                    style={{width:'16.6%'}}>
                        {this.state.denominationAsset}
                    </div>
                    <div className="w-your-transactions-table-cell"
                    style={{width:'16.6%'}}>
                        {this.state.AUM}
                    </div>
                    <div className="w-your-transactions-table-cell"
                    style={{width:'16.6%'}}>
                        {this.state.depositors}
                    </div>
                    <div className="w-your-transactions-table-cell"
                    style={{width:'16.6%', textAlign:'right', color: '#00AF00'}}>
                        {this.state.lifetimeGain}
                    </div>
                </div>
            </>
        )
    }
}

export default InvestmentFundsTableRow;