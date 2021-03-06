import React, { Component } from "react";
import { queryFundDetails } from "../../../../../../sub-graph-integrations";

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import "../styles/fundDetails.css";

class FundFactsheets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      creationDate: "",
      manager: "",
      denominationAsset: "",
      ...this.props.state,
    };
  }

  async componentDidMount() {
    let fund = await queryFundDetails(this.state.fundId);
    this.setState({
      name: fund.name,
      creationDate: new Date(1e3 * parseInt(fund.inception)).toDateString(),
      manager: fund.manager.id,
      denominationAsset: fund.accessor.denominationAsset.name,
    });
  }

  displayAddress(address) {
    if (!address) return '';
    return address.slice(0, 6) + '....' + address.slice(-4);
  }

  render() {
    return (
      <>
        <div className="w-fund-info-table">
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Name</div>
            <div className="w-fund-info-row-cell">{this.state.name}</div>
          </div>
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Creation date</div>
            <div className="w-fund-info-row-cell">
              {this.state.creationDate}
            </div>
          </div>
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Manager</div>
            <div
              className="w-fund-info-row-cell"
              style={{ fontSize: "13px", textOverflow:'ellipsis' }}
              title={this.state.manager}
            >
              {this.displayAddress(this.state.manager)}
            </div>
          </div>
          <div className="w-fund-info-table-row">
            <div className="w-fund-info-row-cell type">Denomination asset</div>
            <div className="w-fund-info-row-cell">
              {this.state.denominationAsset}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundFactsheets;
