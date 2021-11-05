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
      aum: 0
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
    let aum = 0;
    holdings.forEach((item) => {
      aum += item.amount * item.asset.price.price;
    });

    for(var i = 0; i < holdings.length; i++) {
      holdings[i].weight = parseFloat((holdings[i].amount * holdings[i].asset.price.price / aum) * 100).toFixed(2);
      holdings[i].url = `https://etherscan.io/token/${holdings[i].asset.id}`;
    }

    holdings.sort((a, b) => {
      if(a.weight > b.weight)
        return -1;
      else if(a.weight < b.weight)
        return 1;
      else
        return 0;
    });

    let _ethPrice = await getEthPrice();
    this.setState({
      holdings,
      ethPrice: _ethPrice,
      isLoading: false,
      aum: aum
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
              <div style={{ overflowY: "scroll", height: "30vh" }}>
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
                        weightFromParent={composition.weight}
                        symbolFromParent={composition.asset.symbol}
                        urlFromParent={composition.url}
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
