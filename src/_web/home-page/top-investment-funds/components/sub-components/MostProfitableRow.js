import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
import { getIconSource } from "../../../../../icons";
import wethicon from "./../../assets/weth-icon.svg";

// CSS
import "../../styles/topInvestmentFunds.css";

class MostProfitableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      fundNo: this.props.fundNoFromParent,
      fundName: this.props.fundNameFromParent,
      fundAsset: this.props.fundAssetFromParent,
      fundPerformance: this.props.fundPerformance,
      aum: this.props.AUM,
      createTime: this.props.createTime
    };
  }

  toPage(e, path) {
    e.preventDefault();
    this.props.history.push(path);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  nFormatter(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "K" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    // for negative value is work
    for (i = si.length - 1; i > 0; i--) {
      if (Math.abs(num) >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

  renderPerformance() {
    return (<div
      className="w-profitable-funds-card-performance"
      style={{color: this.state.fundPerformance > 0 ? "#00AF00" : 'red' }}
    >
      {this.state.fundPerformance.toFixed(2)}%
    </div>)
  }

  renderAUM() {
    return (<div
      className="w-profitable-funds-card-performance"
    >
      $ {this.nFormatter(this.state.aum, 1)}
    </div>)
  }

  renderTime() {
    return (<div
      className="w-profitable-funds-card-performance"
    >
      {new Date(this.state.createTime*1000).toDateString()}
    </div>)
  }

  render() {
    return (
      <>
        <div
          className="w-profitable-funds-card-row"
          onClick={(e) =>
            this.props.history.push("/fund/" + this.state.id, {
              fundName: this.state.findName,
            })
          }
        >
          <div className="w-profitable-funds-card-details-section">
          {/* <div className="w-profitable-funds-card-asset-bullet"> */}
              <img
                style={{ height: "24px", width: "24px" }}
                alt="weth-icon"
                className="profitable-funds-card-weth-icon"
                src={
                  this.state.fundAsset
                    ? getIconSource(this.state.fundAsset.toLowerCase())
                    : wethicon
                }
              />{" "}
              {/* <div className="w-profitable-funds-card-asset-bullet-text">
                {this.state.fundAsset}
              </div> */}
            {/* </div> */}
            <div className="w-profitable-funds-card-details">
              {this.state.fundNo}. {this.state.fundName}
            </div>
          </div>
          {this.state.fundPerformance !== null && typeof(this.state.fundPerformance) !== 'undefined' && this.renderPerformance()}
          {this.state.aum !== null && typeof(this.state.aum) !== 'undefined' && this.renderAUM()}
          {this.state.createTime !== null && typeof(this.state.createTime) !== 'undefined' && this.renderTime()}
        </div>
      </>
    );
  }
}

export default MostProfitableRow;
