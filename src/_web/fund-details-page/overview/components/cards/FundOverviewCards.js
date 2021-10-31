import React, { Component } from "react";
import { getIconSource } from "../../../../../icons";
import { queryFundOverviewDetails } from "../../../../../sub-graph-integrations/assets-and-adapters";

// COMPONENTS
// ...

// ASSETS
import wethIcon from "../../assets/weth-icon.svg";

// CSS
import "../../styles/fundOverview.css";

class FundOverviewCards extends Component {
  constructor(props) {
    super(props);
    // TODO
    // AUM, lifetimeReturn
    this.state = {
      AUM: 10,
      depositors: 0,
      lifetimeReturn: "0.00",
      denominationAssetSymbol: "",
      denominationAssetName: "",
      ...this.props.state,
    };
  }

  async componentDidMount() {
    let overview = await queryFundOverviewDetails(this.state.fundId);
    this.setState({
      depositors: overview.investmentCount,
      denominationAssetSymbol: overview.accessor.denominationAsset.symbol,
      denominationAssetName: overview.accessor.denominationAsset.name,
    });
  }

  render() {
    // var width = window.innerWidth;

    return (
      <>
        <div className="w-fund-overview-cards-wrapper">
          <div className="w-fund-overview-cards-content">
            <div className="w-fund-overview-card">
              <div className="w-fund-overview-card-value">
                ${this.state.AUM}
              </div>
              <div className="w-fund-overview-card-type">AUM</div>
            </div>
            <div className="w-fund-overview-card">
              <div className="w-fund-overview-card-value">
                {this.state.depositors}
              </div>
              <div className="w-fund-overview-card-type">Depositors</div>
            </div>
            <div className="w-fund-overview-card">
              <div className="w-fund-overview-card-value">
                {this.state.lifetimeReturn}%
              </div>
              <div className="w-fund-overview-card-type">Lifetime return</div>
            </div>
            <div className="w-fund-overview-card">
              <div className="w-fund-overview-card-value-section">
                <img
                  src={getIconSource(this.state.denominationAssetSymbol)}
                  alt="icon"
                  className="fund-overview-weth-icon"
                />
                <div className="w-fund-overview-card-value">
                  {this.state.denominationAssetSymbol}
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
