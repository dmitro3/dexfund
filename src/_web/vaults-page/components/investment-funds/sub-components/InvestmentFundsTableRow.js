import React, { Component } from "react";

import { getIconSource } from "./../../../../../icons";

// COMPONENTS
// ...

// ASSETS

class InvestmentFundsTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedValue: this.props.searchedValueFromParent,
      address: this.props.idFromParent,
      name: this.props.nameFromParent,
      type: this.props.typeFromParent,
      denominationAsset: this.props.denominationAssetFromParent,
      AUM: this.props.AUMFromParent,
      depositors: this.props.depositorsFromParent,
      lifetimeGain: this.props.lifetimeGainFromParent,
    };

    this.toPage = this.toPage.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      searchedValue: props.searchedValueFromParent,
      address: props.idFromParent,
      name: props.nameFromParent,
      type: props.typeFromParent,
      denominationAsset: props.denominationAssetFromParent,
      AUM: props.AUMFromParent,
      depositors: props.depositorsFromParent,
      lifetimeGain: props.lifetimeGainFromParent,
    })
  }

  toPage(address, params) {
    this.props.history.push("/fund/" + address);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  render() {
    var address = this.state.address;
    var name = this.state.name;

    return (
      <>
        <div
          className="w-your-transactions-table-row"
          onClick={() =>
            this.toPage(address, {
              name,
            })
          }
        >
          <div
            className="w-your-transactions-table-cell"
            style={{ width: "26.6%" }}
          >
            {this.state.name}
          </div>
          <div
            className="w-your-transactions-table-cell"
            style={{ width: "16.6%" }}
          >
            <img
              style={{ height: "24px", width: "24px" }}
              src={this.state.denominationAsset ? getIconSource(this.state.denominationAsset.toLowerCase()) : '/icons/eth.svg'}
            />{" "}
            {this.state.denominationAsset}
          </div>
          <div
            className="w-your-transactions-table-cell"
            style={{ width: "16.6%" }}
          >
            {this.state.AUM}
          </div>
          <div
            className="w-your-transactions-table-cell"
            style={{ width: "5%" }}
          >
            {this.state.depositors}
          </div>
          <div
            className="w-your-transactions-table-cell"
            style={{ width: "16.6%", textAlign: "right", color: this.state.lifetimeGain >= 0 ? "#00AF00" : "red" }}
          >
            {this.state.lifetimeGain}%
          </div>
        </div>
      </>
    );
  }
}

export default InvestmentFundsTableRow;
