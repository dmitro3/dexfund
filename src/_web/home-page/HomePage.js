import React, { Component } from "react";

// COMPONENTS
import Header from "../global/header/Header";
import Portfolio from "../global/portfolio/Portfolio";
import SettingsPopup from "../global/settings-popup/SettingsPopup";
import UserInvestments from "./your-investments/UserInvestment";
import TopInvestmentFunds from "./top-investment-funds/TopInvestmentFunds";
import FeaturedFunds from "./featured-funds/FeaturedFunds";
import YourTransactions from "../global/your-transactions/YourTransactions";

// ASSETS
// ...

// CSS
import "./homePage.css";

// REDUX
import { connect } from "react-redux";
import {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
} from "./../../redux/actions/LoaderAction";

import {
  getFundAllFunds,
  getYourInvestments,
  currentUserAllTransactions,
  getCurrentUserInvestments,
  getAllInvestments,
} from "./../../sub-graph-integrations/funds/index";
import CardContainer from "../global/CardContainer/CardContainer";
import { getAllCreationSharePrices } from "../../api/vaults";
import { getEthPrice } from "../../ethereum/funds/fund-related";
import configs from "../../config";
import InvestmentFunds from "../vaults-page/components/investment-funds/InvestmentFunds";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      settingsPopup: false,
      topFunds: [],
      yourInvestments: [],
      userInvestments: [],
      userTransactions: [],

      sidebar: false,
      investments: [],
      isLoaded: false,
    };
  }

  // async componentDidMount() {
  //   const topFundsList = await getFundAllFunds();
  //   const currentUserInvestments = await currentUserAllTransactions(
  //     this.props.onboard.address
  //   );

  //   const investments = await getCurrentUserInvestments(
  //     this.props.onboard.address
  //   );

  //   console.log(investments);
  //   this.setState({
  //     topFunds: topFundsList ? topFundsList : [],
  //     userInvestments: investments,
  //     userTransactions: currentUserInvestments.transactions,
  //   });
  // }

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
      isLoaded: false,
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
    }
    investments.sort((a, b) => {
      if (a.currentAUM < b.currentAUM)
        return 1;
      else if(a.currentAUM > b.currentAUM)
        return -1;
      else
        return 0;
    });
    // const investments = {}
    this.setState({
      ...this.state,
      investments: investments,
      isLoaded: true
    });
    // this.props.deactivateLoaderOverlay();
  }


  render() {
    var width = window.innerWidth;

    if (width > 1000) {
      return (
          <div className="w-home-page-wrapper">
            <div className="w-home-page-content">
              {/* <Portfolio
                walletMust={true}
                props={this.props}
                currentSharePrice="INTERNAL_API"
              /> */}
              <TopInvestmentFunds
                {...this.props}
                topFunds={this.state.topFunds}
              />
              {/* <FeaturedFunds {...this.props} /> */}

              <InvestmentFunds
                isLoaded={this.state.isLoaded}
                investments={this.state.investments}
                {...this.props}
                ethPrice={this.state.ethPrice}
              />
             
              {/* <UserInvestments investments={this.state.userInvestments} /> */}
              {/* <YourTransactions
                transactions={this.state.userTransactions}
                titleFromParent="YOUR TRANSACTIONS"
              /> */}
            </div>
          </div>
      );
    } else {
      return <></>;
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
