import React, { Component } from "react";
import { utils } from "ethers";

// COMPONENTS
import Header from "../global/header/Header";
import SettingsPopup from "../global/settings-popup/SettingsPopup";
import FundOverview from "./overview/FundOverview";
import FundTrade from "./trade/FundTrade";
import FundProviderLiquidity from "./provide-liquidity/FundProvideLiquidity";
import FundStake from "./stake/FundStake";
import FundYield from "./yield/FundYield";
import FundReward from "./rewards/FundRewards";
import FundSettings from "./settings/FundSettings";
import {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
} from "./../../redux/actions/LoaderAction";
import { getCreationSharePrices } from './../../api/statistics';
import configs from "./../../config";
// ASSETS
// ...

// SUBGRAPH
import { getFundDetails } from "./../../sub-graph-integrations/get-funds/index";

// REDUX
import { connect } from "react-redux";

// CSS
import "./fundDetailsPage.css";
import { getEthPrice } from "../../ethereum/funds/fund-related";
import {
  allFundTransactions,
  getAUM,
  getFundCompostion,
} from "../../sub-graph-integrations";
import { currencyFormat } from "../../ethereum/utils";
import RoundCard from "../components/RoundCard/RoundCard";
import TwitterView from "../components/TwitterView/TwitterView";
import FundDetails from "./overview/components/details/FundDetails";
import FundRewards from "./rewards/FundRewards";
import CustomModal from "../components/Modal/Modal";

class FundDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNavbarItem: "overview",

      sidebar: false,
      settingsPopup: false,
      fundId: "",
      fundName: "",
      fundDetails: {},
      loaded: false,
      AUM: 0,
      currentSharePrice: "INTERNAL_API",
      startingSharePrice: 0,
      ethPrice: 1,
    };

    this.toPage = this.toPage.bind(this);
  }

  toPage(path) {
    this.props.history.push(path);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  async componentDidMount() {
    await this.props.activateLoaderOverlay();
    var _path = window.location.pathname;
    var vaultAddress = _path.split("/fund/")[1].toLowerCase();
    var fundDetails = await getFundDetails(vaultAddress);
    const fundComposition = await getFundCompostion(vaultAddress);
    var totalSupply = fundComposition.shares.totalSupply;

    let _ethPrice = await getEthPrice();
    let aum = await getAUM(vaultAddress);
    console.log('aum: ', aum)
    let currentSharePrice = (aum * _ethPrice) / parseFloat(totalSupply);
    var startingSharePrice = await getCreationSharePrices([vaultAddress]);
    startingSharePrice = startingSharePrice[vaultAddress]

    var profit = currentSharePrice - startingSharePrice;
    var ltr = (profit / startingSharePrice) * 100;


    var isRegistered = fundDetails.length > 0;
    if (configs.BLACKLISTED_VAULTS.includes(vaultAddress) || !isRegistered) {
      await this.props.deactivateLoaderOverlay();
      this.toPage("/");
      return;
    }
    
    fundDetails = fundDetails[0];
    await this.setState({
      fundId: vaultAddress,
      fundName: fundDetails.name,
      fundDetails: fundDetails,
      ethPrice: _ethPrice,
      currentSharePrice: currentSharePrice,
      startingSharePrice: startingSharePrice,
      lifetimeReturn: ltr,
      loaded: true,
      AUM: aum * _ethPrice,
      isManager: fundDetails && (fundDetails.manager.id === this.props.onboard.address)
    });

    this.props.deactivateLoaderOverlay();
  }

  componentWillReceiveProps(props) {
    this.setState({
      isManager: this.state.fundDetails && (this.state.fundDetails.manager.id === props.onboard.address)
    })
  }

  renderOverview() {
    return (
      <>
        <FundOverview state={this.state} props={this.props} />
      </>
    );
  }

  renderPreLoaded() {
    return (
      <div
        style={{ height: "100vh" }}
        className="w-fund-overview-wrapper"
      ></div>
    );
  }

  renderTwitter() {
    return (
      <div className="w-fund-twitter-view">
        <RoundCard width="100%">
          <TwitterView state={this.state} props={this.props} />
        </RoundCard>
      </div>
    )
  };

  renderTrade() {
    return (
      <FundTrade state={this.state} props={this.props} />
    )
  }

  renderFundExtraInfo() {
    return (
      <RoundCard width="100%">
        <FundDetails state={this.state} />
      </RoundCard>
    )
  }

  renderSettings() {
    return (
      <>
        <FundSettings />
      </>
    );
  }

  renderProvideLiquidity() {
    return (
      <>
        <FundProviderLiquidity />
      </>
    );
  }

  renderStake() {
    return (
      <>
        <FundStake />
      </>
    );
  }

  renderYield() {
    return (
      <>
        <FundYield />
      </>
    );
  }

  renderRewards() {
    return (
      <>
        <FundRewards />
      </>
    );
  }

  showSettingModal(value) {
    this.setState({
      settingModalShow: value
    });
  }

  render() {
    let width = window.innerWidth;
    let isMobile = width < 768;
      return (
        <>
          <div className="w-fund-details-page-wrapper">
            {
              this.props.onboard.provider && this.state.isManager && (
                <div className="fund-toolbutton-navbar">
                  <button className="btn-fund-tool" onClick={(e) => {
                    this.setState({selectedNavbarItem: 'overview'});
                  }}>Overview</button>
                  <button className="btn-fund-tool" onClick={(e) => {
                    this.setState({selectedNavbarItem: 'trade'});
                  }}>Trade</button>
                  {/* <button className="btn-fund-tool">Liquidity Pool (Soon)</button>
                  <button className="btn-fund-tool">Lend(Soon)</button> */}
                </div>
              )
            }
            <div className="w-fund-details-page-content">
                {this.state.loaded === false && this.renderPreLoaded()}
                <div className="fund-content">
                  <div className="fund-overview" style={{order: isMobile && this.state.selectedNavbarItem == 'overview' ? 0 : 1}}>
                    {this.state.loaded === true && this.renderOverview()}
                  </div>
                  <div className="fund-other-infos" style={{order: isMobile && this.state.selectedNavbarItem == 'trade' ? 0 : 1}}>
                    {this.state.loaded && this.state.selectedNavbarItem === 'overview' && this.renderTwitter()}
                    {this.state.loaded && this.state.selectedNavbarItem === 'overview' && this.renderFundExtraInfo()}

                    {this.state.loaded && this.state.selectedNavbarItem === 'trade' && this.props.onboard.provider && this.renderTrade()}

                    {/* {this.state.loaded && this.renderSettings()}
                    {this.state.loaded === true &&
                    this.state.selectedNavbarItem === "provideLiquidity" &&
                    this.renderProvideLiquidity()}
                    {this.state.loaded === true &&
                      this.renderTrade()}
                    {this.state.loaded === true &&
                      this.renderStake()}
                    {this.state.loaded === true &&
                      this.renderYield()}
                    {this.state.loaded === true &&
                      this.renderRewards()} */}
                  </div>
                  
                </div>
            </div>
          </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(FundDetailsPage);

// export default FundDetailsPage;
