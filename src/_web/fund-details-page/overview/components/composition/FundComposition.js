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
    this.setState({
      holdings,
    });
  }

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
                    composition.amount * composition.asset.price.price
                  }
                  weightFromParent="some"
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
