import React, { Component } from "react";

// COMPONENTS
import ChartComponent from "./components/ChartComponent";
import WalletNotConnected from "../../../../global/wallet-not-connected/WalletNotConnected";

import ContentLoader from "react-content-loader";

import { getChartData } from './../../../../../api/statistics';
// ASSETS
import greenArrowIcon from "./assets/green-arrow-icon.svg";
import redArrowIcon from './assets/red-arrow-icon.svg';
import separatorIcon from "./assets/separator-icon.svg";
import graph from "./assets/graph.svg";
// CSS
import "./styles/portfolio.css";

// REDUX
import { connect } from "react-redux";

class VaultChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChart: "1D",
      portfolioTimeframe: "Last day",
      portfolioPercent: "0.00%", // for 1D
      noData: false,
      loading: true,
      selectedData: [],
      fundAddress: this.props.fundAddress
    };
  }

  componentDidUpdate() {
    if(this.props.fundAddress != this.state.fundAddress) {
      this.setState({
        fundAddress: this.props.fundAddress
      })
    }
  }

  componentDidMount() {
    this.getChartData();
  }

  calculateIncrease = (data, nodata) => {
    if (nodata) {
      return 0.00;
    }

    const first = data[0].sharePrice;
    const last = data[data.length-1].sharePrice;

    return (((last-first)/first)*100).toFixed(2)
  }

  roundMinutes(date) {

    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

    return date;
  }

  async getChartData() {
    // await this.setState({ loading: true });

    const { selectedChart } = this.state;
    const now = Math.floor(this.roundMinutes(new Date()).getTime() / 1000);
    var from;
    var interval;
    var noData = false;
    switch(selectedChart) {
      case "1D":
        from = now-(60*60*24);
        interval = 3600;
        break;
      case "1W":
        from = now-(60*60*24*8);
        interval = 60*60*6;
        break;
      case "1M":
        from = now-(60*60*24*30);
        interval = 60*60*24;
        break;
      case "3M":
        from = now-(60*60*24*30*3);
        interval = 60*60*24*3;
        break;
      case "6M":
        from = now-(60*60*24*30*6);
        interval = 60*60*24*6;
        break;
      case "1Y":
        from = now-(60*60*24*365);
        interval = 60*60*24*15;
        break;
      default:
        from = now-(60*60*24);
        interval = 3600;
        break;
    }

    const data = await getChartData(this.state.fundAddress, from, 0, interval);
    if (data.length < 5) {
      noData = true;
    }

    for(var i = 0; i < data.length; i++) {
      if (data[i].sharePrice == 0) {
        noData = true;
        break;
      }
    }

    const chartIncrease = this.calculateIncrease(data, noData);

    await this.setState({ loading: false, selectedData: data, noData: noData, portfolioPercent: chartIncrease });
  }

  setChartDetails = async (chart, timeframe) => {
    await this.setState({
      selectedChart: chart,
      portfolioTimeframe: timeframe,
      loading: true
    });
    await this.getChartData();
  };

  renderChart() {
    return (
      <>
      <div style={{paddingTop: "2%"}}>
        <ChartComponent data={this.state.selectedData} loading={this.state.loading} noData={this.state.noData} />
      </div>
      </>
    );
  }

  renderLoading() {
    return (
      <div></div>
    )
  }

  renderWalletNotConnected() {
    return (
      <>
        <div className="w-portfolio-wallet-not-connected-wrapper">
          <div className="w-portfolio-header-title-section">
            <div className="w-portfolio-header-title">$0.00</div>
            <div className="w-portfolio-header-subtitle-section">
              <div className="w-portfolio-header-subtitle">Vault Performance</div>
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
                $ {this.props.currentSharePrice} 
              </div>
              <div className="w-portfolio-header-subtitle-section">
                <div className="w-portfolio-header-subtitle">
                  Vault Performance
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
                src={this.state.portfolioPercent >= 0 ? greenArrowIcon : redArrowIcon}
                alt="green-arrow-icon"
                className="green-arrow-icon"
                />
                <div style={{color: this.state.portfolioPercent >= 0 ? "#00AF00" : "red"}} className="w-portfolio-header-subtitle-percent">
                  {this.state.portfolioPercent}%
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
                  this.setChartDetails("1D", "Last day")
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
                  this.setChartDetails("1W", "Last week")
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
                    "Last month"
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
                    "Last 3 months"
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
                    "Last 6 months"
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
                  this.setChartDetails("1Y", "Last year")
                }
              >
                1Y
              </div>
            </div>
          </div>
          {this.renderChart()}
        </div>
      </>
    );
  }

  render() {
    return (
      <>
        <div className="w-portfolio-wrapper">
          <div className="w-portfolio-content">
            {this.renderWalletConnected()}
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

export default connect(mapStateToProps, mapDispatchToProps)(VaultChart);
