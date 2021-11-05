import React, { Component } from "react";
import { withdraw } from "../../../../ethereum/funds/fund-related";

import { redeemAllShares } from "./../../../../ethereum/funds/deposits-withdraws";

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

class SidebarWithdrawCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withdrawAmount: "0.00",
      maxAmountToWithdrawal: "5.00",
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

  withdrawAllShares = async (e) => {
    e.preventDefault();
    this.props.activateLoaderOverlay();

    try {
      await redeemAllShares(
        this.state.fundAddress,
        this.props.onboard.provider
      );
    } catch (er) {}

    this.props.deactivateLoaderOverlay();
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
    return this.renderJustRedeemAllShares();
    // return (
    //   this.props.onboard.walletConnected && (
    //     <>
    //       <div className="w-invest-card">
    //         <div className="w-invest-card-header">Amount to withdraw</div>
    //         <div className="w-invest-table">
    //           <div className="w-invest-table-asset-cell">
    //             <img
    //               src={ethIcon}
    //               alt="eth-icon"
    //               className="sidebar-eth-icon"
    //             />
    //             <div className="w-invest-table-asset">ETH</div>
    //           </div>
    //           <div className="w-invest-table-amount-cell">
    //             <div className="w-invest-table-amount-input">
    //               <input
    //                 type="text"
    //                 id="amount-to-invest"
    //                 name="withdrawAmount"
    //                 value={this.state.withdrawAmount}
    //                 onChange={(e) => this.inputField(e)}
    //                 style={{
    //                   color: "#fff",
    //                   backgroundColor: "#070708",
    //                   fontFamily: "Bai Jamjuree, sans-serif",
    //                   borderColor: "#070708",
    //                   borderWidth: "2px 0px",
    //                   fontSize: "15px",
    //                   fontWeight: "400",
    //                   outline: "none",
    //                   textAlign: "left",
    //                   width: "120px",
    //                   marginTop: "-4px",
    //                 }}
    //               ></input>
    //             </div>
    //             <div
    //               className="w-invest-table-amount-max-button"
    //               onClick={() =>
    //                 this.setState({
    //                   withdrawAmount: this.state.maxAmountToWithdrawal,
    //                 })
    //               }
    //             >
    //               <div className="w-invest-table-amount-max-button-text">
    //                 Max: {this.state.maxAmountToWithdrawal}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div
    //           className="w-invest-card-button"
    //           onClick={() => {
    //             this.onWithdraw();
    //           }}
    //         >
    //           <div className="w-invest-card-button-text">
    //             WITHDRAW {this.state.withdrawAmount} ETH
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )
    // );
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
