import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import "../styles/yourTransactions.css";

class FundTransactionsTableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="w-your-transactions-table-header">
          <div className="w-your-transactions-table-header-cell action">
            Action
          </div>
          <div className="w-your-transactions-table-header-cell token">
            From/ To
          </div>
          <div className="w-your-transactions-table-header-cell time">
            Shares
          </div>
          <div className="w-your-transactions-table-header-cell value">
            Value($)
          </div>
          <div className="w-your-transactions-table-header-cell time">Date</div>
        </div>
      </>
    );
  }
}

export default FundTransactionsTableHeader;
