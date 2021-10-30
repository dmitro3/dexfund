import React, { Component } from "react";

// COMPONENTS
import Header from "../global/header/Header";
import Portfolio from "../global/portfolio/Portfolio";
import SettingsPopup from "../global/settings-popup/SettingsPopup";
import YourInvestments from "./your-investments/YourInvestments";
import TopInvestmentFunds from "./top-investment-funds/TopInvestmentFunds";
import YourInvestmentFunds from "../global/your-investment-funds/YourInvestmentFunds";
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

import {getFundAllFunds}  from  './../../sub-graph-integrations/funds/index'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsPopup: false,
      topFunds: [],
      ...this.props
    };
  }

  displaySettingsPopup = () => {
    this.setState({ settingsPopup: true });
  };

  closeSettingsPopup = () => {
    this.setState({ settingsPopup: false });
  };

  async componentDidMount() {
    const topFundsList  =  await getFundAllFunds();
    this.setState({
      ...this.state,
      topFunds : topFundsList ? topFundsList : []
    })

    console.log("Top", this.state.topFunds)
  }

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
            selectedPage='home'
          />
          <div className="w-home-page-wrapper">
            <div className="w-home-page-content">
              <Portfolio walletMust={true} props={this.props} currentSharePrice="INTERNAL_API" />


              <TopInvestmentFunds {...this.props}  topFunds= {this.state.topFunds} />
              <YourInvestments />
              <YourInvestmentFunds
                {...this.props}
                titleFromParent="FEATURED VAULTS"
                addNewFundFromParent={false}
              />
              <YourTransactions titleFromParent="YOUR TRANSACTIONS" />
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
    onboard: state.onboard
  };
};

const mapDispatchToProps = {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
