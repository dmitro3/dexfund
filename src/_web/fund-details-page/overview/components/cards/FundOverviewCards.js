import React, { Component } from "react";
import { getIconSource } from "../../../../../icons";
// import { queryFundOverviewDetails } from "../../../../../sub-graph-integrations/assets-and-adapters";

// COMPONENTS
// ...

// ASSETS
import wethIcon from "../../assets/weth-icon.svg";

// CSS
import "../../styles/fundOverview.css";

import { currencyFormat } from "./../../../../../ethereum/utils";
class FundOverviewCards extends Component {
  constructor(props) {
    super(props);
    // TODO
    // AUM, lifetimeReturn
    this.state = {
      AUM: 10,
      depositors: 0,
      lifetimeReturn: "0.00",
      ...this.props.state,
    };
  }

  render() {
    return (
      <>
        <div className="w-fund-overview-cards-wrapper">
          <div className="w-fund-overview-cards-content">
            <div className="w-fund-overview-card">
              <div className="w-fund-overview-card-value">
                ${currencyFormat(this.state.AUM)}
              </div>
              <div className="w-fund-overview-card-type">AUM</div>
            </div>
            <div className="w-fund-overview-card">
              <div className="w-fund-overview-card-value">
                {this.props.state.depositors}
              </div>
              <div className="w-fund-overview-card-type">Depositors</div>
            </div>
            <div className="w-fund-overview-card">
              <div style={{color: this.state.lifetimeReturn >= 0 ? "#00AF00" : "red"}} className="w-fund-overview-card-value">
                {this.state.lifetimeReturn.toFixed(2)}%
              </div>
              <div className="w-fund-overview-card-type">Lifetime return</div>
            </div>
            <div className="w-fund-overview-card">
              <div className="w-fund-overview-card-value-section">
                <img
                  src={getIconSource(this.props.state.denominationAssetSymbol)}
                  alt="icon"
                  className="fund-overview-weth-icon"
                />
                <div className="w-fund-overview-card-value">
                  {this.props.state.denominationAssetSymbol}
                </div>
              </div>
              <div className="w-fund-overview-card-type">
                Denomination Asset
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundOverviewCards;
