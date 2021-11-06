import React, { Component } from "react";

// COMPONENTS
import SearchBar from "./components/SearchBar";
import PoolsTableHeader from "./components/PoolsTableHeader";
import PoolsTableRow from "./components/PoolsTableRow";
import FundDetailsPopup from "../fund-details-popup/FundDetailsPopup";
import { getTokenBalance } from "./../../../ethereum/utils/common";

// ASSETS
// ...

// CSS
import "./styles/fundProvideLiquidity.css";

// Liquidity Pools Querry
import { getLiquidityPools } from "../../../sub-graph-integrations";

class FundProvideLiquidity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liquidityPools: [],
    };
  }

  async componentDidMount() {
    const liquidityPools = await getLiquidityPools();

    liquidityPools.forEach(async (pool) => {
      const assetA = pool.token0.id;
      const assetB = pool.token1.id;

      //

      liquidityPools["asset0Balance"] = await getTokenBalance(assetA);
      liquidityPools["asset1Balance"] = await getTokenBalance(assetB);
    });

    this.setState({
      liquidityPools,
    });
  }

  callbackFunction = (childData) => {
    this.setState({ searchedValue: childData });
  };

  displayDepositPopup = () => {
    this.setState({ depositPopup: true, withdrawPopup: false });
  };

  closeDepositPopup = () => {
    this.setState({ depositPopup: false, withdrawPopup: false });
  };

  displayWithdrawPopup = () => {
    this.setState({ withdrawPopup: true, depositPopup: false });
  };

  closeWithdrawPopup = () => {
    this.setState({ withdrawPopup: false, depositPopup: false });
  };

  renderDepositPopup() {
    return (
      <>
        <FundDetailsPopup
          {...this.props}
          closePopupEvent={this.closeDepositPopup}
          titleFromParent="DEPOSIT"
          subtitleFromParent="Amount to deposit"
          token1FromParent={this.state.token1}
          token2FromParent={this.state.token2}
          token3FromParent={this.state.token3}
        />
      </>
    );
  }

  renderWithdrawPopup() {
    return (
      <>
        <FundDetailsPopup
          {...this.props}
          closePopupEvent={this.closeWithdrawPopup}
          titleFromParent="WITHDRAW"
          subtitleFromParent="Amount to withdraw"
          token1FromParent={this.state.yourAssetsToken}
          token2FromParent=""
          token3FromParent=""
        />
      </>
    );
  }

  render() {
    var width = window.innerWidth;

    if (width > 1000) {
      return (
        <>
          <div className="w-fund-provide-liquidity-wrapper">
            <div className="w-fund-provide-liquidity-header">POOLS</div>
            <SearchBar {...this.props} parentCallback={this.callbackFunction} />
            <PoolsTableHeader />
            {this.state.liquidityPools.map((pool) => (
              <PoolsTableRow
                {...this.props}
                key={pool.id}
                displayDepositPopupEvent={this.displayDepositPopup}
                displayWithdrawPopupEvent={this.displayWithdrawPopup}
                token1FromParent={pool.token0.symbol}
                token2FromParent={pool.token1.symbol}
                token3FromParent=""
                exchangeFromParent="Uniswapv2"
                poolSizeFromParent=""
                totalAPYFromParent={this.state.totalAPY}
                yourAssetsFromParent={pool.token0.symbol}
                yourAssetsTokenFromParent={pool.asset0Balance}
                yourAssetsFromParent1={pool.token1.symbol}
                yourAssetsTokenFromParent1={pool.asset1Balance}
              />
            ))}
          </div>
          {this.state.depositPopup === true && this.renderDepositPopup()}
          {this.state.withdrawPopup === true && this.renderWithdrawPopup()}
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default FundProvideLiquidity;
