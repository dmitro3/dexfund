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
    this.state = {
      managementFee: "1",
      performanceFee: "1",
      entranceFee: "1",
    };
  }

  render() {
    return (
      <>
        <div className="w-fund-info-table">
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Management fee</div>
            <div className="w-fund-info-row-cell value">
              {this.state.managementFee}%
            </div>
          </div>
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Performance fee</div>
            <div className="w-fund-info-row-cell value">
              {this.state.performanceFee}%
            </div>
          </div>
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Entrance fee</div>
            <div className="w-fund-info-row-cell value">
              {this.state.entranceFee}%
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundFees;
