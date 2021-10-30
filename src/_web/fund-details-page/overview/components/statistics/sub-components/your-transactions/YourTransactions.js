import React, { Component } from 'react';
import { getEthPrice, getTransactions } from '../../../../../../../ethereum/funds/fund-related';
import {getTimeDiff} from '../../../../../../../ethereum/utils'

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
            transactionHistory: []
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.account !== this.props.account) {
            this.getData();
        }
    }

    callbackFunction = (childData) => {
        this.setState({ searchedValue: childData })
    }

    isConnected() {
        return this.props.account.account && this.props.account.connectSuccess;
    }

    async getData() {
        await this.setState({ isLoaded: false })
        if (this.isConnected()) {
            let _ethPrice = await getEthPrice();
            let trs = await getTransactions(this.props.account.account.address);
            // let trs = [];
            this.setState({
                transactionHistory: trs || [],
                ethPrice: _ethPrice,
                isLoaded: true
            });
        } else {
            this.setState({
                transactionHistory: [],
                isLoaded: true
            })
        }
    }

    async componentDidMount() {
        await this.getData();
    }

    render() {

        return(
            
            <>
                <div className="w-fund-statistics-your-transactions-wrapper">
                    <YourTransactionsTableHeader />
                    {
                        this.state.transactionHistory.map(transaction => (
                            <YourTransactionsTableRow
                                actionFromParent={transaction.type}
                                tokenFromParent={parseFloat(transaction.value).toFixed(2)}
                                valueFromParent={(parseFloat(transaction.value) * this.state.ethPrice).toFixed(2)}
                                vaultFromParent={transaction.fundName}
                                typeFromParent={transaction.type}
                                timeFromParent={getTimeDiff(parseInt(transaction.timestamp) * 1000)}
                            />
                        ))
                        }
                </div>
            </>
        )
    }
}

export default YourTransactions;