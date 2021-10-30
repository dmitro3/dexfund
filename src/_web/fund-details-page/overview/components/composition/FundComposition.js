// import { TimerSharp } from '@material-ui/icons';
import React, { Component } from "react";

// COMPONENTS
import FundCompositionTableHeader from "./sub-components/FundCompositionTableHeader";
import FundCompositionTableRow from "./sub-components/FundCompositionTableRow";

// ASSETS
// ...

// CSS
import "../../styles/fundOverview.css";
import { getFundCompostion } from "../../../../../sub-graph-integrations";
import { getEthPrice } from "../../../../../ethereum/funds/fund-related";

class FundComposition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holdings: [],
    };
  }

  async componentDidMount() {
    const fundComposition = await getFundCompostion(this.props.state.fundId);
    var holdings = fundComposition.portfolio.holdings;
    console.log("1", holdings);
    let _ethPrice = await getEthPrice()
    this.setState({
      holdings,
      ethPrice: _ethPrice
    });
  }

  calcWgOfAnAsset = (value) => {
    let sum = 0;
    this.state.holdings.forEach((item) => {
      sum += item.amount * item.asset.price.price;
    });

    return parseFloat((value / sum) * 100).toFixed(2);
  };

  render() {
    return (
      <>
        <div className="w-fund-composition-wrapper">
          <div className="w-fund-composition-content">
            <div className="w-fund-composition-title">FUND COMPOSITION</div>
            <div className="w-fund-composition-table">
              <FundCompositionTableHeader />
              {this.state.holdings.map((composition) => (
                <FundCompositionTableRow
                  {...this.props}
                  key={composition.id}
                  assetFromParent={composition.amount}
                  valueFromParent={
                    composition.amount * composition.asset.price.price * this.state.ethPrice
                  }
                  weightFromParent={this.calcWgOfAnAsset(
                    composition.amount * composition.asset.price.price
                  )}
                  symbolFromParent={composition.asset.symbol}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundComposition;
