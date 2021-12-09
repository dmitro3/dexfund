import React, { Component } from "react";

// REDUX
import { connect } from "react-redux";

// COMPONENTS
import SidebarInvestCard from "./components/SidebarInvestCard";
import SidebarWithdrawCard from "./components/SidebarWithdrawCard";

// ASSETS
import settingsIcon from "./assets/settings-icon.svg";

// CSS
import "./styles/sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.state,
      selectedSidebarItem: props.selectedSidebarItem || "invest",
      fundAddress: this.props.state.fundId,
    };
  }

  componentDidUpdate(prevProps) {
    console.log('sidebar: ', this.state)
    if (prevProps.state != this.props.state) {
      this.setState({
        ...this.props.state
      })
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...props.state
    });
  }

  renderInvestCard() {
    return (
      <>
        <SidebarInvestCard 
          state={this.state}
        />
      </>
    );
  }

  renderWithdrawCard() {
    return (
      <>
        <SidebarWithdrawCard 
          state={this.state}
        />
      </>
    );
  }

  render() {

    const selectedSidebarItemStyle = {
      background: "linear-gradient(to right, #E926C3 10%, #FF4D86 100%)",
      "-webkit-background-clip": "text",
      WebkitTextFillColor: "transparent",
    };

    return (
      (this.props.onboard.walletConnected ? (
        <>
          <div className="w-sidebar-wrapper">
            <div className="w-sidebar-content">
              <div className="w-sidebar-header">
                <div className="w-sidebar-menu">
                  <div
                    className="w-sidebar-menu-item"
                    style={
                      this.state.selectedSidebarItem === "invest"
                        ? selectedSidebarItemStyle
                        : {}
                    }
                    onClick={() =>
                      this.setState({ selectedSidebarItem: "invest" })
                    }
                  >
                    Invest
                  </div>
                  <div
                    className="w-sidebar-menu-item"
                    style={
                      this.state.selectedSidebarItem === "withdraw"
                        ? selectedSidebarItemStyle
                        : {}
                    }
                    onClick={() =>
                      this.setState({ selectedSidebarItem: "withdraw" })
                    }
                  >
                    Withdraw
                  </div>
                </div>
              </div>
              {this.state.selectedSidebarItem === "invest" &&
                this.renderInvestCard()}
              {this.state.selectedSidebarItem === "withdraw" &&
                this.renderWithdrawCard()}
            </div>
          </div>
        </>
      ) : (
        <> </>
      ))
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.connect,
    onboard: state.onboard
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
