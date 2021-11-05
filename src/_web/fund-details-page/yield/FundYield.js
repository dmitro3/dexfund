import React, { Component } from "react";

// COMPONENTS
import SearchBar from "./components/SearchBar";
import MarketsTableHeader from "./components/MarketsTableHeader";
import MarketsTableRow from "./components/MarketsTableRow";

// ASSETS
// ...

// CSS
import "./styles/fundYield.css";

class FundYield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedValue: "",

      fundAddress: this.props.fundAddressFromParent,
      fundName: this.props.fundNameFromParent,
      name: "WETH",
      fullName: "Wrapped Ether",
      protocol1: "Yearn",
      protocol2: "Compound",
      protocol3: "Idle",
      protocol4: "Aave",
      balance: "2.00",
      bestAPY: "3.00",
    };
  }

  callbackFunction = (childData) => {
    this.setState({ searchedValue: childData });
  };

  render() {
    var width = window.innerWidth;

    if (width > 1000) {
      return (
        <>
          <div className="w-fund-yield-wrapper">
            <div className="w-fund-yield-header">MARKETS</div>
            <SearchBar {...this.props} parentCallback={this.callbackFunction} />
            <MarketsTableHeader />
            <MarketsTableRow
              {...this.props}
              fundAddressFromParent={this.state.fundAddress}
              fundNameFromParent={this.state.fundName}
              nameFromParent={this.state.name}
              fullNameFromParent={this.state.fullName}
              protocol1FromParent={this.state.protocol1}
              protocol2FromParent={this.state.protocol2}
              protocol3FromParent={this.state.protocol3}
              protocol4FromParent={this.state.protocol4}
              balanceFromParent={this.state.balance}
              bestAPYFromParent={this.state.bestAPY}
            />
            <MarketsTableRow
              {...this.props}
              fundAddressFromParent={this.state.fundAddress}
              nameFromParent={this.state.name}
              fullNameFromParent={this.state.fullName}
              protocol1FromParent={this.state.protocol1}
              protocol2FromParent={this.state.protocol2}
              protocol3FromParent="-"
              protocol4FromParent="-"
              balanceFromParent={this.state.balance}
              bestAPYFromParent={this.state.bestAPY}
            />
            <MarketsTableRow
              {...this.props}
              fundAddressFromParent={this.state.fundAddress}
              nameFromParent={this.state.name}
              fullNameFromParent={this.state.fullName}
              protocol1FromParent={this.state.protocol1}
              protocol2FromParent="-"
              protocol3FromParent="-"
              protocol4FromParent="-"
              balanceFromParent="-"
              bestAPYFromParent={this.state.bestAPY}
            />
            <MarketsTableRow
              {...this.props}
              fundAddressFromParent={this.state.fundAddress}
              nameFromParent={this.state.name}
              fullNameFromParent={this.state.fullName}
              protocol1FromParent={this.state.protocol1}
              protocol2FromParent={this.state.protocol2}
              protocol3FromParent={this.state.protocol3}
              protocol4FromParent={this.state.protocol4}
              balanceFromParent={this.state.balance}
              bestAPYFromParent={this.state.bestAPY}
            />
            <MarketsTableRow
              {...this.props}
              fundAddressFromParent={this.state.fundAddress}
              nameFromParent={this.state.name}
              fullNameFromParent={this.state.fullName}
              protocol1FromParent={this.state.protocol1}
              protocol2FromParent={this.state.protocol2}
              protocol3FromParent={this.state.protocol3}
              protocol4FromParent={this.state.protocol4}
              balanceFromParent={this.state.balance}
              bestAPYFromParent={this.state.bestAPY}
            />
            <MarketsTableRow
              {...this.props}
              fundAddressFromParent={this.state.fundAddress}
              nameFromParent={this.state.name}
              fullNameFromParent={this.state.fullName}
              protocol1FromParent={this.state.protocol1}
              protocol2FromParent={this.state.protocol2}
              protocol3FromParent={this.state.protocol3}
              protocol4FromParent={this.state.protocol4}
              balanceFromParent={this.state.balance}
              bestAPYFromParent={this.state.bestAPY}
            />
            <MarketsTableRow
              {...this.props}
              fundAddressFromParent={this.state.fundAddress}
              nameFromParent={this.state.name}
              fullNameFromParent={this.state.fullName}
              protocol1FromParent={this.state.protocol1}
              protocol2FromParent={this.state.protocol2}
              protocol3FromParent={this.state.protocol3}
              protocol4FromParent={this.state.protocol4}
              balanceFromParent={this.state.balance}
              bestAPYFromParent={this.state.bestAPY}
            />
            <MarketsTableRow
              {...this.props}
              fundAddressFromParent={this.state.fundAddress}
              nameFromParent={this.state.name}
              fullNameFromParent={this.state.fullName}
              protocol1FromParent={this.state.protocol1}
              protocol2FromParent={this.state.protocol2}
              protocol3FromParent={this.state.protocol3}
              protocol4FromParent={this.state.protocol4}
              balanceFromParent={this.state.balance}
              bestAPYFromParent={this.state.bestAPY}
            />
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default FundYield;
