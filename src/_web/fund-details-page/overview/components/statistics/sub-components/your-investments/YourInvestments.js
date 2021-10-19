import React, { Component } from 'react';

// COMPONENTS
import YourInvestmentsTableHeader from './sub-components/YourInvestmentsTableHeader';
import YourInvestmentsTableRow from './sub-components/YourInvestmentsTableRow';

// ASSETS
// ...

// CSS
import './styles/yourInvestments.css';

class YourInvestments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            asset1: '2.00',
            price1: '2000',
            value1: '20000',
            performance1: '20',
        }
    }

    render() {

        return (

            <>
                <div className="w-fund-statistics-your-investments-wrapper">
                    <YourInvestmentsTableHeader />
                    <YourInvestmentsTableRow 
                        assetFromParent={this.state.asset1}
                        priceFromParent={this.state.price1}
                        valueFromParent={this.state.value1}
                        performanceFromParent={this.state.performance1}
                    />
                    <YourInvestmentsTableRow 
                        assetFromParent={this.state.asset1}
                        priceFromParent={this.state.price1}
                        valueFromParent={this.state.value1}
                        performanceFromParent={this.state.performance1}
                    />
                    <YourInvestmentsTableRow 
                        assetFromParent={this.state.asset1}
                        priceFromParent={this.state.price1}
                        valueFromParent={this.state.value1}
                        performanceFromParent={this.state.performance1}
                    />
                </div>
            </>
        )
    }
}

export default YourInvestments;
