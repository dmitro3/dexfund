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
    console.log(this.props.trade);
    this.state = {
      exchange: this.props.exchangeFromParent,
      trade: this.props.trade,
      method: this.props.method,
      price: this.props.priceFromParent,
      amount: this.props.amountFromParent,
      symbol: this.props.symbolFromParent,
      vsReference: this.props.vsReferenceFromParent,
      vsBestPrice: this.props.vsBestPriceFromParent,
    };
  }

  getTradeType(method) {
    let type = "";
    switch (method) {
      case "TAKE_ORDER":
        type = "SWAP";
        break;
      case "REDEEM":
        type = "WITHDRAW";
        break;
      default:
        type = method.split("_").join(" ");
    }
    return type;
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
                {getTimeDiff(parseInt(this.state.trade.timestamp) * 1000)}
              </div>
            </div>
          </div>
          <div className="w-swaps-table-row-cell price">
            {this.state.exchange}
          </div>
          <div className="w-swaps-table-row-cell amount">
            {this.getTradeType(this.state.trade.method)}
          </div>
          <div className="w-swaps-table-row-cell vs-reference">
            <div
              className="w-fund-composition-asset-bullet"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div
                className="w-fund-composition-asset-bullet-text"
                style={{ marginRight: "10px" }}
              >
                {this.state.trade.outgoingAssetAmount.asset.symbol}
              </div>
              <div>
                {" "}
                {currencyFormat(
                  this.state.trade.outgoingAssetAmount.amount,
                  ""
                )}{" "}
              </div>
              <img
                style={{ height: "24px", width: "24px" }}
                alt=""
                className="fund-composition-weth-icon"
                src={
                  this.state.trade.outgoingAssetAmount.asset.symbol
                    ? getIconSource(
                        this.state.trade.outgoingAssetAmount.asset.symbol.toLowerCase()
                      )
                    : paraswapIcon
                }
              />{" "}
            </div>
          </div>
          <div className="w-swaps-table-row-cell vs-best-price">
            <div
              className="w-fund-composition-asset-bullet"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div
                className="w-fund-composition-asset-bullet-text"
                style={{ marginRight: "10px" }}
              >
                {this.state.trade.incomingAssetAmount.asset.symbol}
              </div>
              <div>
                {" "}
                {currencyFormat(
                  this.state.trade.incomingAssetAmount.amount,
                  ""
                )}{" "}
              </div>
              <img
                style={{ height: "24px", width: "24px" }}
                alt=""
                className="fund-composition-weth-icon"
                src={
                  this.state.trade.incomingAssetAmount.asset.symbol
                    ? getIconSource(
                        this.state.trade.incomingAssetAmount.asset.symbol.toLowerCase()
                      )
                    : paraswapIcon
                }
              />{" "}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SwapsTableRow;
