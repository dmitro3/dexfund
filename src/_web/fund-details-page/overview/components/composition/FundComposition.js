// import { TimerSharp } from '@material-ui/icons';
import React, { Component } from "react";

// COMPONENTS
import FundCompositionTableHeader from "./sub-components/FundCompositionTableHeader";
import FundCompositionTableRow from "./sub-components/FundCompositionTableRow";

// ASSETS
// ...

// CSS
import "../../styles/fundOverview.css";

class FundComposition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset1: "100,000,000",
      value1: "5,000,000.00",
      weight1: "50",

      asset2: "1,000,000",
      value2: "900,000.00",
      weight2: "25",

      asset3: "50,000,000",
      value3: "1,000,000.00",
      weight3: "25",
    };
  }

  render() {
    return (
      <>
        <div className="w-fund-composition-wrapper">
          <div className="w-fund-composition-content">
            <div className="w-fund-composition-title">FUND COMPOSITION</div>
            <div className="w-fund-composition-table">
              <FundCompositionTableHeader />
              <FundCompositionTableRow
                assetFromParent={this.state.asset1}
                valueFromParent={this.state.value1}
                weightFromParent={this.state.weight1}
              />
              <FundCompositionTableRow
                assetFromParent={this.state.asset2}
                valueFromParent={this.state.value2}
                weightFromParent={this.state.weight2}
              />
              <FundCompositionTableRow
                assetFromParent={this.state.asset3}
                valueFromParent={this.state.value3}
                weightFromParent={this.state.weight3}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundComposition;
