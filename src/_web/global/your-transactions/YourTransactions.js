import React, { Component } from 'react';
import { getEthPrice, getTransactions } from '../../../ethereum/funds/fund-related';
import { getTimeDiff } from '../../../ethereum/utils';
import { connect } from "react-redux";


// COMPONENTS
import SearchBar from './components/SearchBar';
import YourTransactionsTableHeader from './components/YourTransactionsTableHeader';
import YourTransactionsTableRow from './components/YourTransactionsTableRow';
import WalletNotConnected from './../wallet-not-connected/WalletNotConnected';
import SkeletonLoader from './../skeleton-loader/SkeletonLoader';
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
            isLoaded: false
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.onboard !== this.props.onboard) {
            this.getData();
        }
    }

    callbackFunction = (childData) => {
        this.setState({ searchedValue: childData })
    }

    isConnected() {
        return this.props.onboard.walletConnected;
    }

    async getData() {
        await this.setState({ isLoaded: false })
        if (this.isConnected()) {
            let _ethPrice = await getEthPrice();
            let trs = await getTransactions(this.props.onboard.address);
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

    renderConnected() {
        return (
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
        )
    }

    renderNoTransactions() {
        return (
            <div className="w-your-transactions-table-row-no-data">
                You have no transactions
            </div>
        )
    }

    renderNotConnected() {
        return (
            <div className="w-your-transactions-table-row">
                <WalletNotConnected textFromParent="to view your transactions" />
            </div>
        )
    }

    renderLoading() {
        return (
            <SkeletonLoader
            rows={2}
            rowHeight={40}
            />
        )
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
                        {/* <SearchBar {...this.props}
                            parentCallback={this.callbackFunction}
                            defaultValue="Search for a vault name"
                            /> */}
                    </div>
                    <YourTransactionsTableHeader />
                    {this.state.isLoaded === true && this.isConnected() && this.state.transactionHistory.length > 0 && this.renderConnected()}
                    {this.state.isLoaded === true && this.isConnected() && this.state.transactionHistory.length === 0 && this.renderNoTransactions()}
                    {this.state.isLoaded === true && !this.isConnected() && this.renderNotConnected()}
                    {this.state.isLoaded === false && this.renderLoading()}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      account: state.connect,
      onboard: state.onboard
    };
  };
  
  const mapDispatchToProps = {
    
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(InvestmentFunds);