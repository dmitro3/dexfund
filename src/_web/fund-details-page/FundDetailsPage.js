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
      aum: 0,
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
    let currentSharePrice = (aum * _ethPrice) / parseFloat(totalSupply);
    var startingSharePrice = await getCreationSharePrices([vaultAddress]);
    startingSharePrice = startingSharePrice[vaultAddress]

    var profit = currentSharePrice - startingSharePrice;
    var ltr = (profit / startingSharePrice) * 100;

    console.log("LIFETIME RETURN: "+ltr)

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
    });

    this.props.deactivateLoaderOverlay();
  }

  displaySettingsPopup = () => {
    this.setState({ settingsPopup: true });
  };

  closeSettingsPopup = () => {
    this.setState({ settingsPopup: false });
  };

  renderOverview() {
    return (
      <>
        <FundOverview state={this.state} props={this.props} />
      </>
    );
  }

  renderItems() {
    console.log("ITems");
  }
  renderTrade() {
    return (
      <>
        <FundTrade state={this.state} {...this.props} />
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
        <FundReward />
      </>
    );
  }

  renderSettings() {
    return (
      <>
        <FundSettings />
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

  render() {
    var width = window.innerWidth;

    const doNotDisplay = {
      display: "none",
    };

    const selectedNavbarItemStyle = {
      background: "linear-gradient(to right, #E926C3 10%, #FF4D86 100%)",
      "-webkit-background-clip": "text",
      WebkitTextFillColor: "transparent",
    };

    if (width > 1000) {
      return (
        <>
          <Header
            {...this.props}
            displaySettingsPopupEvent={this.displaySettingsPopup}
          />
          <div className="w-fund-details-page-wrapper">
            <div className="w-fund-details-page-content">
              <div className="w-fund-details-page-title">
                {this.state.fundName}
              </div>
              <div className="w-fund-details-page-navbar">
                <div
                  className="w-fund-details-page-navbar-item"
                  title="Comming Soon ..."
                  style={
                    this.state.selectedNavbarItem === "overview"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  onClick={() =>
                    this.setState({ selectedNavbarItem: "overview" })
                  }
                >
                  Overview
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  title="Comming Soon ..."
                  id="trade-id"
                  onMouseOver={() => {
                    document.getElementById("trade-id").innerHTML =
                      this.state.fundDetails.creator.id ===
                      this.props.onboard.address
                        ? "Trade"
                        : "Available for Vault Manager Only";
                  }}
                  onMouseOut={() => {
                    document.getElementById("trade-id").innerHTML = "Trade";
                  }}
                  style={
                    this.state.selectedNavbarItem === "trade"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  onClick={(e) => {
                    if (this.state.fundDetails.creator.id !== this.props.onboard.address)
                      return;
                    this.setState({ selectedNavbarItem: "trade" })
                  }}
                >
                  Trade
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  title="Comming Soon ..."
                  id="provide-liquidity"
                  onMouseOver={() => {
                    document.getElementById("provide-liquidity").innerHTML =
                      this.state.fundDetails.creator.id ===
                      this.props.onboard.address
                        ? "Coming Soon"
                        : "Available for Vault Manager Only";
                  }}
                  onMouseOut={() => {
                    document.getElementById("provide-liquidity").innerHTML =
                      "Provide Liquidity";
                  }}
                  style={
                    this.state.selectedNavbarItem === "provideLiquidity"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  // onClick={() =>
                  //   this.setState({ selectedNavbarItem: "provideLiquidity" })
                  // }
                >
                  Provide liquidity
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  title="Comming Soon ..."
                  id="stake-id"
                  onMouseOver={() => {
                    document.getElementById("stake-id").innerHTML =
                      this.state.fundDetails.creator.id ===
                      this.props.onboard.address
                        ? "Coming Soon"
                        : "Available for Vault Manager Only";
                  }}
                  onMouseOut={() => {
                    document.getElementById("stake-id").innerHTML = "Stake";
                  }}
                  style={
                    this.state.selectedNavbarItem === "stake"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  // onClick={() => this.setState({ selectedNavbarItem: "stake" })}
                >
                  Stake
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  title="Comming Soon ..."
                  id="yeild-id"
                  onMouseOver={() => {
                    document.getElementById("yeild-id").innerHTML =
                      this.state.fundDetails.creator.id ===
                      this.props.onboard.address
                        ? "Coming Soon"
                        : "Available for Vault Manager Only";
                  }}
                  onMouseOut={() => {
                    document.getElementById("yeild-id").innerHTML = "Yeild";
                  }}
                  style={
                    this.state.selectedNavbarItem === "yield"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  // onClick={() => this.setState({ selectedNavbarItem: "yield" })}
                >
                  Yield
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  title="Comming Soon ..."
                  id="rewards-id"
                  onMouseOver={() => {
                    document.getElementById("rewards-id").innerHTML =
                      this.state.fundDetails.creator.id ===
                      this.props.onboard.address
                        ? "Coming Soon"
                        : "Available for Vault Manager Only";
                  }}
                  onMouseOut={() => {
                    document.getElementById("rewards-id").innerHTML = "rewards";
                  }}
                  style={
                    this.state.selectedNavbarItem === "rewards"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  // onClick={() =>
                  //   this.setState({ selectedNavbarItem: "rewards" })
                  // }
                >
                  Rewards
                </div>
                <div
                  className="w-fund-details-page-navbar-item"
                  title="Comming Soon ..."
                  id="Setting-id"
                  onMouseOver={() => {
                    document.getElementById("Setting-id").innerHTML =
                      this.state.fundDetails.creator.id ===
                      this.props.onboard.address
                        ? "Coming Soon"
                        : "Available for Vault Manager Only";
                  }}
                  onMouseOut={() => {
                    document.getElementById("Setting-id").innerHTML = "Setting";
                  }}
                  style={
                    this.state.selectedNavbarItem === "settings"
                      ? selectedNavbarItemStyle
                      : {}
                  }
                  // onClick={() =>
                  //   this.setState({ selectedNavbarItem: "settings" })
                  // }
                >
                  Settings
                </div>
              </div>
              {this.state.loaded === false && this.renderPreLoaded()}
              {this.state.loaded === true &&
                this.state.selectedNavbarItem === "overview" &&
                this.renderOverview()}
              {this.state.loaded === true &&
                this.state.selectedNavbarItem === "provideLiquidity" &&
                this.renderProvideLiquidity()}
              {this.state.loaded === true &&
                this.state.selectedNavbarItem === "trade" &&
                this.renderTrade()}
              {this.state.loaded === true &&
                this.state.selectedNavbarItem === "stake" &&
                this.renderStake()}
              {this.state.loaded === true &&
                this.state.selectedNavbarItem === "yield" &&
                this.renderYield()}
              {this.state.loaded === true &&
                this.state.selectedNavbarItem === "rewards" &&
                this.renderRewards()}
              {this.state.loaded === true &&
                this.state.selectedNavbarItem === "settings" &&
                this.renderSettings()}
            </div>
          </div>
          <div style={this.state.settingsPopup === false ? doNotDisplay : {}}>
            <SettingsPopup
              {...this.props}
              closeSettingsPopupEvent={this.closeSettingsPopup}
            />
          </div>
        </>
      );
    } else {
      return <></>;
    }
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
