import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/yourInvestments.css';

class YourInvestmentsTableRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fundName: this.props.fundNameFromParent,
            yourDeposits: this.props.yourDepositsFromParent,
            currentValue: this.props.currentValueFromParent,
            performance: this.props.performanceFromParent,
        }
    }

    render() {

        return (

            <>
                <div className="w-your-investments-table-row">
                    <div className="your-investments-table-row-cell name">
                        {this.state.fundName}
                    </div>
                    <div className="your-investments-table-row-cell your-deposits">
                        {this.state.yourDeposits}
                    </div>
                    <div className="your-investments-table-row-cell current-value">
                        {this.state.currentValue}
                    </div>
                    <div className="your-investments-table-row-cell performance"
                        style={{ color: '#00AF00' }}>
                        {this.state.performance}
                    </div>
                </div>
            </>
        )
    }
}

export default YourInvestmentsTableRow;