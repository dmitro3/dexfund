// import { TimerSharp } from '@material-ui/icons';
import React, { Component } from "react";
import { currencyFormat } from "../../../../../../ethereum/utils";

// COMPONENTS
// ...

// ASSETS
import wethIcon from "../assets/weth-icon.svg";

import { getIconSource } from "../../../../../../icons";

// CSS
import "../../../styles/fundOverview.css";

class PerformanceTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: this.props.assetFromParent,
      value: this.props.valueFromParent,
      weight: this.props.weightFromParent,
      amount: this.props.amountFromParent,
      symbol: this.props.symbolFromParent,
      count: this.props.count ? this.props.count : 0,
      urlFromParent: this.props.urlFromParent
    };
  }

  openNewTab(e, url) {
    e.preventDefault();
    window.open(url, "_blank");
  }

  render() {
    return (
      <>
        <div onClick={(e) => this.openNewTab(e, this.state.urlFromParent)} className="w-fund-composition-table-row">
          <div className="w-fund-composition-table-row-cell asset">
            <div className="w-fund-composition-asset-bullet">
              <div
                className="w-fund-composition-asset-bullet-text"
                style={{ marginRight: "10px" }}
              >
                {this.state.symbol}
              </div>
              <img
                style={{ height: "24px", width: "24px" }}
                alt=""
                className="fund-composition-weth-icon"
                src={
                  this.state.symbol
                    ? getIconSource(this.state.symbol.toLowerCase())
                    : wethIcon
                }
              />{" "}
            </div>
          </div>
          <div className="w-fund-composition-table-row-cell value">
            {currencyFormat(this.state.amount, "")}
          </div>
          <div className="w-fund-composition-table-row-cell value">
            {currencyFormat(this.state.value, "$")}
          </div>
          <div className="w-fund-composition-table-row-cell weight">
            {this.state.weight !== "NaN" ? this.state.weight : "0.00"} %
          </div>
        </div>
      </>
    );
  }
}

export default PerformanceTableRow;
