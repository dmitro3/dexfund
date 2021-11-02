import React, { Component } from "react";
import { connect } from "react-redux";

// COMPONENTS
import Header from "../global/header/Header";
import SettingsPopup from "../global/settings-popup/SettingsPopup";
import Portfolio from "../global/portfolio/Portfolio";
import YourInvestmentFunds from "../global/your-investment-funds/YourInvestmentFunds";
import YourTransactions from "../global/your-transactions/YourTransactions";

// ASSETS
// ...

// CSS
import "./yourFundsPage.css";
import {
  currentUserAllTransactions,
  getYourInvestments,
} from "../../sub-graph-integrations";

class YourFundsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      settingsPopup: false,
      yourInvestments: [],
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
    const yourInvestments = await getYourInvestments(
      this.props.onboard.address
    );
    const currentUserInvestments = await currentUserAllTransactions(
      "0xaed39f9013fe44deb694203d9d12ea4029edac49"
    );
    this.setState({
      yourInvestments: yourInvestments,
      userTransactions: currentUserInvestments.transactions,
    });
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
            selectedPage="yourfunds"
          />
          <div className="w-your-funds-page-wrapper">
            <div className="w-your-funds-page-content">
              <Portfolio walletMust={true} />
              <YourInvestmentFunds
                {...this.props}
                yourInvestments={this.state.yourInvestments}
                titleFromParent="YOUR VAULTS"
                addNewFundFromParent={true}
              />
              <YourTransactions
                titleFromParent="TRANSACTIONS"
                transactions={this.state.userTransactions}
                displaySearchBarFromParent={true}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(YourFundsPage);
