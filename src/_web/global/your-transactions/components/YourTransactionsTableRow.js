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

      action: this.props.actionFromParent,
      token: this.props.tokenFromParent,
      shares: this.props.sharesFromParent,
      value: this.props.valueFromParent,
      vault: this.props.vaultFromParent,
      type: this.props.typeFromParent,
      transaction: this.props.transaction,
      time: this.props.timeFromParent,
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
        <div style={{ overflowY: "scroll", height: "60vh" }}>
          {this.props.transactions.map((transaction, index) => (
            <>
              <div className="w-your-transactions-table-row" key={index}>
                <div className="w-your-transactions-table-cell newItem">
                  <div className="w-your-transactions-action-section">
                    <img
                      src={transaction.type === "INVEST" ? addIcon : minusIcon}
                    />
                    <div className="w-your-transactions-action-text">
                      {transaction.type}
                    </div>
                  </div>
                </div>

                <div className="w-your-transactions-table-cell token">
                  {transaction.investor}
                </div>

                <div className="w-your-transactions-table-cell vault">
                  {currencyFormat(transaction.shares)}
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
                        transaction.symbol
                          ? getIconSource(transaction.symbol.toLowerCase())
                          : wethIcon
                      }
                    />{" "}
                    <div className="w-investment-funds-token-bullet-text">
                      {currencyFormat(parseInt(transaction.amount), "$")}
                    </div>
                  </div>

                  <div className="w-investment-funds-token-bullet">
                    <div>$</div>
                    <div className="w-investment-funds-token-bullet-text">
                      {currencyFormat(
                        parseFloat(transaction.amount) *
                          this.state.ethPrice *
                          parseFloat(transaction.price),
                        "$"
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-your-transactions-table-cell time">
                  {getTimeDiff(transaction.timestamp)}
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    );
  }
}

export default YourTransactionsTableRow;
