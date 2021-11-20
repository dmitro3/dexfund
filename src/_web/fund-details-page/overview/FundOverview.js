import React, { Component } from "react";
import { queryFundOverviewDetails } from "../../../sub-graph-integrations/assets-and-adapters"

// COMPONENTS
import Sidebar from "../sidebar/Sidebar";
import VaultChart from './components/portfolio/VaultChart';
import FundOverviewCards from "./components/cards/FundOverviewCards";
import FundOverviewStatistics from "./components/statistics/FundOverviewStatistics";
import FundOverviewPerformance from "./components/performance/FundOverviewPerformance";
import FundComposition from "./components/composition/FundComposition";
import FundDetails from "./components/details/FundDetails";

// ASSETS
// ...

// CSS
import "./styles/fundOverview.css";
import RoundCard from "../../components/RoundCard/RoundCard";
import { connect } from "react-redux";
import CustomModal from "../../components/Modal/Modal";

class FundOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state,
      ...this.props.props,

      depositors: "",
      denominationAssetSymbol: "",
      denominationAssetName: "",
      modalShow: false
    };
    this.showModal = this.showModal.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({
      ...props.state,
      ...props.props,
    });
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

  showModal(value) {
    console.log('modal: ', value);
    this.setState({
      ...this.state,
      modalShow: value
    })
  }

  render() {
    console.log('onboard: ', this.state.onboard, this.state.account)
    var width = window.innerWidth;

    if (width > 1000) {
      return (
        <>
          <div className="w-fund-overview-wrapper">
            {
              this.state.onboard.walletConnected && 
              <CustomModal modalIsOpen={this.state.modalShow} onCloseButtonClick={() => this.showModal(false)}>
                <Sidebar state={this.state} />
              </CustomModal>
            }
            <div className="w-fund-overview-content">
              <RoundCard width="100%">
                <VaultChart fundAddress={this.state.fundId} parentState={this.state} fundName={this.state.fundName} walletMust={false} currentSharePrice={this.state.currentSharePrice} state={this.state}/>
              </RoundCard>

              {/* <FundOverviewCards state={this.state} /> */}
              {/* <FundOverviewStatistics state={this.state} /> */}
              {/* <FundOverviewPerformance /> */}
              <RoundCard width="100%">
                <FundComposition state={this.state}/>
              </RoundCard>
              {
                this.state.onboard.walletConnected && 
                <div className="btn-layout">
                  <button className="btn-invest" onClick={() => this.showModal(true)}>Invest</button>
                  <button className="btn-withdraw" onClick={() => this.showModal(true)}>Withdraw</button>
                </div>
              }

              {/* <FundDetails state={this.state} /> */}
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

