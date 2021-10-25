import React, { Component } from "react";

// COMPONENTS
import Header from "../global/header/Header";
import SettingsPopup from "../global/settings-popup/SettingsPopup";
import FundOverview from "./overview/FundOverview";
import FundTrade from "./trade/FundTrade";
import FundProviderLiquidity from "./provide-liquidity/FundProvideLiquidity";
import FundStake from "./stake/FundStake";
import FundYield from "./yield/FundYield";
import FundReward from "./rewards/FundRewards";
import FundSettings from "./settings/FundSettings";
// ASSETS
// ...

// CSS
import "./fundDetailsPage.css";

class FundDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNavbarItem: "overview",

      sidebar: false,
      settingsPopup: false,
      fundId: this.props.match.params.address,
    };
  }

  displaySettingsPopup = () => {
    this.setState({ settingsPopup: true });
  };

  closeSettingsPopup = () => {
    this.setState({ settingsPopup: false });
  };

  renderOverview() {
    return (
      <>
        <FundOverview state={this.state} />
      </>
    );
  }

  renderTrade() {
    return (
      <>
        <FundTrade />
      </>
    );
  }

  renderProvideLiquidity() {
    return (
      <>
        <FundProviderLiquidity />
      </>
    );
  }

  renderStake() {
    return (
      <>
        <FundStake />
      </>
    );
  }

  renderYield() {
    return (
      <>
        <FundYield />
      </>
    );
  }

  renderRewards() {
    return (
      <>
        <FundReward />
      </>
    );
  }

  renderSettings() {
    return (
      <>
        <FundSettings />
      </>
    );
  }

  render() {
    var width = window.innerWidth;

    const doNotDisplay = {
      display: "none",
    };

    const selectedNavbarItemStyle = {
      background: "linear-gradient(to right, #E926C3 10%, #FF4D86 100%)",
      "-webkit-background-clip": "text",
      WebkitTextFillColor: "transparent",
    };

    if (width > 1000) {
      return (
        <>
          <Header
            {...this.props}
            displaySettingsPopupEvent={this.displaySettingsPopup}
          />
          <div className="w-fund-details-page-wrapper">
            <div className="w-fund-details-page-content">
              <div className="w-fund-details-page-title">
                {this.props.location.state.fundName}
              </div>
              <div className="w-fund-details-page-navbar">
                <div
                  className="w-fund-details-page-navbar-item"
                  style={
                    this.state.selectedNavbarItem === "overview"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  onClick={() =>
                    this.setState({ selectedNavbarItem: "overview" })
                  }
                >
                  Overview
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  style={
                    this.state.selectedNavbarItem === "trade"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  onClick={() => this.setState({ selectedNavbarItem: "trade" })}
                >
                  Trade
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  style={
                    this.state.selectedNavbarItem === "provideLiquidity"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  onClick={() =>
                    this.setState({ selectedNavbarItem: "provideLiquidity" })
                  }
                >
                  Provide liquidity
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  style={
                    this.state.selectedNavbarItem === "stake"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  onClick={() => this.setState({ selectedNavbarItem: "stake" })}
                >
                  Stake
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  style={
                    this.state.selectedNavbarItem === "yield"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  onClick={() => this.setState({ selectedNavbarItem: "yield" })}
                >
                  Yield
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  style={
                    this.state.selectedNavbarItem === "rewards"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  onClick={() =>
                    this.setState({ selectedNavbarItem: "rewards" })
                  }
                >
                  Rewards
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  style={
                    this.state.selectedNavbarItem === "settings"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  onClick={() =>
                    this.setState({ selectedNavbarItem: "settings" })
                  }
                >
                  Settings
                </div>
              </div>
              {this.state.selectedNavbarItem === "overview" &&
                this.renderOverview()}
              {this.state.selectedNavbarItem === "provideLiquidity" &&
                this.renderProvideLiquidity()}
              {this.state.selectedNavbarItem === "trade" && this.renderTrade()}
              {this.state.selectedNavbarItem === "stake" && this.renderStake()}
              {this.state.selectedNavbarItem === "yield" && this.renderYield()}
              {this.state.selectedNavbarItem === "rewards" &&
                this.renderRewards()}
              {this.state.selectedNavbarItem === "settings" &&
                this.renderSettings()}
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

export default FundDetailsPage;
