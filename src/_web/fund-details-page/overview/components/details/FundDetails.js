import React, { Component } from "react";

// COMPONENTS
import FundFactsheets from "./sub-components/FundFactsheets";
import FundFees from "./sub-components/FundFees";
import FundFinancials from "./sub-components/FundFinancials";
import FundRuleset from "./sub-components/FundRuleset";

// ASSETS
// ...

// CSS
import "./styles/fundDetails.css";
import SwapsTable from "../../../trade/components/swaps-table/SwapsTable";
import FundTransaction from "../../../../global/your-transactions/components/FundTransaction";
import {
  minMaxDepositAmounts,
  performanceFee,
  managementFee,
  entranceDirectBurnFees,
} from "../../../../../sub-graph-integrations";

class FundDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      selectedNavbarItem: "factsheets",
      ...this.props.state,
      policy: null,
      manageFee: { scaledPerSecondRate: "0.00" },
      feePerformance: { rate: "0.00", period: "0.00" },
      entranceFee: { rate: "0.00" },
    };
  }

  async componentDidMount() {
    const policy = await minMaxDepositAmounts(this.props.state.fundId);
    // comptrollerProxies
    const feePerformance = await performanceFee(
      this.props.state.fundDetails.comptrollerProxies.length > 0
        ? this.props.state.fundDetails.comptrollerProxies[0].id
        : ""
    );

    const manageFee = await managementFee(
      this.props.state.fundDetails.comptrollerProxies.length > 0
        ? this.props.state.fundDetails.comptrollerProxies[0].id
        : ""
    );

    const entranceFee = await entranceDirectBurnFees(this.props.state.fundId);

    console.log(feePerformance);
    this.setState({
      ...this.state,
      policy,
      feePerformance: feePerformance,
      manageFee: manageFee,
      entranceFee: entranceFee,
    });
  }

  renderFactsheets() {
    return (
      <>
        <FundFactsheets state={this.state} />
      </>
    );
  }

  renderFees() {
    return (
      <>
        <FundFees
          performanceFee={this.state.feePerformance}
          manageFee={this.state.manageFee}
          entranceFee={this.state.entranceFee}
        />
      </>
    );
  }

  renderFinancials() {
    return (
      <>
        <FundFinancials state={this.state} />
      </>
    );
  }

  renderRuleset() {
    return (
      <>
        <FundRuleset policy={{ ...this.state.policy }} />
      </>
    );
  }

  renderTrades() {
    return (
      <>
        <SwapsTable {...this.props} />
      </>
    );
  }

  renderTransactions() {
    return (
      <>
        <FundTransaction fundId={this.props.state.fundId} />
      </>
    );
  }

  render() {
    const selectedNavbarItemStyle = {
      background: "linear-gradient(to right, #E926C3 10%, #FF4D86 100%)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    };

    return (
      <>
        <div className="w-fund-details-wrapper">
          <div className="w-fund-details-content">
            <div className="w-fund-details-title">DETAILS</div>
            <div className="w-fund-details-navbar">
              <div
                className="w-fund-details-navbar-item"
                style={
                  this.state.selectedNavbarItem === "factsheets"
                    ? selectedNavbarItemStyle
                    : {}
                }
                onClick={() =>
                  this.setState({ selectedNavbarItem: "factsheets" })
                }
              >
                Factsheets
              </div>
              <div
                className="w-fund-details-navbar-item"
                style={
                  this.state.selectedNavbarItem === "fees"
                    ? selectedNavbarItemStyle
                    : {}
                }
                onClick={() => this.setState({ selectedNavbarItem: "fees" })}
              >
                Fees
              </div>
              <div
                className="w-fund-details-navbar-item"
                style={
                  this.state.selectedNavbarItem === "financials"
                    ? selectedNavbarItemStyle
                    : {}
                }
                onClick={() =>
                  this.setState({ selectedNavbarItem: "financials" })
                }
              >
                Financials
              </div>
              <div
                className="w-fund-details-navbar-item"
                style={
                  this.state.selectedNavbarItem === "ruleset"
                    ? selectedNavbarItemStyle
                    : {}
                }
                onClick={() => this.setState({ selectedNavbarItem: "ruleset" })}
              >
                Ruleset
              </div>
              <div
                className="w-fund-details-navbar-item"
                style={
                  this.state.selectedNavbarItem === "transactions"
                    ? selectedNavbarItemStyle
                    : {}
                }
                onClick={() =>
                  this.setState({ selectedNavbarItem: "transactions" })
                }
              >
                Transactions
              </div>
              <div
                className="w-fund-details-navbar-item"
                style={
                  this.state.selectedNavbarItem === "trades"
                    ? selectedNavbarItemStyle
                    : {}
                }
                onClick={() => this.setState({ selectedNavbarItem: "trades" })}
              >
                Trades
              </div>
            </div>
            <div className="w-fund-details-info-section">
              {this.state.selectedNavbarItem === "factsheets" &&
                this.renderFactsheets()}
              {this.state.selectedNavbarItem === "fees" && this.renderFees()}
              {this.state.selectedNavbarItem === "financials" &&
                this.renderFinancials()}
              {this.state.selectedNavbarItem === "ruleset" &&
                this.renderRuleset()}

              {this.state.selectedNavbarItem === "transactions" &&
                this.renderTransactions()}
              {this.state.selectedNavbarItem === "trades" &&
                this.renderTrades()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FundDetails;
