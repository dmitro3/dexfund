import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import "../styles/fundDetails.css";

class FundRuleset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumDeposit: "1.00 WETH",
      maximumDeposit: "10.00 WETH",
    };
  }

  render() {
    return (
      <>
        <div className="w-fund-info-table">
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Minimum deposit</div>
            <div className="w-fund-info-row-cell value">
              {this.props.policy.minInvestmentAmount}{" "}
              {this.props.policy.fund
                ? this.props.policy.fund.accessor.denominationAsset.symbol
                : "--"}
            </div>
          </div>
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Maximum deposit</div>
            <div className="w-fund-info-row-cell value">
              {this.props.policy.maxInvestmentAmount}{" "}
              {this.props.policy.fund
                ? this.props.policy.fund.accessor.denominationAsset.symbol
                : "--"}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundRuleset;
