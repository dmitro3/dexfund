import React, { Component } from "react";

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
    };
  }

  render() {
    var width = window.innerWidth;

    if (width > 1000) {
      return (
        <>
          <div className="w-fund-overview-wrapper">
            <Sidebar />
            <div className="w-fund-overview-content">
              <Portfolio />
              <FundOverviewCards />
              <FundOverviewStatistics />
              <FundOverviewPerformance />
              <FundComposition />
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
