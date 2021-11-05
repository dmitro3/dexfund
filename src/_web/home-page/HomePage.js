import React, { Component } from "react";

// COMPONENTS
import Header from "../global/header/Header";
import Portfolio from "../global/portfolio/Portfolio";
import SettingsPopup from "../global/settings-popup/SettingsPopup";
import YourInvestments from "./your-investments/YourInvestments";
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
} from "./../../sub-graph-integrations/funds/index";

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
    };
  }

  displaySettingsPopup = () => {
    this.setState({ settingsPopup: true });
  };

  closeSettingsPopup = () => {
    this.setState({ settingsPopup: false });
  };

  async componentDidMount() {
    const topFundsList = await getFundAllFunds();
    const currentUserInvestments = await currentUserAllTransactions(
      this.props.onboard.address
    );

    console.log("Investments 1", currentUserInvestments.investments);

    this.setState({
      topFunds: topFundsList ? topFundsList : [],
      userInvestments: currentUserInvestments.investments,
      userTransactions: currentUserInvestments.transactions,
    });

    console.log("STATE", this.state);
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
            selectedPage="home"
          />
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
              <YourInvestments investments={this.state.userInvestments} />
              <FeaturedFunds
                {...this.props}
              />
              <YourTransactions
                transactions={this.state.userTransactions}
                titleFromParent="YOUR TRANSACTIONS"
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
