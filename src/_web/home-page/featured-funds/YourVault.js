import React, { Component } from "react";
import axios from "axios";

// COMPONENTS
import YourInvestmentFundsCard from "./components/YourInvestmentFundsCard";

// ASSETS
import addIcon from "./assets/add-icon.svg";

// CSS
import "./styles/yourInvestmentFunds.css";
import { getYourInvestments } from "../../../sub-graph-integrations";

// REDUX
import { connect } from "react-redux";
import WalletNotConnected from "../wallet-not-connected/WalletNotConnected";
import { getEthPrice } from "../../../ethereum/funds/fund-related";
import SkeletonLoader from "../skeleton-loader/SkeletonLoader";

class YourInvestmentFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.titleFromParent,
      addNewFund: this.props.addNewFundFromParent,
      ...this.props,
      ethPrice: 1,
      isLoading: true,
    };
  }

  async componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 50);
    this.setState({
      ethPrice: await getEthPrice(),
    });
  }

  toPage(path, e) {
    e.preventDefault();

    this.props.history.push(path);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
    const doNotDisplay = {
      display: "none",
    };

    return (
      <>
        <div className="w-your-investment-funds-wrapper">
          <div className="w-your-investment-funds-header">
            <div className="w-your-investment-funds-title">
              {this.state.title}
            </div>
            <div
              className="w-your-investment-add-new-fund-button"
              style={this.state.addNewFund === false ? doNotDisplay : {}}
              onClick={(e) => this.toPage("/add-new-fund", e)}
            >
              <img
                src={addIcon}
                alt="add-icon"
                className="add-new-fund-add-icon"
              />
              <div className="w-your-investment-add-new-fund-button-text">
                ADD NEW FUND
              </div>
            </div>
          </div>
          {this.props.onboard.walletConnected ? (
            this.props.yourInvestments.length > 0 ? (
              <div className="w-your-investments-cards-section">
                {this.props.yourInvestments.map((fund) => (
                  <YourInvestmentFundsCard
                    {...this.props}
                    key={fund.id}
                    fundAddressFromParent={fund.id}
                    fundsFromParent={
                      parseFloat(fund.state.shares.totalSupply) *
                      parseFloat(fund.accessor.denominationAsset.price.price) *
                      this.state.ethPrice
                    }
                    performanceFromParent={(1 / 2) * 100}
                    fundNameFromParent={fund.name}
                    sharePriceDataFromParent={fund.state}
                  />
                ))}
              </div>
            ) : (
              <div className="w-your-transactions-table-row-no-data">
                You have no vaults
              </div>
            )
          ) : (
            <WalletNotConnected textFromParent="to view your vaults" />
          )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YourInvestmentFunds);
