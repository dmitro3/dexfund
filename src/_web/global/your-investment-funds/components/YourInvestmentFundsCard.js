import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
import greenArrowIcon from "../assets/green-arrow-icon.svg";
import chartIcon from "../assets/chart-icon.svg";

// CSS
import "../styles/yourInvestmentFunds.css";
import { currencyFormat } from "../../../../ethereum/utils";

class YourInvestmentsCard extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      fundAddress: this.props.fundAddressFromParent,
      funds: this.props.fundsFromParent,
      performance: this.props.performanceFromParent,
      fundName: this.props.fundNameFromParent,
      sharePriceChartData: this.props.sharePriceChartDataFromParent,
    };
  }

  toPage(address, params) {
    this.props.history.push("/fund/" + address, params);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  render() {
    var fundAddress = this.state.fundAddress;
    var fundName = this.state.fundName;

    return (
      <>
        <div
          className="w-your-investments-card"
          onClick={() =>
            this.toPage(fundAddress, {
              fundName,
            })
          }
        >
          <div className="w-your-investments-card-line first">
            <div>
              <div className="w-your-investments-type">Funds</div>
              <div className="w-your-investments-value">
                {currencyFormat(this.state.funds, "$")}
              </div>
            </div>
            <div>
              <div className="w-your-investments-type right">Performance</div>
              <div className="w-your-investments-performance-section">
                <img
                  src={greenArrowIcon}
                  alt="green-arrow-icon"
                  className="performance-green-arrow-icon"
                />
                <div className="w-your-investments-value green">
                  {this.state.performance > 0
                    ? currencyFormat(this.state.performance, "")
                    : "0.00"}
                  %
                </div>
              </div>
            </div>
          </div>
          <div className="w-your-investments-card-line second">
            <div className="w-your-investments-value fund-name">
              {this.state.fundName}
            </div>
            <div>
              <div className="w-your-investments-type right">Share Price</div>
              <div className="w-your-investments-performance-section">
                <div className="w-your-investments-value green">*chart*</div>
              </div>
              <img src={chartIcon} alt="chart-icon" className="chart-icon" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default YourInvestmentsCard;
