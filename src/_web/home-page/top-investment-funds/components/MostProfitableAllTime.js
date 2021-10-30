import React, { Component } from "react";

// COMPONENTS
import MostProfitableRow from "./sub-components/MostProfitableRow";

// ASSETS
// ...

// CSS
import "../styles/topInvestmentFunds.css";

class MostProfitableAllTime extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);

    this.state = {};

    this.toPage = this.toPage.bind(this);
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

  render() {
    return (
      <>
        <div className="w-profitable-funds-card">
          <div className="w-profitable-funds-card-header">
            <div className="w-profitable-funds-card-title">MOST PROFITABLE</div>
            <div
              onClick={(e) => this.toPage(e, "/vaults")}
              className="w-profitable-funds-card-see-all"
            >
              See all
            </div>
          </div>
          {this.props.investments.map((item, index) => (
            <MostProfitableRow
              fundNoFromParent={index + 1}
              fundNameFromParent={item.name}
              fundAssetFromParent={item.accessor.denominationAsset.symbol}
              fundPerformanceFromParent="na%"
            />
          ))}
        </div>
      </>
    );
  }
}

export default MostProfitableAllTime;
