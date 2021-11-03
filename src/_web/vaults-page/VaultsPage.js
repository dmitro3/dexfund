import React, { Component } from "react";

//REDUX
import { connect } from "react-redux";
import {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
} from "./../../redux/actions/LoaderAction";

import { getAUM } from "../../sub-graph-integrations";
import { getEthPrice } from "../../ethereum/funds/fund-related";
import { getAllCreationSharePrices } from './../../api/vaults';

// COMPONENTS
import Header from "../global/header/Header";
import SettingsPopup from "../global/settings-popup/SettingsPopup";
import TopInvestmentFunds from "../home-page/top-investment-funds/TopInvestmentFunds";
import InvestmentFunds from "./components/investment-funds/InvestmentFunds";
// CONFIG
import configs from "./../../config";

// ASSETS
// ...

// CSS
import "./vaultsPage.css";
import "../your-funds-page/yourFundsPage.css";

// QUERYS
import { getAllInvestments } from "./../../sub-graph-integrations/index";
import WalletNotConnected from "../global/wallet-not-connected/WalletNotConnected";

class VaultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      settingsPopup: false,
      investments: [],
      isLoaded: false,
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
    });
    // this.props.deactivateLoaderOverlay();
    await this.setState({ isLoaded: true });
  }

  displaySettingsPopup = () => {
    this.setState({ settingsPopup: true });
  };

  closeSettingsPopup = () => {
    this.setState({ settingsPopup: false });
  };

  searchCallbackFunction(v) {}

  render() {
    var width = window.innerWidth;

    const doNotDisplay = {
      display: "none",
    };

    if (width > 1000) {
      return (
        <>
          <Header
            {...this.props}
            displaySettingsPopupEvent={this.displaySettingsPopup}
            selectedPage="vaults"
          />
          <div
            className="w-your-funds-page-wrapper"
            style={{ padding: "60px 0 120px 0", height: "100vh" }}
          >
            <div className="w-your-funds-page-content">
              {/* <TopInvestmentFunds {...this.props} /> */}
              <InvestmentFunds
                isLoaded={this.state.isLoaded}
                investments={this.state.investments}
                {...this.props}
                ethPrice={this.state.ethPrice}
              />
            </div>
          </div>
          <div style={this.state.settingsPopup === false ? doNotDisplay : {}}>
            <SettingsPopup
              {...this.props}
              closeSettingsPopupEvent={this.closeSettingsPopup}
            />
          </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VaultsPage);
