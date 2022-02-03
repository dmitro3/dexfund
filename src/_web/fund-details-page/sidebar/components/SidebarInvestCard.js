import React, { Component } from "react";
import { getIconSource } from "../../../../icons";

import {
  getDenominationAllowance,
  getDenominationBalance,
  approveForInvestment,
  investFundDenomination,
  getFundMinMaxAdapter,
} from "../../../../ethereum/funds/deposits-withdraws";
import { fullNumber } from "./../../../../ethereum/utils/common";

// COMPONENTS
// ...

// ASSETS
import ethIcon from "../assets/eth-icon.svg";

// CSS
import "../styles/sidebar.css";
// WEB3/ETHERSjs
// import { investFundEth, estimateInvestFundEth } from "./../../../../ethereum/funds/deposits-withdraws";
import { utils } from "ethers";
import BigNumber from "bignumber.js";

// REDUX
import { connect } from "react-redux";

import {
  deactivateLoaderOverlay,
  activateLoaderOverlay,
} from "./../../../../redux/actions/LoaderAction";
import { toastr } from "react-redux-toastr";

class SidebarInvestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToInvest: "0",
      maxEth: this.props.onboard.balance,
      maxClicked: false,
      selectedAsset: "denomination",
      fundAddress: this.props.fundAddress,

      approved: false,
      allowance: "",
      maxAmountDenomination: 0,

      fundMaxDeposit: 0,
      fundMinDeposit: 0,

      warningText: "",

      ...this.props.state,
    };

    this.invest = this.invest.bind(this);
    this.setAllowance = this.setAllowance.bind(this);
    this.setMaxAmountDenomination = this.setMaxAmountDenomination.bind(this);
    this.setFundMinMax = this.setFundMinMax.bind(this);
    this.checkDepositLimits = this.checkDepositLimits.bind(this);
  }

  inputField = (e) => {
    this.setState({ maxClicked: false });

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

  // async componentDidUpdate(prevProps) {
  //   this.checkDepositLimits();
  //   if (prevProps.onboard != this.props.onboard) {
  //     this.setState({
  //       maxEth: this.props.onboard.balance,
  //     });
  //   }

  //   if (prevProps.state != this.props.state) {
  //     this.setState({
  //       ...this.props.state,
  //     });
  //   }

  //   if (
  //     this.props.onboard.address != prevProps.onboard.address ||
  //     this.props.onboard.fundAddress != prevProps.onboard.fundAddress ||
  //     this.props.onboard.provider != prevProps.onboard.provider
  //   ) {
  //     this.setMaxAmountDenomination();
  //     this.setAllowance();
  //     this.setFundMinMax();
  //   }
  // }

  setAllowance = async () => {
    var allowance;
    allowance = await getDenominationAllowance(
      this.state.fundAddress,
      this.props.onboard.address,
      this.props.onboard.provider
    );

    this.setState({
      allowance: allowance,
    });
  };

  setMaxAmountDenomination = async () => {
    const maxAmount = await getDenominationBalance(
      this.state.fundAddress,
      this.props.onboard.address,
      this.props.onboard.provider
    );

    await this.setState({
      maxAmountDenomination: maxAmount,
    });
  };

  setFundMinMax = async () => {
    const data = await getFundMinMaxAdapter(
      this.state.fundAddress,
      this.props.onboard.provider
    );

    this.setState({
      fundMaxDeposit: data[1],
      fundMinDeposit: data[0],
    });
  };

  checkDepositLimits = async () => {
    var currentValue =
      parseFloat(this.state.amountToInvest) *
      10 ** this.props.state.denominationAssetDecimals;
    if (currentValue == NaN) currentValue = 0;
    if (
      ((currentValue > this.state.fundMaxDeposit &&
        this.state.fundMaxDeposit != 0) ||
        (currentValue < this.state.fundMinDeposit &&
          this.state.fundMinDeposit != 0)) &&
      this.state.warningText == ""
    ) {
      this.setState({
        warningText:
          "WARNING! Deposit not within minimum/maximum deposit limits.",
      });
    }

    if (
      (currentValue <= this.state.fundMaxDeposit ||
        this.state.fundMaxDeposit == 0) &&
      (currentValue >= this.state.fundMinDeposit ||
        this.state.fundMinDeposit == 0) &&
      this.state.warningText != ""
    ) {
      this.setState({
        warningText: "",
      });
    }
  };

  componentDidMount() {
    if (
      this.props.onboard.provider != null &&
      this.props.onboard.address != null
    ) {
      this.setAllowance();
      this.setMaxAmountDenomination();
      this.setFundMinMax();
    }
  }

  approve = async (e) => {
    e.preventDefault();
    this.props.activateLoaderOverlay();

    try {
      var amount = this.state.maxClicked
        ? this.state.maxAmountDenomination
        : fullNumber(
            new BigNumber(this.state.amountToInvest)
              .multipliedBy(10 ** this.props.state.denominationAssetDecimals)
              .toString()
          );
      if (amount == 0) return;

      await approveForInvestment(
        this.state.fundAddress,
        this.props.onboard.provider,
        amount
      );
      await this.setAllowance();
      toastr.success("Successfully approved to your transactions.");
    } catch (e) {
      toastr.error("An error occurred while approving.");
    }
    this.props.deactivateLoaderOverlay();
  };

  invest = async (e) => {
    e.preventDefault();
    this.props.activateLoaderOverlay();

    try {
      if (this.state.selectedAsset == "denomination") {
        var amount = this.state.maxClicked
          ? this.state.maxAmountDenomination
          : fullNumber(
              new BigNumber(this.state.amountToInvest)
                .multipliedBy(10 ** this.props.state.denominationAssetDecimals)
                .toString()
            );
        if (amount == 0) return;

        await investFundDenomination(
          this.state.fundAddress,
          this.props.onboard.address,
          this.props.onboard.provider,
          amount
        );
        await this.setAllowance();
        toastr.success("Successfully invested to fund.");
      }
    } catch (e) {
      toastr.error("An error occurred while investing");
    }
    this.props.deactivateLoaderOverlay();
    this.props.onPurchase();
  };

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

  //
  //     } catch (error) {
  //
  //     }
  //   } else {
  //
  //   }
  //   this.props.deactivateLoaderOverlay();
  // };

  // end of invest to a fund.

  renderApproveButton() {
    return (
      <>
        <div
          className="w-invest-card-button"
          onClick={(e) => {
            this.approve(e);
          }}
        >
          <div className="w-invest-card-button-text">
            APPROVE {this.props.state.denominationAssetSymbol}
          </div>
        </div>
      </>
    );
  }

  renderInvestButton() {
    return (
      <>
        <div
          className="w-invest-card-button"
          onClick={(e) => {
            this.invest(e);
          }}
        >
          <div className="w-invest-card-button-text">
            DEPOSIT {this.props.state.denominationAssetSymbol}
          </div>
        </div>
      </>
    );
  }

  render() {
    return (
      this.props.onboard.walletConnected && (
        <>
          <div className="w-invest-card">
            <div className="w-invest-card-header">Amount to invest</div>
            <div className="w-invest-table">
              <div className="w-invest-table-asset-cell">
                <img
                  src={getIconSource(this.props.state.denominationAssetSymbol)}
                  alt="eth-icon"
                  className="sidebar-eth-icon"
                />
                <div className="w-invest-table-asset">
                  {this.props.state.denominationAssetSymbol}
                </div>
              </div>
              <div className="w-invest-table-amount-cell">
                <div className="w-invest-table-amount-input">
                  <input
                    type="text"
                    id="amount-to-invest"
                    name="amountToInvest"
                    value={this.state.amountToInvest}
                    onChange={(e) => this.inputField(e)}
                  ></input>
                </div>
                <div
                  className="w-invest-table-amount-max-button"
                  onClick={() =>
                    this.setState({
                      amountToInvest:
                        this.state.selectedAsset === "eth"
                          ? (
                              this.state.maxEth /
                              10 ** this.props.state.denominationAssetDecimals
                            ).toFixed(2)
                          : (
                              this.state.maxAmountDenomination /
                              10 ** this.props.state.denominationAssetDecimals
                            ).toFixed(2),
                      maxClicked: true,
                    })
                  }
                >
                  <div className="w-invest-table-amount-max-button-text">
                    {/* Max: {this.state.selectedAsset === "eth" ? (this.state.maxEth / 10 ** 18).toFixed(2) : (this.state.maxAmountDenomination / 10 ** 18).toFixed(2)} */}
                    Use Max
                  </div>
                </div>
              </div>
            </div>
            {(parseFloat(this.state.amountToInvest) *
              10 ** this.props.state.denominationAssetDecimals >
              this.state.allowance ||
              this.state.amountToInvest == "") &&
              this.renderApproveButton()}
            {parseFloat(this.state.amountToInvest) *
              10 ** this.props.state.denominationAssetDecimals <=
              this.state.allowance && this.renderInvestButton()}
            <div style={{ marginTop: "1%", color: "red" }}>
              {this.state.warningText}
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
    onboard: state.onboard,
  };
};

const mapDispatchToProps = {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarInvestCard);
