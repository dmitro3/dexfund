import React, { Component } from "react";
import axios from "axios";

// COMPONENTS
import YourInvestmentFundsCard from "./components/YourInvestmentFundsCard";
import SkeletonLoader from "../../global/skeleton-loader/SkeletonLoader";

// ASSETS
import addIcon from "./assets/add-icon.svg";

import { getAllInvestments } from "./../../../sub-graph-integrations/index";
import { getEthPrice } from "./../../../ethereum/funds/fund-related";

// CSS
import "./styles/yourInvestmentFunds.css";
import { getYourInvestments } from "../../../sub-graph-integrations";
import { getCreationSharePrices } from "../../../api/statistics";

// REDUX
import { connect } from "react-redux";

class FeaturedFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      loaded: false,
      funds: [],
    };
  }

  componentDidMount() {
    this.getData();
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
    var investments = await getAllInvestments();
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

    this.setState({
      loaded: true,
      funds: investments,
    });
  };

  toPage(path, e) {
    e.preventDefault();

    this.props.history.push(path);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  renderLoader() {
    return <SkeletonLoader rows={4} rowHeight={40} />;
  }

  renderNoVaults() {
    return (
      <div style={{ textAlign: "center", color: "white" }}>
        There are no created vaults.
      </div>
    );
  }

  renderCards() {
    return this.state.funds.map((investment, index) => (
      <YourInvestmentFundsCard
        {...this.props}
        key={investment.id}
        fundAddressFromParent={investment.id}
        fundsFromParent={investment.AUM}
        performanceFromParent={investment.ltr}
        fundNameFromParent={investment.fundName}
        sharePriceDataFromParent={investment.sharePrice}
      />
    ));
  }

  render() {
    const doNotDisplay = {
      display: "none",
    };

    return (
      <>
        <div className="w-your-investment-funds-wrapper">
          <div className="w-your-investment-funds-header">
            <div className="w-your-investment-funds-title">FEATURED VAULTS</div>
          </div>
          <div className="w-your-investments-cards-section">
            {this.state.loaded === false && this.renderLoader()}
            {this.state.loaded === true &&
              this.state.funds.length > 0 &&
              this.renderCards()}
            {this.state.loaded === true &&
              this.state.funds.length === 0 &&
              this.renderNoVaults()}
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

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedFunds);
