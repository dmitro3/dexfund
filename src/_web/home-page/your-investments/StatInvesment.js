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

// REDUX

class YourInvestments extends Component {
  constructor(props) {
    super(props);
    console.log("KK", this.props);
    this.state = {
      investments: [],
      ethPrice: 1,
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

  async getInvestments() {
    await this.setState({
      isLoaded: false,
    });

    let _ethPrice = await getEthPrice();
    if (this.isConnected()) {
      const investments = await getYourInvestments(this.props.onboard.address);

      console.log("App", investments);
      await this.setState({
        investments: investments ? investments : [],
        isLoaded: true,
        ethPrice: _ethPrice,
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
      <YourinvestmentsTableRow
        key={index}
        fundNameFromParent={investment.fundName}
        yourDepositsFromParent={investment.amount}
        currentValueFromParent={
          investment.price * investment.amount * this.state.ethPrice
        }
        performanceFromParent={(
          (investment.shares / investment.investmentShares) *
          100
        ).toFixed(2)}
      />
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
          <YourInvestmentsTableHeader />
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
