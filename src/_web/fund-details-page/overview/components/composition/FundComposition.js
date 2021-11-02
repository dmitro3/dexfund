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
import SkeletonLoader from "../../../../global/skeleton-loader/SkeletonLoader";

class FundComposition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holdings: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const fundComposition = await getFundCompostion(this.props.state.fundId);
    let holdings;
    if (fundComposition.portfolio) {
      holdings = fundComposition.portfolio.holdings;
      console.log("1", holdings);
    }
    let _ethPrice = await getEthPrice();
    this.setState({
      holdings,
      ethPrice: _ethPrice,
      isLoading: false,
    });
  }

  calcWgOfAnAsset = (value) => {
    let sum = 0;
    this.state.holdings.forEach((item) => {
      sum += item.amount * item.asset.price.price;
    });

    return parseFloat((value / sum) * 100).toFixed(2);
  };

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
        <div className="w-fund-composition-wrapper">
          <div className="w-fund-composition-content">
            <div className="w-fund-composition-title">VAULT COMPOSITION</div>
            <div className="w-fund-composition-table">
              <FundCompositionTableHeader />
              <div style={{ overflowY: "scroll", height: "40vh" }}>
                {this.state.isLoading
                  ? this.renderLoading()
                  : this.state.holdings.map((composition) => (
                      <FundCompositionTableRow
                        {...this.props}
                        key={composition.id}
                        assetFromParent={composition.amount}
                        amountFromParent={composition.amount}
                        valueFromParent={
                          composition.amount *
                          composition.asset.price.price *
                          this.state.ethPrice
                        }
                        weightFromParent={"0.00"}
                        weightFromParent={this.calcWgOfAnAsset(
                          composition.amount * composition.asset.price.price
                        )}
                        symbolFromParent={composition.asset.symbol}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundComposition;
