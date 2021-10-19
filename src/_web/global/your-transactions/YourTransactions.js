import React, { Component } from 'react';

// COMPONENTS
import SearchBar from './components/SearchBar';
import YourTransactionsTableHeader from './components/YourTransactionsTableHeader';
import YourTransactionsTableRow from './components/YourTransactionsTableRow';

// ASSETS
// ...

// CSS
import './styles/yourTransactions.css';

class InvestmentFunds extends Component {

    constructor(props) {
        super(props);

        this.state = {

            title: this.props.titleFromParent,

            searchedValue: '',

            action1: 'Invest',
            token1: '2.33',
            value1: '4,123.32',
            vault1: 'Radar Staking',
            type1: 'Staking',
            time1: 'about 2 hours ago',

            action2: 'Invest',
            token2: '0.32',
            value2: '123.32',
            vault2: 'Radar Swap',
            type2: 'Investment',
            time2: 'about 20 hours ago',

            action3: 'Withdraw',
            token3: '0.40',
            value3: '23.32',
            vault3: 'Radar Swap',
            type3: 'Investment',
            time3: 'about 1 day ago',

            action4: 'Invest',
            token4: '1.32',
            value4: '1,123.32',
            vault4: 'Radar Swap',
            type4: 'Investment',
            time4: 'about 2 days ago',

            action5: 'Withdraw',
            token5: '4.21',
            value5: '24,123.32',
            vault5: 'Radar Swap',
            type5: 'Staking',
            time5: 'about 1 week ago',
        }
    }

    callbackFunction = (childData) => {
        this.setState({ searchedValue: childData })
    }

    render() {

        const doNotDisplay = {
            display: 'none',
        }

        return (

            <>
                <div className="w-your-transactions-wrapper">
                    <div className="w-your-transactions-header">
                        {this.state.title}
                    </div>
                    <div>
                        <SearchBar {...this.props}
                            parentCallback={this.callbackFunction} />
                    </div>
                    <YourTransactionsTableHeader />
                    <YourTransactionsTableRow
                        actionFromParent={this.state.action1}
                        tokenFromParent={this.state.token1}
                        valueFromParent={this.state.value1}
                        vaultFromParent={this.state.vault1}
                        typeFromParent={this.state.type1}
                        timeFromParent={this.state.time1}
                        searchedValueFromParent={this.state.searchedValue}
                    />
                    <YourTransactionsTableRow
                        actionFromParent={this.state.action2}
                        tokenFromParent={this.state.token2}
                        valueFromParent={this.state.value2}
                        vaultFromParent={this.state.vault2}
                        typeFromParent={this.state.type2}
                        timeFromParent={this.state.time2}
                        searchedValueFromParent={this.state.searchedValue}
                    />
                    <YourTransactionsTableRow
                        actionFromParent={this.state.action3}
                        tokenFromParent={this.state.token3}
                        valueFromParent={this.state.value3}
                        vaultFromParent={this.state.vault3}
                        typeFromParent={this.state.type3}
                        timeFromParent={this.state.time3}
                        searchedValueFromParent={this.state.searchedValue}
                    />
                    <YourTransactionsTableRow
                        actionFromParent={this.state.action4}
                        tokenFromParent={this.state.token4}
                        valueFromParent={this.state.value4}
                        vaultFromParent={this.state.vault4}
                        typeFromParent={this.state.type4}
                        timeFromParent={this.state.time4}
                        searchedValueFromParent={this.state.searchedValue}
                    />
                    <YourTransactionsTableRow
                        actionFromParent={this.state.action5}
                        tokenFromParent={this.state.token5}
                        valueFromParent={this.state.value5}
                        vaultFromParent={this.state.vault5}
                        typeFromParent={this.state.type5}
                        timeFromParent={this.state.time5}
                        searchedValueFromParent={this.state.searchedValue}
                    />
                </div>
            </>
        )
    }
}

export default InvestmentFunds;