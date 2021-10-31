import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
import { getIconSource } from "../../../../../icons";
import wethicon from "./../../assets/weth-icon.svg";

// CSS
import "../../styles/topInvestmentFunds.css";

class MostProfitableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      fundNo: this.props.fundNoFromParent,
      fundName: this.props.fundNameFromParent,
      fundAsset: this.props.fundAssetFromParent,
      fundPerformance: this.props.fundPerformanceFromParent,
    };
  }

  toPage(e, path) {
    e.preventDefault();
    this.props.history.push(path);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <>
        <div
          className="w-profitable-funds-card-row"
          onClick={(e) =>
            this.props.history.push("/fund/" + this.state.id, {
              fundName: this.state.findName,
            })
          }
        >
          <div className="w-profitable-funds-card-details-section">
            <div className="w-profitable-funds-card-details">
              {this.state.fundNo}. {this.state.fundName}
            </div>
            <div className="w-profitable-funds-card-asset-bullet">
              <img
                style={{ height: "24px", width: "24px" }}
                alt="weth-icon"
                className="profitable-funds-card-weth-icon"
                src={
                  this.state.fundAsset
                    ? getIconSource(this.state.fundAsset.toLowerCase())
                    : wethicon
                }
              />{" "}
              <div className="w-profitable-funds-card-asset-bullet-text">
                {this.state.fundAsset}
              </div>
            </div>
          </div>
          <div
            className="w-profitable-funds-card-performance"
            style={{ color: "#00AF00" }}
          >
            {this.state.fundPerformance}
          </div>
        </div>
      </>
    );
  }
}

export default MostProfitableRow;
