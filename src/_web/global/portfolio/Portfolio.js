import React, { Component } from "react";

// COMPONENTS
import Chart1D from "./components/Chart1D";
import Chart1W from "./components/Chart1W";
import Chart1M from "./components/Chart1M";
import Chart3M from "./components/Chart3M";
import Chart6M from "./components/Chart6M";
import Chart1Y from "./components/Chart1Y";
import WalletNotConnected from "../wallet-not-connected/WalletNotConnected";

// ASSETS
import greenArrowIcon from "./assets/green-arrow-icon.svg";
import separatorIcon from "./assets/separator-icon.svg";
import graph from "./assets/graph.svg";
// CSS
import "./styles/portfolio.css";

// REDUX
import { connect } from "react-redux";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChart: "1D",
      portfolioTimeframe: "Last day",
      portfolioPercent: "0.00%", // for 1D

      percent_1D: "0.00%",
      percent_1W: "0.00%",
      percent_1M: "0.00%",
      percent_3M: "0.00%",
      percent_6M: "0.00%",
      percent_1Y: "0.00%",
      walletMust: this.props.walletMust,
    };
  }

  setChartDetails = (chart, timeframe, percent) => {
    this.setState({
      selectedChart: chart,
      portfolioTimeframe: timeframe,
      portfolioPercent: percent,
    });
  };

  render1DChart() {
    return (
      <>
        <Chart1D />
      </>
    );
  }

  render1WChart() {
    return (
      <>
        <Chart1W />
      </>
    );
  }

  render1MChart() {
    return (
      <>
        <Chart1M />
      </>
    );
  }

  render3MChart() {
    return (
      <>
        <Chart3M />
      </>
    );
  }

  render6MChart() {
    return (
      <>
        <Chart6M />
      </>
    );
  }

  render1YChart() {
    return (
      <>
        <Chart1Y />
      </>
    );
  }

  renderWalletNotConnected() {
    return (
      <>
        <div className="w-portfolio-wallet-not-connected-wrapper">
          <div className="w-portfolio-header-title-section">
            <div className="w-portfolio-header-title">$0.00</div>
            <div className="w-portfolio-header-subtitle-section">
              <div className="w-portfolio-header-subtitle">Your portfolio</div>
              <img
                src={separatorIcon}
                alt="separator-icon"
                className="separator-icon"
              />
              <div className="w-portfolio-header-subtitle">Last day</div>
              <img
                src={greenArrowIcon}
                alt="green-arrow-icon"
                className="green-arrow-icon"
              />
              <div className="w-portfolio-header-subtitle-percent">0.00%</div>
            </div>
          </div>
          <img
            src={graph}
            alt="graph-wallet-not-connected"
            className="w-portfolio-wallet-not-connected-image"
          />
          <div className="w-portfolio-wallet-not-connected-section">
            <WalletNotConnected
              {...this.props}
              textFromParent="to view this data."
            />
          </div>
        </div>
      </>
    );
  }

  renderWalletConnected() {
    const selectedMenuItem = {
      color: "#fff",
    };

    return (
      <>
        <div className="w-portfolio-wrapper">
          <div className="w-portfolio-header">
            <div className="w-portfolio-header-title-section">
              <div className="w-portfolio-header-title">
                {this.props.currentSharePrice} {this.props.state.denominationAssetSymbol}
              </div>
              <div className="w-portfolio-header-subtitle-section">
                <div className="w-portfolio-header-subtitle">
                  Your portfolio
                </div>
                <img
                  src={separatorIcon}
                  alt="separator-icon"
                  className="separator-icon"
                />
                <div className="w-portfolio-header-subtitle">
                  {this.state.portfolioTimeframe}
                </div>
                <img
                  src={greenArrowIcon}
                  alt="green-arrow-icon"
                  className="green-arrow-icon"
                />
                <div className="w-portfolio-header-subtitle-percent">
                  {this.state.portfolioPercent}
                </div>
              </div>
            </div>
            <div className="w-portfolio-charts-menu">
              <div
                className="w-portfolio-charts-menu-item"
                style={
                  this.state.selectedChart === "1D" ? selectedMenuItem : {}
                }
                onClick={() =>
                  this.setChartDetails("1D", "Last day", this.state.percent_1D)
                }
              >
                1D
              </div>
              <div
                className="w-portfolio-charts-menu-item"
                style={
                  this.state.selectedChart === "1W" ? selectedMenuItem : {}
                }
                onClick={() =>
                  this.setChartDetails("1W", "Last week", this.state.percent_1W)
                }
              >
                1W
              </div>
              <div
                className="w-portfolio-charts-menu-item"
                style={
                  this.state.selectedChart === "1M" ? selectedMenuItem : {}
                }
                onClick={() =>
                  this.setChartDetails(
                    "1M",
                    "Last month",
                    this.state.percent_1M
                  )
                }
              >
                1M
              </div>
              <div
                className="w-portfolio-charts-menu-item"
                style={
                  this.state.selectedChart === "3M" ? selectedMenuItem : {}
                }
                onClick={() =>
                  this.setChartDetails(
                    "3M",
                    "Last 3 months",
                    this.state.percent_3M
                  )
                }
              >
                3M
              </div>
              <div
                className="w-portfolio-charts-menu-item"
                style={
                  this.state.selectedChart === "6M" ? selectedMenuItem : {}
                }
                onClick={() =>
                  this.setChartDetails(
                    "6M",
                    "Last 6 months",
                    this.state.percent_6M
                  )
                }
              >
                6M
              </div>
              <div
                className="w-portfolio-charts-menu-item"
                style={
                  this.state.selectedChart === "1Y" ? selectedMenuItem : {}
                }
                onClick={() =>
                  this.setChartDetails("1Y", "Last year", this.state.percent_1Y)
                }
              >
                1Y
              </div>
            </div>
          </div>
          {this.state.selectedChart === "1D" && this.render1DChart()}
          {this.state.selectedChart === "1W" && this.render1WChart()}
          {this.state.selectedChart === "1M" && this.render1MChart()}
          {this.state.selectedChart === "3M" && this.render3MChart()}
          {this.state.selectedChart === "6M" && this.render6MChart()}
          {this.state.selectedChart === "1Y" && this.render1YChart()}
        </div>
      </>
    );
  }

  render() {
    return (
      <>
        <div className="w-portfolio-wrapper">
          <div className="w-portfolio-content">
            {(this.props.onboard.walletConnected ||
              this.state.walletMust === false) &&
              this.renderWalletConnected()}
            {!this.props.onboard.walletConnected &&
              this.state.walletMust === true &&
              this.renderWalletNotConnected()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
