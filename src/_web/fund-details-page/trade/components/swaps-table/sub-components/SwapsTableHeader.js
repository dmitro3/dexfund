import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import "../styles/swapsTable.css";

class SwapsTableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="w-swaps-table-header">
          <div className="w-swaps-table-header-item exchange">Date</div>
          <div className="w-swaps-table-header-item exchange">Exchange</div>
          <div className="w-swaps-table-header-item price">Type</div>
          <div className="w-swaps-table-header-item exchange">From</div>
          <div className="w-swaps-table-header-item exchange">To</div>
        </div>
      </>
    );
  }
}

export default SwapsTableHeader;
