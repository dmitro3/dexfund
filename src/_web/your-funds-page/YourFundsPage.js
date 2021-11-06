import React, { Component } from "react";
import { connect } from "react-redux";

// COMPONENTS
import Header from "../global/header/Header";
import SettingsPopup from "../global/settings-popup/SettingsPopup";
import Portfolio from "../global/portfolio/Portfolio";
import YourInvestmentFunds from "../global/your-investment-funds/YourInvestmentFunds";
import YourVaults from "../global/your-investment-funds/YourVault";
import YourTransactions from "../global/your-transactions/YourTransactions";

// ASSETS
// ...

// CSS
import "./yourFundsPage.css";
import {
  currentUserAllTransactions,
  currentUserVaults,
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
      userFunds: [],
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
      this.props.onboard.address
    );

    const funds = await currentUserVaults(this.props.onboard.address);

    this.setState({
      yourInvestments: yourInvestments,
      userTransactions: currentUserInvestments.transactions,
      userFunds: funds,
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
              {/* <Portfolio walletMust={true} /> */}
              <YourVaults
                {...this.props}
                yourInvestments={this.state.userFunds}
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
