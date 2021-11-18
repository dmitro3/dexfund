import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import "../styles/fundDetails.css";

class FundFees extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      managementFee: "0.00",
      performanceFee: "0.00",
      entranceFee: "0.00",
    };
  }

  render() {
    return (
      <>
        <div className="w-fund-info-table">
          {/* <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Management fee</div>
            <div className="w-fund-info-row-cell value">
              {this.props.manageFee.scaledPerSecondRate} %
            </div>
          </div> */}
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Performance fee</div>
            <div className="w-fund-info-row-cell value">
              {this.props.performanceFee.rate} %
            </div>
          </div>
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Entrance fee</div>
            <div className="w-fund-info-row-cell value">
              {this.props.entranceFee.rate} %
            </div>
          </div>
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Minimum Investment Amount</div>
            <div className="w-fund-info-row-cell value">
              {this.props.minimumInvestmentAmount || "-"} {this.props.denominationAssetSymbol || '-'} 
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundFees;
