import React, { Component } from "react";
import { connect } from "react-redux";

import {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
} from "../../../redux/actions/LoaderAction";
import configs from "../../../config";
import { getFiveInvestments } from "../../../sub-graph-integrations";
import { getEthPrice } from "../../../ethereum/funds/fund-related";
import { getAllInvestments } from "../../../sub-graph-integrations";
import { getAllCreationSharePrices } from "../../../api/vaults";

// COMPONENTS
import MostProfitableAllTime from "./components/MostProfitableAllTime";
import MostProfitableThisMonth from "./components/MostProfitableThisMonth";
import MostProfitableToday from "./components/MostProfitableToday";
import SkeletonLoader from "../../global/skeleton-loader/SkeletonLoader";

// ASSETS
// ...

// CSS
import "./styles/topInvestmentFunds.css";
import WalletNotConnected from "../../global/wallet-not-connected/WalletNotConnected";
import DexFundCard from "../../components/DexFundCard/DexFundCard";

class TopInvestmentFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profitable: [],
      largest: [],
      recent: [],
      loading: true,
    };
  }

  calculateAUM(fund) {
    let AUM = 0
    fund.portfolio.holdings.forEach(holding => {
      const amount = parseFloat(holding.amount) *  parseFloat(holding.asset.price.price)
      AUM += amount
    });

    return AUM
  }

  calculateCurrentSharePrice(investment, aum) {
    const shareSupply = parseFloat(investment.shares.totalSupply);
    const sharePrice = parseFloat(aum) * this.state.ethPrice / shareSupply;

    return !Number.isNaN(sharePrice) ? sharePrice : 0;
  }

  calculateLifetimeReturn(investment, aum, ccsp) {
    if (!Object.keys(ccsp).includes(investment.id.toLowerCase()))
      return 0;
    const csp = this.calculateCurrentSharePrice(investment, aum);
    if (csp == 0)
      return 0;

    const creationSP = ccsp[investment.id.toLowerCase()];
    var ltr;
    var profit = csp - creationSP;
    ltr = (profit / creationSP) * 100;
    return ltr;
  }

  async componentDidMount() {
    // this.props.activateLoaderOverlay()
    await this.setState({
      loading: true,
      ethPrice: await getEthPrice()
    });
    var investments = await getAllInvestments();
    var creationSharePrices = await getAllCreationSharePrices();
    investments = investments.filter((v) => {
      return !configs.BLACKLISTED_VAULTS.includes(v.id.toLowerCase());
    });
    for(var i = 0; i < investments.length; i++) {
      investments[i].currentAUM = this.calculateAUM(investments[i]);
      investments[i].ltr = this.calculateLifetimeReturn(investments[i], investments[i].currentAUM, creationSharePrices);
      investments[i].currentAUM *= this.state.ethPrice;
    }
    investments.sort((a, b) => {
      if (a.currentAUM < b.currentAUM)
        return 1;
      else if(a.currentAUM > b.currentAUM)
        return -1;
      else
        return 0;
    });

    const largest = investments.splice(0, 6);

    investments.sort((a, b) => {
      if (a.ltr > 1000)
        return 1;
      if (a.ltr < b.ltr)
        return 1;
      else if(a.ltr > b.ltr)
        return -1;
      else
        return 0;
    });

    const profitable = investments.splice(0, 6);

    investments.sort((a, b) => {
      if (a.inception < b.inception)
        return 1;
      else if(a.inception > b.inception)
        return -1;
      else
        return 0;
    });

    const recent = investments.splice(0, 6);
    // const investments = {}
    this.setState({
      loading: false,
      profitable,
      largest,
      recent
    });
  }

  renderContent() {
    return (
      <div className="w-top-investment-funds-content">
        {/* <MostProfitableAllTime
          investments={this.state.profitable}
          {...this.props}
        /> */}
        {
          this.state.largest.map((fund, index) => {
            return (
              <div key={index} className="fund-card-wrapper">
                <DexFundCard {...this.props} fund={fund}/>
              </div>
            )
          })
        }
        {/* <MostProfitableThisMonth
          investments={this.state.largest}
          {...this.props}
        />
        <MostProfitableToday
          investments={this.state.recent}
          {...this.props}
        /> */}
      </div>
    );
  }

  renderLoading() {
    return (<SkeletonLoader rows={10} rowHeight={5} />);
  }

  render() {
    return (
      <>
        <div className="w-top-investment-funds-wrapper">
          <div className="w-top-investment-funds-header">
            Top Dexfunds
          </div>
          {this.state.loading === true && this.renderLoading()}
          {this.state.loading === false && this.renderContent()}
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

const mapDispatchToProps = {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopInvestmentFunds);
