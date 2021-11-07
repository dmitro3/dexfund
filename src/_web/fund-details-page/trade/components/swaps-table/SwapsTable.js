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
      swapTrades: this.props.swapTrades,
      destSymbol: "",
      isLoading: false,
      pathsLoading: this.props.pathsLoading,
      selectedSwapPath: this.props.selectedSwapPath
    };
  }

  async componentDidUpdate() {
    if (this.state.swapTrades != this.props.swapTrades || this.state.pathsLoading != this.props.pathsLoading || this.state.destSymbol != this.props.destSymbol || this.props.selectedSwapPath != this.state.selectedSwapPath) {
      this.setState({ swapTrades: this.props.swapTrades, pathsLoading: this.props.pathsLoading, destSymbol: this.props.destSymbol, selectedSwapPath: this.props.selectedSwapPath })
    }
  }

  loader = () => {
    return <SkeletonLoader rows={4} rowHeight={40} />;
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
            {this.state.pathsLoading
              ? this.loader()
              : (this.state.swapTrades.length > 0
              ? this.state.swapTrades.map((trade) => (
                  <SwapsTableRow
                    trade={trade}
                    destSymbol={this.state.destSymbol}
                    isSelectedPath={this.state.selectedSwapPath == trade}
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
