import React, { Component } from "react";
import { getEthPrice } from "../../../../ethereum/funds/fund-related";
import { currencyFormat, getTimeDiff } from "../../../../ethereum/utils";
import { getIconSource } from "../../../../icons";

// COMPONENTS
// ...

// ASSETS
import addIcon from "../assets/add-icon.svg";
import minusIcon from "../assets/minus-icon.svg";
import linkIcon from "../../../global/your-transactions/assets/link.png";

// CSS
import "../styles/yourTransactions.css";

class YourTransactionsTableRow extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
            <a
              href={`https://bscscan.com/address/${this.props.transaction.investor}`}
              target="_blank"
            >
              <div>
                <b> {`${this.props.transaction.investor.slice(0, 4)} ....`} </b>
                <img
                  className="fund-composition-weth-icon"
                  src={linkIcon}
                  style={{
                    width: "20px",
                    height: "20px",
                    fill: "red",
                  }}
                />
              </div>
            </a>
          </div>

          <div className="w-your-transactions-table-cell vault">
            {currencyFormat(this.props.transaction.shares)}
          </div>

          {/* <div className="w-your-transactions-table-cell value">
            <div className="w-investment-funds-token-bullet">
              <div>$</div>
              <div className="w-investment-funds-token-bullet-text">
                {currencyFormat(
                  parseFloat(this.props.transaction.amount) *
                    this.state.ethPrice,
                  "$"
                )}
              </div>
            </div>
          </div> */}

          <div className="w-your-transactions-table-cell time">
            {getTimeDiff(this.props.transaction.timestamp)}
          </div>
        </div>
      </>
    );
  }
}

export default YourTransactionsTableRow;
