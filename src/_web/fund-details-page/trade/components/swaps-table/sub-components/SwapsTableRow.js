import React, { Component } from "react";

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
      exchange: this.props.exchangeFromParent,
      price: this.props.priceFromParent,
      amount: this.props.amountFromParent,
      symbol: this.props.symbolFromParent,
      vsReference: this.props.vsReferenceFromParent,
      vsBestPrice: this.props.vsBestPriceFromParent,
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
        <div className="w-swaps-table-row">
          <div className="w-swaps-table-row-cell exchange">
            <div className="w-swaps-exchange-cell-section">
              {/* <img src={paraswapIcon} alt='paraswap-icon' className="swap-paraswap-icon" /> */}
              <div className="w-swaps-exchange-cell-text">
                {this.state.exchange}
              </div>
            </div>
          </div>
          <div className="w-swaps-table-row-cell price">
            {this.state.price} WETH
          </div>
          <div className="w-swaps-table-row-cell amount">
            {this.state.amount} {this.state.symbol}
          </div>
          <div
            className="w-swaps-table-row-cell vs-reference"
            style={{ color: "#00AF00" }}
          >
            {this.state.vsReference}
          </div>
          <div
            className="w-swaps-table-row-cell vs-best-price"
            style={
              this.state.vsBestPrice === "Best price"
                ? bestPriceStyle
                : { color: "#FD0000" }
            }
          >
            {this.state.vsBestPrice}
          </div>
        </div>
      </>
    );
  }
}

export default SwapsTableRow;
