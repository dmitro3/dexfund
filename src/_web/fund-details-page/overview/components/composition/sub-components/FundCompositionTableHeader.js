// import { TimerSharp } from '@material-ui/icons';
import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import "../../../styles/fundOverview.css";

class PerformanceTableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="w-fund-composition-table-header">
          <div className="w-fund-composition-table-header-item asset">
            Asset
          </div>
          <div className="w-fund-composition-table-header-item value">
            Amount (WETH)
          </div>

          <div className="w-fund-composition-table-header-item value">
            Value($)
          </div>
          <div className="w-fund-composition-table-header-item weight">
            Weight
          </div>
        </div>
      </>
    );
  }
}

export default PerformanceTableHeader;
