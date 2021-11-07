import React, { Component } from "react";
import { currencyFormat, getTimeDiff } from "../../../../../../ethereum/utils";
import { getIconSource } from "../../../../../../icons";

// COMPONENTS
// ...

// ASSETS
import paraswapIcon from "../assets/paraswap-icon.svg";

// CSS
import "../styles/swapsTable.css";

class SwapsTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchange: this.props.trade.exchange,
      price: this.props.trade.price,
      amount: this.props.trade.amount,
      destSymbol: this.props.destSymbol,
      isSelectedPath: this.props.isSelectedPath
    };
  }

  render() {
    const bestPriceStyle = {
      background: "linear-gradient(to right, #E926C3 10%, #FF4D86 100%)",
      "-webkit-background-clip": "text",
      WebkitTextFillColor: "transparent",
    };

    return (
      <>
        <div className={"w-swaps-table-row" + (this.state.isSelectedPath ? "-selected" : "")}>
          <div className="w-swaps-table-row-cell exchange">
            <div className="w-swaps-exchange-cell-section">
              <div className="w-swaps-exchange-cell-text">
              <img className="swap-asset-icon" src={getIconSource(this.state.exchange)} /> {this.state.exchange}
              </div>
            </div>
          </div>
          <div className="w-swaps-table-row-cell price">
            <div className="w-swaps-price-cell-section">
              <div className="w-swaps-price-cell-text">
                {this.state.price.toFixed(8)}
              </div>
            </div>
          </div>
          <div className="w-swaps-table-row-cell price">
            <div className="w-swaps-price-cell-section">
              <div className="w-swaps-price-cell-text">
                <img className="swap-asset-icon" src={getIconSource(this.state.destSymbol)} /> {this.state.amount.toFixed(2)} {this.state.destSymbol}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SwapsTableRow;
