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
      exchange: "Paraswap",
      price1: "$2,000.00",
      amount1: "2,000.00 WETH",
      vsReference1: "+10%",
      vsBestPrice1: "Best price",

      exchange2: "Paraswap",
      price2: "$2,000.00",
      amount2: "2,000.00 WETH",
      vsReference2: "+10%",
      vsBestPrice2: "-21.31%",

      swapTrades: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const swapTrades = await getFundSwapTrades(this.props.state.fundId);

    this.setState({
      ...this.state,
      swapTrades,
      isLoading: false,
    });
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
        There are not trades
      </div>
    );
  }

  render() {
    return (
      <>
        <div className="w-swaps-table">
          <SwapsTableHeader />
          <div style={{ overflowY: "scroll", height: "60vh" }}>
            {this.state.isLoading
              ? this.renderLoading()
              : this.state.swapTrades.length > 0
              ? this.state.swapTrades.map((trade, i) => (
                  <SwapsTableRow
                    key={i}
                    exchangeFromParent={trade.adapter.identifier}
                    priceFromParent={trade.incomingAssetAmount.price.price}
                    amountFromParent={currencyFormat(
                      trade.incomingAssetAmount.amount
                    )}
                    symbolFromParent={trade.incomingAssetAmount.asset.symbol}
                    vsReferenceFromParent="0.00%"
                    vsBestPriceFromParent="0.00%"
                  />
                ))
              : this.recordNotFound()}
          </div>
        </div>
      </>
    );
  }
}

export default SwapsTable;
