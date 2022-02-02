import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import "../styles/yourTransactions.css";

class YourTransactionsTableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="w-your-transactions-table-header">
          <div className="w-your-transactions-table-header-cell newItem">
            Action
          </div>
          {/* <div className="w-your-transactions-table-header-cell token">
            Investor
          </div> */}

          <div className="w-your-transactions-table-header-cell vault">
            Shares
          </div>
          <div className="w-your-transactions-table-header-cell value" style={{flex: 0}}>
            Value($)
          </div>
          <div className="w-your-transactions-table-header-cell time">Date</div>
        </div>
      </>
    );
  }
}

export default YourTransactionsTableHeader;
