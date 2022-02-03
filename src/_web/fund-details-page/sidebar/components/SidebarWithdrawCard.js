import React, { Component } from "react";
import { getShareBalance, withdraw } from "../../../../ethereum/funds/fund-related";

import { redeemAllShares, redeemSharesAmount } from "./../../../../ethereum/funds/deposits-withdraws";

// COMPONENTS
// ...

// ASSETS
import ethIcon from "../assets/eth-icon.svg";
// CSS
import "../styles/sidebar.css";
//REDUX

import { connect } from "react-redux";
import {
  deactivateLoaderOverlay,
  activateLoaderOverlay,
} from "./../../../../redux/actions/LoaderAction";
import { toastr } from "react-redux-toastr";
import { fullNumber } from "../../../../ethereum/utils";
import BigNumber from "bignumber.js";
import { getIconSource } from "../../../../icons";

class SidebarWithdrawCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withdrawAmount: "0.00",
      maxAmountToWithdrawal: "0.00",
      fundAddress: this.props.state.fundAddress,
    };
  }

  inputField = (e) => {
    if (e.target.value === "") {
      this.setState({ withdrawAmount: "0.00" });
      return;
    }

    const re = /^[0-9.\b]+$/;
    if (!re.test(e.target.value)) {
      return;
    }

    var value = e.target.value;
    this.setState({ withdrawAmount: value });
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.state != this.props.state) {
      this.setState({
        ...this.props.state,
      });
    }
  }

  async componentDidMount() {
    const balance = await getShareBalance(this.props.state.fundId, this.props.onboard.provider);
    this.setState({
      maxAmountToWithdrawal: balance
    })
  }

  withdrawAllShares = async (e) => {
    e.preventDefault();
    this.props.activateLoaderOverlay();
    const _withdrawAmount = fullNumber(
      new BigNumber(this.state.withdrawAmount)
        .multipliedBy(10 ** this.props.state.denominationAssetDecimals)
        .toString()
    );
    try {
      await redeemSharesAmount(
        this.state.fundAddress,
        this.props.onboard.provider,
        _withdrawAmount
      );
      toastr.success("You have succeffuly withdrawn you shares");
    } catch (er) {
      toastr.error("An Error occurred while withdrawaling your shares.");
    }

    this.props.deactivateLoaderOverlay();
    this.props.onPurchase();
  };

  renderJustRedeemAllShares() {
    return (
      this.props.onboard.walletConnected && (
        <>
          <div className="w-invest-card">
            <div
              className="w-invest-card-button"
              onClick={(e) => {
                this.withdrawAllShares(e);
              }}
            >
              <div className="w-invest-card-button-text">
                WITHDRAW ALL SHARES
              </div>
            </div>
          </div>
        </>
      )
    );
  }

  render() {
    // return this.renderJustRedeemAllShares();
    return (
      this.props.onboard.walletConnected && (
        <>
          <div className="w-invest-card">
            <div className="w-invest-card-header">Amount to withdraw</div>
            <div className="w-invest-table">
              <div className="w-invest-table-asset-cell">
                <img
                  src={getIconSource(this.props.state.denominationAssetSymbol)}
                  alt="eth-icon"
                  className="sidebar-eth-icon"
                />
                <div className="w-invest-table-asset">{this.props.state.denominationAssetSymbol}</div>
              </div>
              <div className="w-invest-table-amount-cell">
                <div className="w-invest-table-amount-input">
                  <input
                    type="text"
                    id="amount-to-invest"
                    name="withdrawAmount"
                    value={this.state.withdrawAmount}
                    onChange={(e) => this.inputField(e)}
                  ></input>
                </div>
                <div
                  className="w-invest-table-amount-max-button"
                  onClick={() =>
                    this.setState({
                      withdrawAmount: this.state.maxAmountToWithdrawal,
                    })
                  }
                >
                  <div className="w-invest-table-amount-max-button-text">
                    Max: {this.state.maxAmountToWithdrawal}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-invest-card-button"
              onClick={(e) => {
                this.withdrawAllShares(e);
              }}
            >
              <div className="w-invest-card-button-text">
                WITHDRAW {this.state.withdrawAmount} {this.props.state.denominationAssetSymbol}
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
    onboard: state.onboard,
  };
};

const mapDispatchToProps = {
  activateLoaderOverlay,
  deactivateLoaderOverlay,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarWithdrawCard);
