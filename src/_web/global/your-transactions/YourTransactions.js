import React, { Component } from 'react';
import { getEthPrice, getTransactions } from '../../../ethereum/funds/fund-related';
import { getTimeDiff } from '../../../ethereum/utils';

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
            ethPrice: 0,
            transactionHistory: [],
            action1: 'Invest',
            token1: '2.33',
            value1: '4,123.32',
            vault1: 'Radar Staking',
            type1: 'Staking',
            time1: 'about 2 hours ago',
        }
    }

    callbackFunction = (childData) => {
        this.setState({ searchedValue: childData })
    }
    async componentDidMount() {
        let _ethPrice = await getEthPrice();
        let trs = await getTransactions();
        this.setState({
            transactionHistory: trs || [],
            ethPrice: _ethPrice
        });
        console.log('trs: ', trs);
    }

    isWithdraw(_type) {
        return (_type === "TrackedAssetRemovedEvent") || (_type === "AssetWithdrawnEvent");
    }

    render() {

        // const doNotDisplay = {
        //     display: 'none',
        // }

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
                    {
                        this.state.transactionHistory.map(transaction => (
                            <YourTransactionsTableRow
                                actionFromParent={this.isWithdraw(transaction.__typename)? "Withdraw" : "Invest"}
                                tokenFromParent={parseFloat(transaction.transaction.value).toFixed(2)}
                                valueFromParent={(parseFloat(transaction.transaction.value) * this.state.ethPrice).toFixed(2)}
                                vaultFromParent={transaction.fund.name}
                                typeFromParent={this.isWithdraw(transaction.__typename) ? "Withdraw" : "Invest"}
                                timeFromParent={getTimeDiff(parseInt(transaction.transaction.timestamp) * 1000)}
                            />
                        ))
                    }
                    
                </div>
            </>
        )
    }
}

export default InvestmentFunds;