import React, { Component } from "react";
import { connect } from "react-redux";

import {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
} from "../../../redux/actions/LoaderAction";
import configs from "../../../config";
import { getFiveInvestments } from "../../../sub-graph-integrations";

// COMPONENTS
import MostProfitableAllTime from "./components/MostProfitableAllTime";
import MostProfitableThisMonth from "./components/MostProfitableThisMonth";
import MostProfitableToday from "./components/MostProfitableToday";

// ASSETS
// ...

// CSS
import "./styles/topInvestmentFunds.css";
import WalletNotConnected from "../../global/wallet-not-connected/WalletNotConnected";

class TopInvestmentFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      investments: [],
    };
  }

  async componentDidMount() {
    var investments = await getFiveInvestments();
    this.setState({
      ...this.state,
      investments: investments,
    });
  }

  render() {
    return this.props.onboard.walletConnected ? (
      <>
        <div className="w-top-investment-funds-wrapper">
          <div className="w-top-investment-funds-header">
            TOP INVESTMENT FUNDS
          </div>
          {this.props.onboard.walletConnected ? (
            <div className="w-top-investment-funds-content">
              <MostProfitableAllTime
                investments={this.state.investments}
                {...this.props}
              />
              <MostProfitableThisMonth
                investments={this.state.investments}
                {...this.props}
              />
              <MostProfitableToday
                investments={this.state.investments}
                {...this.props}
              />
            </div>
          ) : (
            <div> </div>
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

const mapDispatchToProps = {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopInvestmentFunds);
