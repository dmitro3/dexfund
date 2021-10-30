import React, { Component } from "react";

//REDUX
import { connect } from "react-redux";
import {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
} from "./../../redux/actions/LoaderAction";

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

  async componentDidMount() {
    // this.props.activateLoaderOverlay()
    await this.setState({ isLoaded: false });
    var investments = await getAllInvestments();
    investments = investments.filter((v) => {
      return !configs.BLACKLISTED_VAULTS.includes(v.id.toLowerCase());
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
      return this.props.onboard.walletConnected ? (
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
      ) : (
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
            <div
              className="w-your-funds-page-content"
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <WalletNotConnected textFromParent="to view Vault Page" />
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
