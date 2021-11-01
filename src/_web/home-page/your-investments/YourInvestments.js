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
    return this.state.investments.map((investment, index) => (
      <YourinvestmentsTableRow
        key={index}
        fundNameFromParent={investment.fund.name}
        yourDepositsFromParent={investment.investmentAmount}
        currentValueFromParent={
          investment.investmentAmount *
          this.state.ethPrice *
          investment.fund.accessor.denominationAsset.price.price
        }
        performanceFromParent={(
          ((investment.investmentAmount - investment.investmentState.shares) /
            investment.investmentAmount) *
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
          <div className="w-your-investments-header">YOUR INVESTMENTS</div>
          <div className="w-your-investments-table">
            <YourInvestmentsTableHeader />
            {this.state.isLoaded === true &&
              this.isConnected() &&
              this.state.investments.length > 0 &&
              this.renderInvestments()}
            {this.state.isLoaded === true &&
              this.isConnected() &&
              this.state.investments.length == 0 &&
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
