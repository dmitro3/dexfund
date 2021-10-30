import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
import DAIIcon from "../assets/DAI.png";
import USDCIcon from "../assets/USDC.png";
import USDTIcon from "../assets/USDT.png";
import depositIcon from "../assets/deposit-icon.svg";
import withdrawIcon from "../assets/withdraw-icon.svg";

// CSS
import "../styles/fundProvideLiquidity.css";

class PoolsTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token1: this.props.token1FromParent,
      token2: this.props.token2FromParent,
      token3: this.props.token3FromParent,
      exchange: this.props.exchangeFromParent,

      poolSize: this.props.poolSizeFromParent,
      totalAPY: this.props.totalAPYFromParent,
      yourAssets: this.props.yourAssetsFromParent,
      yourAssetsToken: this.props.yourAssetsTokenFromParent,
      yourAssets1: this.props.yourAssetsFromParent1,
      yourAssetsToken1: this.props.yourAssetsTokenFromParent1,
    };
  }

  displayDepositPopup = () => {
    this.props.displayDepositPopupEvent();
  };

  displayWithdrawPopup = () => {
    this.props.displayWithdrawPopupEvent();
  };

  render() {
    const doNotDisplay = {
      display: "none",
    };

    return (
      <>
        <div className="w-pools-table-row">
          <div className="w-pools-table-row-cell tokens">
            <div className="w-pools-table-tokens-cell">
              <div className="w-pools-token-cell-icons-section">
                <img
                  src={DAIIcon}
                  alt="dai-icon"
                  className="w-pools-token-cell-icon"
                />
                <img
                  src={USDCIcon}
                  alt="usdc-icon"
                  className="w-pools-token-cell-icon"
                />
                <img
                  src={USDTIcon}
                  alt="USDT-icon"
                  className="w-pools-token-cell-icon"
                />
              </div>
              <div className="w-pools-token-cell-text-section">
                <div className="w-pools-token-cell-tokens-text">
                  <div className="w-pools-token-cell-token">
                    {this.state.token1}&nbsp; - &nbsp;
                  </div>
                  <div className="w-pools-token-cell-token">
                    {this.state.token2}
                  </div>
                  <div className="w-pools-token-cell-token">
                    {this.state.token3}
                  </div>
                </div>
                <div className="w-pools-token-cell-exchange">
                  {this.state.exchange}
                </div>
              </div>
            </div>
          </div>
          <div className="w-pools-table-row-cell pool-size">
            ${this.state.poolSize}
          </div>
          <div className="w-pools-table-row-cell total-apy">
            {this.state.totalAPY}%
          </div>
          <div className="w-pools-table-row-cell your-assets">
            <div>
              {this.state.yourAssets} {this.state.yourAssetsToken}
            </div>
            <div>
              {this.state.yourAssets1} - {this.state.yourAssetsToken1}
            </div>
          </div>
          <div className="w-pools-table-row-cell deposit">
            <div className="">
              <div
                className="w-pools-withdraw-button"
                style={this.state.yourAssets === "-" ? doNotDisplay : {}}
                onClick={() => this.displayWithdrawPopup()}
              >
                <img
                  src={withdrawIcon}
                  alt="withdraw-icon"
                  className="w-pools-withdraw-icon"
                />
                <div className="w-pools-withdraw-button-text">WITHDRAW</div>
              </div>
              <div
                className="w-pools-deposit-button"
                onClick={() => this.displayDepositPopup()}
              >
                <img
                  src={depositIcon}
                  alt="deposit-icon"
                  className="w-pools-deposit-icon"
                />
                <div className="w-pools-deposit-button-text">DEPOSIT</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PoolsTableRow;
