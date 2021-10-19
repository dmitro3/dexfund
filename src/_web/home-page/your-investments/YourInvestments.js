import React, { Component } from 'react';

// COMPONENTS
import YourInvestmentsTableHeader from './components/YourInvestmentsTableHeader';
import YourinvestmentsTableRow from './components/YourInvestmentsTableRow';

// ASSETS
// ...

// CSS
import './styles/yourInvestments.css';

class YourInvestments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fundName: 'Radar Swap',
            yourDeposits: '$1.000.000,00',
            currentValue: '$1.100.000,00',
            performance: '+10%',
        }
    }

    render() {

        return (

            <>
                <div className="w-your-investments-wrapper">
                    <div className="w-your-investments-header">
                        YOUR INVESTMENTS
                    </div>
                    <div className="w-your-investments-table">
                        <YourInvestmentsTableHeader />
                        <YourinvestmentsTableRow 
                            fundNameFromParent={this.state.fundName}
                            yourDepositsFromParent={this.state.yourDeposits}
                            currentValueFromParent={this.state.currentValue}
                            performanceFromParent={this.state.performance}
                        />
                        <YourinvestmentsTableRow 
                            fundNameFromParent={this.state.fundName}
                            yourDepositsFromParent={this.state.yourDeposits}
                            currentValueFromParent={this.state.currentValue}
                            performanceFromParent={this.state.performance}
                        />
                        <YourinvestmentsTableRow 
                            fundNameFromParent={this.state.fundName}
                            yourDepositsFromParent={this.state.yourDeposits}
                            currentValueFromParent={this.state.currentValue}
                            performanceFromParent={this.state.performance}
                        />
                        <YourinvestmentsTableRow 
                            fundNameFromParent={this.state.fundName}
                            yourDepositsFromParent={this.state.yourDeposits}
                            currentValueFromParent={this.state.currentValue}
                            performanceFromParent={this.state.performance}
                        />
                        <YourinvestmentsTableRow 
                            fundNameFromParent={this.state.fundName}
                            yourDepositsFromParent={this.state.yourDeposits}
                            currentValueFromParent={this.state.currentValue}
                            performanceFromParent={this.state.performance}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default YourInvestments;