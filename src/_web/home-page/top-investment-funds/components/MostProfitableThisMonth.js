import React, { Component } from "react";

// COMPONENTS
import MostProfitableRow from "./sub-components/MostProfitableRow";

// ASSETS
// ...

// CSS
import "../styles/topInvestmentFunds.css";

class MostProfitableThisMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
            <div className="w-profitable-funds-card-title">
              LARGEST AUM
            </div>
            <div
              onClick={(e) => this.toPage(e, "/vaults")}
              className="w-profitable-funds-card-see-all"
            >
              See all
            </div>
          </div>
          {this.props.investments.map((item, index) => (
            <MostProfitableRow
              key={index}
              {...this.props}
              id={item.id}
              fundNoFromParent={index + 1}
              fundNameFromParent={item.name}
              fundAssetFromParent={item.accessor.denominationAsset.symbol}
              AUM={item.currentAUM}
            />
          ))}
        </div>
      </>
    );
  }
}

export default MostProfitableThisMonth;
