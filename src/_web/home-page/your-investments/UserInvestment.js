import React, { Component } from "react";
import { connect } from "react-redux";

// COMPONENTS
import YourInvestmentsTableHeader from "./components/YourInvestmentsTableHeader";
import YourinvestmentsTableRow from "./components/YourInvestmentsTableRow";
import WalletNotConnected from "./../../global/wallet-not-connected/WalletNotConnected";
// ASSETS
// ...

import SkeletonLoader from "./../../global/skeleton-loader/SkeletonLoader";

// CSS
import "./styles/yourInvestments.css";
import { getYourInvestments } from "../../../sub-graph-integrations";
import { getEthPrice } from "../../../ethereum/funds/fund-related";
import { currencyFormat } from "../../../ethereum/utils";
// REDUX

class YourInvestments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      investments: [],
      ethPrice: 1,
      oldEthprice: 1,
    };

    this.getInvestments = this.getInvestments.bind(this);
    this.isConnected = this.isConnected.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onboard != this.props.onboard) {
      this.getInvestments();
    }
  }

  isConnected() {
    return this.props.onboard.walletConnected;
  }

  loader = () => {
    return <SkeletonLoader rows={2} rowHeight={40} />;
  };

  getAum = (portfolio) => {
    let aum = 0;
    portfolio.holdings.forEach((holding) => {
      const amount =
        parseFloat(holding.amount) * parseFloat(holding.asset.price.price);
      aum += amount;
    });

    return aum;
  };

  async getInvestments() {
    await this.setState({
      isLoaded: false,
    });

    let _ethPrice = await getEthPrice();
    if (this.isConnected()) {
      const investments = await getYourInvestments(this.props.onboard.address);

      await this.setState({
        investments: investments ? investments : [],
        isLoaded: true,
        ethPrice: _ethPrice,
        oldEthprice: await getEthPrice(),
      });
    } else {
      await this.setState({
        investments: [],
        isLoaded: true,
        ethPrice: _ethPrice,
      });
    }
  }

  async componentDidMount() {
    await this.getInvestments();
  }

  renderInvestments() {
    return this.props.investments.map((investment, index) => (
      <div className="w-your-investments-table-row" key={index}>
        <div className="your-investments-table-row-cell name">
          {investment.fund.name}
        </div>
        <div className="your-investments-table-row-cell current-value">
          $
          {currencyFormat(
            (investment.shares / investment.fund.shares.totalSupply) *
              this.state.oldEthprice *
              this.getAum(investment.fund.portfolio),
            "$"
          )}
        </div>
        <div
          className="your-investments-table-row-cell performance"
          style={{ color: "#00AF00" }}
        >
          {(
            (investment.shares / investment.fund.shares.totalSupply) *
            100
          ).toFixed(2)}{" "}
          %
        </div>
      </div>
    ));
  }

  renderNoInvestments() {
    return (
      <div className="w-your-investments-table-row-no-data">
        You have no investments
      </div>
    );
  }

  renderWalletNotConnected() {
    return (
      <div className="w-your-investments-table-row">
        <WalletNotConnected textFromParent="to view your investments" />
      </div>
    );
  }

  renderLoading() {
    return <div style={{ paddingTop: "2%" }}>{this.loader()}</div>;
  }

  render() {
    return (
      <>
        <div className="w-your-investments-wrapper">
          <div className="w-your-investments-header">YOUR INVESTMENTS</div>
          <div className="w-your-investments-table">
            <div className="w-your-investments-table-header">
              <div className="w-your-investments-table-header-item name">
                Vault Name
              </div>
              <div className="w-your-investments-table-header-item current-value">
                Your Current value
              </div>
              <div className="w-your-investments-table-header-item performance">
                Your Performance
              </div>
            </div>
            {this.state.isLoaded === true &&
              this.isConnected() &&
              this.props.investments.length > 0 &&
              this.renderInvestments()}
            {this.state.isLoaded === true &&
              this.isConnected() &&
              this.props.investments.length == 0 &&
              this.renderNoInvestments()}
            {this.state.isLoaded === true &&
              !this.isConnected() &&
              this.renderWalletNotConnected()}
            {this.state.isLoaded === false && this.renderLoading()}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(YourInvestments);
