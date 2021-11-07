import React, { Component } from "react";
import {
  getEthPrice,
  getFundTransactions,
} from "./../../../../ethereum/funds/fund-related";
import { getTimeDiff } from "./../../../../ethereum/utils";
import { connect } from "react-redux";

// COMPONENTS
import SearchBar from "./../components/SearchBar";
import YourTransactionsTableHeader from "./../components/YourTransactionsTableHeader";
import YourTransactionsTableRow from "./../components/YourTransactionsTableRow";
import WalletNotConnected from "./../../wallet-not-connected/WalletNotConnected";
import SkeletonLoader from "./../../skeleton-loader/SkeletonLoader";
// ASSETS
// ...

// CSS
import "./../styles/yourTransactions.css";
import { allFundTransactions } from "../../../../sub-graph-integrations";
import FundTransactionsTableHeader from "./FundTransactionsTableHeader";

import addIcon from "../assets/add-icon.svg";
import minusIcon from "../assets/minus-icon.svg";
import wethIcon from "../assets/weth-icon.svg";
import linkIcon from "./../assets/link.png";
import { getIconSource } from "../../../../icons";

import { currencyFormat } from "../../../../ethereum/utils";

class InvestmentFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.titleFromParent,

      searchedValue: "",
      ethPrice: 1,
      transactionHistory: [],
      isLoaded: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onboard !== this.props.onboard) {
      this.getData();
    }
  }

  callbackFunction = (childData) => {
    this.setState({ searchedValue: childData });
  };

  isConnected() {
    return this.props.onboard.walletConnected;
  }

  async getData() {
    await this.setState({ isLoaded: false });
    let _ethPrice = await getEthPrice();

    const allFundTx = await allFundTransactions(this.props.fundId);

    this.setState({
      transactionHistory: allFundTx || [],
      ethPrice: _ethPrice,
      isLoaded: true,
    });
  }

  async componentDidMount() {
    await this.getData();
  }

  renderTransactions() {
    return (
      <>
        <div
          style={{
            overflowY: "scroll",
            height: this.state.transactionHistory.length > 0 ? "40vh" : "10vh",
          }}
        >
          {this.state.transactionHistory.map((transaction, index) => (
            <>
              <div className="w-your-transactions-table-row" key={index}>
                <div className="w-your-transactions-table-cell newItem">
                  <div className="w-your-transactions-action-section">
                    <img
                      src={transaction.type === "INVEST" ? addIcon : minusIcon}
                    />
                    <div className="w-your-transactions-action-text">
                      {transaction.type}
                    </div>
                  </div>
                </div>

                <div className="w-your-transactions-table-cell token">
                  <a
                    href={`https://etherscan.io/address/${transaction.investor}`}
                    target="_blank"
                  >
                    <div>
                      <b> {`${transaction.investor.slice(0, 4)} ....`} </b>
                      <img
                        className="fund-composition-weth-icon"
                        src={linkIcon}
                        style={{
                          width: "20px",
                          height: "20px",
                          fill: "red",
                        }}
                      />
                    </div>
                  </a>
                </div>

                <div className="w-your-transactions-table-cell vault">
                  {currencyFormat(transaction.shares)}
                </div>

                {/* <div className="w-your-transactions-table-cell value">
                  <div className="w-investment-funds-token-bullet">
                    <div>$</div>
                    <div className="w-investment-funds-token-bullet-text">
                      {currencyFormat(
                        parseFloat(transaction.amount) *
                          this.state.ethPrice *
                          transaction.price,
                        "$"
                      )}
                    </div>
                  </div>
                </div> */}
                <div className="w-your-transactions-table-cell time">
                  {getTimeDiff(transaction.timestamp)}
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    );
  }

  renderNoTransactions() {
    return (
      <div className="w-your-transactions-table-row-no-data">
        You have no transactions
      </div>
    );
  }

  renderNotConnected() {
    return (
      <div className="w-your-transactions-table-row">
        <WalletNotConnected textFromParent="to view your transactions" />
      </div>
    );
  }

  renderLoading() {
    return <SkeletonLoader rows={2} rowHeight={40} />;
  }

  render() {
    // const doNotDisplay = {
    //     display: 'none',
    // }

    return (
      <>
        <div className="w-your-transactions-wrapper">
          <div className="w-your-transactions-header">{this.state.title}</div>
          <div>
            {/* <SearchBar
              {...this.props}
              parentCallback={this.callbackFunction}
              defaultValue="Search for a vault name"
            /> */}
          </div>
          <YourTransactionsTableHeader />
          {this.state.isLoaded === true &&
            this.state.transactionHistory.length > 0 &&
            this.renderTransactions()}
          {this.state.isLoaded === true &&
            this.state.transactionHistory.length === 0 &&
            this.renderNoTransactions()}
          {this.state.isLoaded === false && this.renderLoading()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.connect,
    onboard: state.onboard,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentFunds);
