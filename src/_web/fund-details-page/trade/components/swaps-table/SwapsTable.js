import React, { Component } from "react";

// COMPONENTS
import SwapsTableHeader from "./sub-components/SwapsTableHeader";
import SwapsTableRow from "./sub-components/SwapsTableRow";

// ASSETS
// ...

// CSS
import "./styles/swapsTable.css";
import { getFundSwapTrades } from "../../../../../sub-graph-integrations/trades";
import { currencyFormat } from "../../../../../ethereum/utils";
import SkeletonLoader from "../../../../global/skeleton-loader/SkeletonLoader";

class SwapsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swapTrades: [{
        exchange: "Paraswap",
        price: 0.18,
        amount: 2000
      }],
      isLoading: false,
    };
  }

  async componentDidMount() {

  }

  loader = () => {
    return <SkeletonLoader rows={40} rowHeight={40} />;
  };

  renderLoading() {
    return (
      <div style={{ paddingTop: "2%", height: "5%" }}>{this.loader()}</div>
    );
  }

  recordNotFound() {
    return (
      <div className="w-your-investments-table-row-no-data">
        No trade paths found
      </div>
    );
  }

  render() {
    return (
      <>
        <div className="w-swaps-table">
          <SwapsTableHeader />
          <div
            style={{
              overflowY: "scroll",
              height: this.state.swapTrades.length > 0 ? "40vh" : "10vh",
            }}
          >
            {this.state.isLoading
              ? this.renderLoading()
              : (this.state.swapTrades.length > 0
              ? this.state.swapTrades.map((trade, i) => (
                  <SwapsTableRow
                    exchangeFromParent={trade.exchange}
                    priceFromParent={trade.price}
                    amountFromParent={trade.amount}
                  />
                ))
              : this.recordNotFound())}
          </div>
        </div>
      </>
    );
  }
}

export default SwapsTable;
