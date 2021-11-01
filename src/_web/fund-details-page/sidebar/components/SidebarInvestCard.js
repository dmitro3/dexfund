import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
import ethIcon from "../assets/eth-icon.svg";
import chevronDownIcon from '../assets/chevron-down-icon.svg';

// CSS
import "../styles/sidebar.css";
// WEB3/ETHERSjs
// import { investFundEth, estimateInvestFundEth } from "./../../../../ethereum/funds/deposits-withdraws";
import { BigNumber, utils } from 'ethers';

// REDUX
import { connect } from "react-redux";

import {
  deactivateLoaderOverlay,
  activateLoaderOverlay,
} from "./../../../../redux/actions/LoaderAction";

class SidebarInvestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToInvest: '0.00',
      maxEth: this.props.onboard.balance,
      maxClicked: false,
      selectedAsset: "eth",
      fundAddress: this.props.fundAddress,

      assetDropdown: false,
    };

    this.invest = this.invest.bind(this);
  }

  inputField = (e) => {
    if (e.target.value === "") {
      this.setState({ amountToInvest: "", maxClicked: false });
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ amountToInvest: value, maxClicked: false });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.onboard != this.props.onboard) {
      this.setState({
        maxEth: this.props.onboard.balance
      })
    }
  }

  invest = async (e) => {
    e.preventDefault();

    // if (this.state.selectedAsset === "eth" && parseFloat(this.state.amountToInvest) !== 0) {
    //   console.log('Investing eth');
    //   this.props.activateLoaderOverlay();

    //   var ethAmount;
    //   if (this.state.maxClicked) {
    //     const ethBuffer = utils.parseEther('0.001');
    //     var ethGasCost = await estimateInvestFundEth(
    //       this.state.fundAddress,
    //       BigNumber.from(this.state.maxEth).sub(ethBuffer),
    //       this.props.onboard.address,
    //       this.props.onboard.provider
    //     );
    //     ethGasCost = BigNumber.from(ethGasCost);

    //     ethAmount = BigNumber.from(this.state.maxEth).sub(ethGasCost).sub(ethBuffer)
    //   } else {
    //     ethAmount = BigNumber.from(this.state.amountToInvest).mul(10**18);
    //   }
    //     await investFundEth(
    //       this.state.fundAddress,
    //       ethAmount,
    //       this.props.onboard.address,
    //       this.props.onboard.provider
    //     );
    //   this.props.deactivateLoaderOverlay();
    // }
  }

  // invest  any amount toa fund
  // investAmountToFund = async () => {
  //   this.props.activateLoaderOverlay();

  //   if (
  //     this.state.amountToInvest !== "0.00" &&
  //     this.state.amountToInvest > "0.00"
  //   ) {
  //     try {
  //       const deposit = await investToAFundActionWrapper(
  //         "0xcbea44a986a317a551f3fcb0c29b1e0155d07209", // _comptroller_proxyAddress
  //         "0xd0a1e359811322d97991e03f863a0c30c2cf029c", // denomination assets
  //         this.props.onboard.address, // currentUser address
  //         this.props.onboard.address, // JsonSigner
  //         this.props.onboard.provider, // web3Provider
  //         "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  //         "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // exchangeTargetAsset
  //         this.state.amountToInvest
  //       );

  //       console.log(deposit);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     console.log("Show Toast here");
  //   }
  //   this.props.deactivateLoaderOverlay();
  // };

  // end of invest to a fund.

  render() {
    return (
      this.props.onboard.walletConnected && (
        <>
          <div className="w-invest-card">
            <div className="w-invest-card-header">
              Amount to invest
            </div>
            <div className="w-invest-table">
              <div className="w-invest-table-asset-selection"
                onClick={() => this.setState({
                  assetDropdown: true
                })}
              >
                <div className="w-invest-table-asset-cell">
                  <img
                    src={ethIcon}
                    alt="eth-icon"
                    className="sidebar-eth-icon"
                  />
                  <div className="w-invest-table-asset">ETH</div>
                </div>
                <img
                  src={chevronDownIcon}
                  alt="chevron-down-icon"
                  className="w-invest-table-chevron-down-icon"
                />
              </div>
              <div className="w-invest-table-amount-cell">
                <div className="w-invest-table-amount-input">
                  <input
                    type="text"
                    id="amount-to-invest"
                    name="amountToInvest"
                    value={this.state.amountToInvest}
                    onChange={(e) => this.inputField(e)}
                    style={{
                      color: "#fff",
                      backgroundColor: "#070708",
                      fontFamily: "Bai Jamjuree, sans-serif",
                      borderColor: "#070708",
                      borderWidth: "2px 0px",
                      fontSize: "15px",
                      fontWeight: "400",
                      outline: "none",
                      textAlign: "left",
                      width: "120px",
                      marginTop: "-4px",
                    }}
                  ></input>
                </div>
                <div
                  className="w-invest-table-amount-max-button"
                  onClick={() =>
                    this.setState({
                      amountToInvest: this.state.selectedAsset === "eth" ? (this.state.maxEth / 10**18).toFixed(2) : "",
                      maxClicked: true
                    })
                  }
                >
                  <div className="w-invest-table-amount-max-button-text">
                    Max: {this.state.selectedAsset === "eth" ? (this.state.maxEth / 10**18).toFixed(2) : ""}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-invest-card-button"
              onClick={(e) => {
                this.invest(e);
              }}
            >
              <div className="w-invest-card-button-text">
                INVEST {this.state.amountToInvest} ETH
              </div>
            </div>
          </div>
        </>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.connect,
    onboard: state.onboard
  };
};

const mapDispatchToProps = {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarInvestCard);
