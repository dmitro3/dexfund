// import { TimerSharp } from '@material-ui/icons';
import React, { Component } from "react";

// COMPONENTS

// ASSETS
// ...

// CSS
import "../../styles/fundOverview.css";

// REDUX
import { connect } from "react-redux";
import { currentUserAllTransactions } from "../../../../../sub-graph-integrations";
import YourInvestments from "../../../../home-page/your-investments/YourInvestments";
import YourTransactions from "../../../../global/your-transactions/YourTransactions";

class FundOverviewStatistics extends Component {
  constructor(props) {
    super(props);
    console.log("STATS", this.props);
    this.state = {
      selectedNavbarItem: "yourInvestments",
      ...this.props.state,
      investments: [],
      transactions: [],
    };
  }

  async componentDidMount() {
    const currentUserHistory = await currentUserAllTransactions(
      "0xaed39f9013fe44deb694203d9d12ea4029edac49"
    );
    console.log("STATS", currentUserHistory);
    this.setState({
      ...this.state,
      investments: currentUserHistory.investments,
      transactions: currentUserHistory.transactions,
    });
  }

  renderYourInvestments() {
    return (
      <>
        <YourInvestments
          state={this.state}
          investments={this.state.investments}
        />
      </>
    );
  }

  renderYourTransactions() {
    return (
      <>
        <YourTransactions
          state={this.state}
          transactions={this.state.transactions}
        />
      </>
    );
  }

  render() {
    const selectedNavbarItemStyle = {
      background: "linear-gradient(to right, #E926C3 10%, #FF4D86 100%)",
      "-webkit-background-clip": "text",
      WebkitTextFillColor: "transparent",
    };

    return (
      <>
        <div className="w-fund-overview-statistics-wrapper">
          <div className="w-fund-overview-statistics-content">
            <div className="w-fund-overview-statistics-title">STATISTICS</div>
            <div className="w-fund-overview-statistics-navbar">
              <div
                className="w-fund-overview-statistics-navbar-item"
                style={
                  this.state.selectedNavbarItem === "yourInvestments"
                    ? selectedNavbarItemStyle
                    : {}
                }
                onClick={() =>
                  this.setState({ selectedNavbarItem: "yourInvestments" })
                }
              >
                Your investments
              </div>
              <div
                className="w-fund-overview-statistics-navbar-item"
                style={
                  this.state.selectedNavbarItem === "yourTransactions"
                    ? selectedNavbarItemStyle
                    : {}
                }
                onClick={() =>
                  this.setState({ selectedNavbarItem: "yourTransactions" })
                }
              >
                Your transactions
              </div>
            </div>
            {this.state.selectedNavbarItem === "yourInvestments" &&
              this.renderYourInvestments()}
            {this.state.selectedNavbarItem === "yourTransactions" &&
              this.renderYourTransactions()}
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundOverviewStatistics);
