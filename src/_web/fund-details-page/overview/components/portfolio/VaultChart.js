import React, { Component } from "react";

// COMPONENTS
import ChartComponent from "./components/ChartComponent";
import WalletNotConnected from "../../../../global/wallet-not-connected/WalletNotConnected";

import ContentLoader from "react-content-loader";

// import { getChartData } from './../../../../../api/statistics';
import { currencyFormat } from "./../../../../../ethereum/utils";
// ASSETS
import greenArrowIcon from "./assets/green-arrow-icon.svg";
import redArrowIcon from './assets/red-arrow-icon.svg';
import separatorIcon from "./assets/separator-icon.svg";
import graph from "./assets/graph.svg";
// CSS
import "./styles/portfolio.css";
import avatar from '../../../../components/DexFundCard/avatar.png';

// REDUX
import { connect } from "react-redux";
import { Twitter } from "react-bootstrap-icons";
import Chart1D from "../../../../global/portfolio/components/Chart1D";
import { chart1d, getChartdata } from "../../../../../sub-graph-integrations";

class VaultChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fundName: props.fundName,
      selectedChart: "1D",
      portfolioTimeframe: "Last day",
      portfolioPercent: "0.00%", // for 1D
      noData: false,
      loading: true,
      selectedData: [],
      ethPrice: props.ethPrice,
      fundAddress: this.props.fundAddress,
      ...props
    };
    console.log('aum: ', this.state.aum)
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
    if (!data.holdingHistory) {
      return 0.00;
    }
    if (nodata) {
      return 0.00;
    }

    const first = data.holdingHistory[0];
    const last = data.holdingHistory[data.holdingHistory.length - 1];
    const increase = first > 0 ? (((last-first)/first)*100).toFixed(2) : 100;
    return increase;
  }

  roundMinutes(date) {

    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

    return date;
  }

  async getChartData() {
    // await this.setState({ loading: true });

    const { selectedChart } = this.state;
    var noData = false;

    const data = await getChartdata(this.state.fundAddress, selectedChart);
    if (!data) {
      noData = true;
    }


    console.log('holdingHistory: ', data.holdingHistory);

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
        <ChartComponent height={this.props.height} width={this.props.width} ethPrice={this.state.ethPrice} data={this.state.selectedData} loading={this.state.loading} noData={this.state.noData} fundName={this.state.fundName}/>
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
      color: "var(--primary-color)",
    };

    return (
      <>
        <div className="w-portfolio-wrapper">
          <div className="fund-header">
            <img src={avatar} className="avatar"/>
            <label className="fund-name">{this.state.fundName}</label>
            <div className="twitter-icon-layout">
              <span>Twitter</span>
              <Twitter size={20} color="#03A9F4"/>
            </div>
          </div>
          <div className="w-portfolio-header">
            <div className="w-portfolio-header-title-section">
              
              <div className="w-portfolio-header-subtitle-section">
                <div className="w-portfolio-header-subtitle">
                  AUM
                </div>
                <div className="w-portfolio-header-subtitle">
                  $ {currencyFormat(this.state.aum)} 
                </div>
                <div className="w-portfolio-header-subtitle">
                  {this.state.portfolioTimeframe}
                </div>
                <img
                src={this.state.portfolioPercent >= 0 ? greenArrowIcon : redArrowIcon}
                alt="green-arrow-icon"
                className="green-arrow-icon"
                />
                <div style={{color: this.state.portfolioPercent >= 0 ? "#25FC02" : "red"}} className="w-portfolio-header-subtitle-percent">
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
        <div className="w-portfolio-content">
          {this.renderWalletConnected()}
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
