import React, { Component } from "react";
import { queryFundOverviewDetails } from "../../../sub-graph-integrations/assets-and-adapters"

// COMPONENTS
import Sidebar from "../sidebar/Sidebar";
import Portfolio from "../../global/portfolio/Portfolio";
import FundOverviewCards from "./components/cards/FundOverviewCards";
import FundOverviewStatistics from "./components/statistics/FundOverviewStatistics";
import FundOverviewPerformance from "./components/performance/FundOverviewPerformance";
import FundComposition from "./components/composition/FundComposition";
import FundDetails from "./components/details/FundDetails";

// ASSETS
// ...

// CSS
import "./styles/fundOverview.css";

class FundOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state,
      ...this.props.props,

      depositors: "",
      denominationAssetSymbol: "",
      denominationAssetName: "",
    };
  }

  async componentDidMount() {
    let overview = await queryFundOverviewDetails(this.state.fundId);
    this.setState({
      depositors: overview.investmentCount,
      denominationAssetSymbol: overview.accessor.denominationAsset.symbol,
      denominationAssetName: overview.accessor.denominationAsset.name,
      denominationAssetDecimals: overview.accessor.denominationAsset.decimals
    });
  }

  render() {

    var width = window.innerWidth;

    if (width > 1000) {
      return (
        <>
          <div className="w-fund-overview-wrapper">
            <Sidebar state={this.state} />
            <div className="w-fund-overview-content">
              <Portfolio walletMust={false} currentSharePrice={this.state.currentSharePrice} />
              <FundOverviewCards state={this.state} />
              <FundOverviewStatistics state={this.state} />
              <FundOverviewPerformance />
              <FundComposition state={this.state}/>
              <FundDetails state={this.state} />
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default FundOverview;
