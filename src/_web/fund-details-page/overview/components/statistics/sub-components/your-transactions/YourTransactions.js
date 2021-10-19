import React, { Component } from 'react';

// COMPONENTS
import YourTransactionsTableHeader from './sub-components/YourTransactionsTableHeader';
import YourTransactionsTableRow from './sub-components/YourTransactionsTableRow';

// ASSETS
// ...

// CSS
import '../your-transactions/styles/yourTransactions.css';

class YourTransactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            action1: 'Invest',
            token1: '23.312',
            value1: '4,123,123.3',
            time1: 'about 2 hours ago',

            action2: 'Withdraw',
            token2: '23.312',
            value2: '4,123,123.3',
            time2: 'about 12 hours ago',

            action3: 'Invest',
            token3: '23.312',
            value3: '4,123,123.3',
            time3: 'about 1 day ago',

            action4: 'Invest',
            token4: '23.312',
            value4: '4,123,123.3',
            time4: 'about 1 week ago',
        }
    }

    render() {

        return(
            
            <>
                <div className="w-fund-statistics-your-transactions-wrapper">
                    <YourTransactionsTableHeader />
                    <YourTransactionsTableRow 
                        actionFromParent={this.state.action1}
                        tokenFromParent={this.state.token1}
                        valueFromParent={this.state.value1}
                        timeFromParent={this.state.time1}
                    />
                    <YourTransactionsTableRow 
                        actionFromParent={this.state.action2}
                        tokenFromParent={this.state.token2}
                        valueFromParent={this.state.value2}
                        timeFromParent={this.state.time2}
                    />
                    <YourTransactionsTableRow 
                        actionFromParent={this.state.action3}
                        tokenFromParent={this.state.token3}
                        valueFromParent={this.state.value3}
                        timeFromParent={this.state.time3}
                    />
                    <YourTransactionsTableRow 
                        actionFromParent={this.state.action4}
                        tokenFromParent={this.state.token4}
                        valueFromParent={this.state.value4}
                        timeFromParent={this.state.time4}
                    />
                </div>
            </>
        )
    }
}

export default YourTransactions;