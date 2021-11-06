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
      exchange: this.props.exchangeFromParent,
      price: this.props.priceFromParent,
      amount: this.props.amountFromParent,
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
              <div className="w-swaps-exchange-cell-text">
                {this.state.exchangeFromParent}
              </div>
            </div>
          </div>
          <div className="w-swaps-table-row-cell price">
            <div className="w-swaps-exchange-cell-section">
              <div className="w-swaps-exchange-cell-text">
                {this.state.priceFromParent}
              </div>
            </div>
          </div>
          <div className="w-swaps-table-row-cell amount">
            <div className="w-swaps-exchange-cell-section">
              <div className="w-swaps-exchange-cell-text">
                {this.state.amountFromParent}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SwapsTableRow;
