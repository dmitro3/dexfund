import React, { Component } from "react";
import { queryFundFinancials } from "../../../../../../sub-graph-integrations";

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import "../styles/fundDetails.css";

class FundFinancials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state,
      shareSupply: "0",
      sharePrice: "0",
      denominationAsset: "",
    };
  }

  async componentDidMount() {
    let fund = await queryFundFinancials(this.props.state.fundId);
    this.setState({
      shareSupply: fund.shares.totalSupply,
      denominationAsset: fund.accessor.denominationAsset.symbol,
    });
  }

  render() {
    return (
      <>
        <div className="w-fund-info-table">
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Share supply</div>
            <div className="w-fund-info-row-cell value">
              {parseFloat(this.state.shareSupply).toFixed(2)} shares
            </div>
          </div>
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Share price</div>
            <div className="w-fund-info-row-cell value">
              ${parseFloat(this.state.currentSharePrice || 0).toFixed(2)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundFinancials;
