import React, { Component } from "react";

// COMPONENTS
import YourInvestmentsTableHeader from "./sub-components/YourInvestmentsTableHeader";
import YourInvestmentsTableRow from "./sub-components/YourInvestmentsTableRow";

// ASSETS
// ...

// CSS
import "./styles/yourInvestments.css";
import { getYourInvestmentsPerFund } from "../../../../../../../sub-graph-integrations";
import { currencyFormat } from "../../../../../../../ethereum/utils";
// REDUX
import { connect } from "react-redux";
import WalletNotConnected from "../../../../../../global/wallet-not-connected/WalletNotConnected";

class YourInvestments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset1: "2.00",
      price1: "2000",
      value1: "20000",
      performance1: "20",

      yourFundInvestments: [],
      ...this.props.state,
    };
  }

  async componentDidMount() {
    try {
      const investments = await getYourInvestmentsPerFund(
        this.props.state.fundId,
        this.props.onboard.address
      );
      // console.log('1221', investments);
      const yourFundInvestments =
        investments.state.fundState.portfolio.holdings;
      // console.log("ur inv: "+yourFundInvestments)
      this.setState({
        yourFundInvestments: investments,
      });
    } catch (e) {
      console.log("ERROR: " + e);
      this.setState({
        yourFundInvestments: [],
      });
    }
  }

  render() {
    return this.props.onboard.walletConnected ? (
      <>
        <div className="w-fund-statistics-your-investments-wrapper">
          <YourInvestmentsTableHeader />
          {this.state.yourFundInvestments.length === 0 ? (
            <div className="w-your-investments-table-row-no-data">
              You have no investments
            </div>
          ) : (
            <div style={{ overflowY: "scroll", height: "60vh" }}>
              {this.state.yourFundInvestments.map((investment) => (
                <YourInvestmentsTableRow
                  assetFromParent={investment.asset.symbol}
                  amountFromParent={currencyFormat(investment.amount)}
                  priceFromParent={currencyFormat(investment.price.price)}
                  valueFromParent={currencyFormat(
                    investment.price.price * investment.amount
                  )}
                  performanceFromParent="0.00%"
                />
              ))}
            </div>
          )}
        </div>
      </>
    ) : (
      <WalletNotConnected />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.connect,
    onboard: state.onboard,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(YourInvestments);
