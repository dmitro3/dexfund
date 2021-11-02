import React, { Component } from "react";
import { getEthPrice } from "../../../../ethereum/funds/fund-related";
import { currencyFormat, getTimeDiff } from "../../../../ethereum/utils";
import { getIconSource } from "../../../../icons";

// COMPONENTS
// ...

// ASSETS
import addIcon from "../assets/add-icon.svg";
import minusIcon from "../assets/minus-icon.svg";
import wethIcon from "../assets/weth-icon.svg";

// CSS
import "../styles/yourTransactions.css";

class YourTransactionsTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedValue: this.props.searchedValueFromParent,
      ethPrice: 1,
    };
  }

  async componentDidMount() {
    this.setState({
      ethPrice: await getEthPrice(),
    });
  }
  render() {
    return (
      <>
        <div className="w-your-transactions-table-row">
          <div className="w-your-transactions-table-cell newItem">
            <div className="w-your-transactions-action-section">
              <img
                src={
                  this.props.transaction.type === "INVEST" ? addIcon : minusIcon
                }
              />
              <div className="w-your-transactions-action-text">
                {this.props.transaction.type}
              </div>
            </div>
          </div>

          <div className="w-your-transactions-table-cell token">
            {this.props.transaction.investor}
          </div>

          <div className="w-your-transactions-table-cell vault">
            {currencyFormat(this.props.transaction.shares)}
          </div>

          <div className="w-your-transactions-table-cell value">
            <div
              className="w-investment-funds-token-bullet"
              style={{ textAlign: "left" }}
            >
              <img
                style={{ height: "24px", width: "24px" }}
                alt=""
                className="fund-composition-weth-icon"
                src={
                  this.props.transaction.symbol
                    ? getIconSource(this.props.transaction.symbol.toLowerCase())
                    : wethIcon
                }
              />{" "}
              <div className="w-investment-funds-token-bullet-text">
                {currencyFormat(parseInt(this.props.transaction.amount), "$")}
              </div>
            </div>

            <div className="w-investment-funds-token-bullet">
              <div>$</div>
              <div className="w-investment-funds-token-bullet-text">
                {currencyFormat(
                  parseFloat(this.props.transaction.amount) *
                    this.state.ethPrice *
                    parseFloat(this.props.transaction.price),
                  "$"
                )}
              </div>
            </div>
          </div>
          <div className="w-your-transactions-table-cell time">
            {getTimeDiff(this.props.transaction.timestamp)}
          </div>
        </div>
      </>
    );
  }
}

export default YourTransactionsTableRow;
