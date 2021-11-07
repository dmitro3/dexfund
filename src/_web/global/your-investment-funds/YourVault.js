import React, { Component } from "react";
import axios from "axios";

// COMPONENTS
import YourInvestmentFundsCard from "./../../home-page/featured-funds/components/YourInvestmentFundsCard";
// ASSETS
import addIcon from "./assets/add-icon.svg";

// CSS
import "./styles/yourInvestmentFunds.css";
import {
  getYourInvestments,
  getAllInvestments,
} from "../../../sub-graph-integrations";

// REDUX
import { connect } from "react-redux";
import WalletNotConnected from "../wallet-not-connected/WalletNotConnected";
import { getEthPrice } from "../../../ethereum/funds/fund-related";
import SkeletonLoader from "../skeleton-loader/SkeletonLoader";
import { getCreationSharePrices } from "../../../api/statistics";

class YourInvestmentFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.titleFromParent,
      addNewFund: this.props.addNewFundFromParent,
      ...this.props,
      ethPrice: 1,
      isLoading: true,
      investments: [],
    };
  }

  async componentDidMount() {
    this.getData();
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

  calculateAUM(fund, ethPrice) {
    let AUM = 0;
    fund.portfolio.holdings.forEach((holding) => {
      const amount =
        parseFloat(holding.amount) * parseFloat(holding.asset.price.price);
      AUM += amount;
    });

    return AUM * ethPrice;
  }

  getData = async () => {
    // get all vaults - address and name
    console.log(this.props.yourInvestments);
    var investments = this.props.yourInvestments;
    // calculate AUM - AUM
    const ethPrice = await getEthPrice();
    for (var i = 0; i < investments.length; i++) {
      investments[i].AUM = this.calculateAUM(investments[i], ethPrice);
    }
    // sort after AUM and get first 5
    investments = investments.sort((a, b) => {
      if (a.AUM < b.AUM) return 1;
      else if (a.AUM > b.AUM) return -1;
      else return 0;
    });

    investments = investments.slice(0, 5);
    // calculate share price - sharePrice
    const startSharePrices = await getCreationSharePrices(
      investments.map((v) => v.id)
    );
    // get LTR with the use of the API - LTR
    for (var i = 0; i < investments.length; i++) {
      investments[i].fundName = investments[i].name;
      investments[i].sharePrice =
        parseFloat(investments[i].AUM) /
        parseFloat(investments[i].shares.totalSupply);
      investments[i].sharePrice = Number.isNaN(investments[i].sharePrice)
        ? 0
        : investments[i].sharePrice;
      if (!Object.keys(startSharePrices).includes(investments[i].id)) {
        investments[i].ltr = 0.0;
      } else {
        const creationSP = startSharePrices[investments[i].id.toLowerCase()];
        var ltr;
        var profit = investments[i].sharePrice - creationSP;
        ltr = (profit / creationSP) * 100;
        investments[i].ltr = ltr;
      }
    }

    this.setState({ investments });
  };

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
            this.state.investments.length > 0 ? (
              <div className="w-your-investments-cards-section">
                {this.state.investments.map((investment) => (
                  <YourInvestmentFundsCard
                    {...this.state}
                    key={investment.id}
                    fundAddressFromParent={investment.id}
                    fundsFromParent={investment.AUM}
                    performanceFromParent={investment.ltr}
                    fundNameFromParent={investment.fundName}
                    sharePriceDataFromParent={investment.sharePrice}
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
