import React from "react";

// COMPONENTS
import InvestmentFundsTableHeader from "./sub-components/InvestmentFundsTableHeader";
import InvestmentFundsTableRow from "./sub-components/InvestmentFundsTableRow";
import SearchBar from "./../../../global/your-transactions/components/SearchBar";
import SkeletonLoader from "./../../../global/skeleton-loader/SkeletonLoader";
// ASSETS
// ...

// CSS
import "../../vaultsPage.css";
import { currencyFormat } from "../../../../ethereum/utils";


class InvestmentFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      isLoaded: this.props.isLoaded,
      ethPrice: 1
    };

    this.searchCallbackFunction = this.searchCallbackFunction.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isLoaded != this.state.isLoaded) {
      this.setState({ isLoaded: this.props.isLoaded });
    }

    if (this.props.ethPrice != this.state.ethPrice) {
      this.setState({
        ethPrice: this.props.ethPrice
      })
    }
  }

  toPage(path) {
    this.props.history.push(path);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  tableRender() {
    if (this.state.isLoaded) {
      if (this.props.investments.length > 0) {
        return this.renderFunds();
      } else {
        return this.renderNoFunds();
      }
    } else {
      return this.renderLoading();
    }
  }

  searchCallbackFunction(v) {
    this.setState({
      searchValue: v,
    });
  }

  renderNoFunds() {
    return (
      <div
        className="w-your-transactions-table-row-no-data"
        style={{ textAlign: "center", color: "white" }}
      >
        There are no active funds
      </div>
    );
  }

  async componentDidMount() {
    this.setState({
      ...this.state,
      ethPrice: this.props.ethPRice
    })
  }

  renderFunds() {
    return (
      <div style={{ overflowY: "scroll", height: "60vh" }}>
        {this.props.investments.map((investment, index) => {
          if (
            investment.name
              .toLowerCase()
              .includes(this.state.searchValue.toLowerCase()) ||
            investment.trackedAssets[0].symbol
              .toLowerCase()
              .includes(this.state.searchValue.toLowerCase()) ||
            this.state.searchValue === ""
          ) {
            const aum = investment.currentAUM;
            const ltr = investment.ltr;
            return (
              <InvestmentFundsTableRow
                key={index}
                idFromParent={investment.id}
                nameFromParent={investment.name}
                typeFromParent="Investment"
                denominationAssetFromParent={investment.accessor.denominationAsset.symbol}
                // AUMFromParent={investment.lastKnowGavInEth}
                AUMFromParent={currencyFormat(aum * this.state.ethPrice, "")}
                depositorsFromParent={investment.investmentCount}
                lifetimeGainFromParent={ltr.toFixed(2) + "CHANGE ME"}
                {...this.props}
              />
            );
          }
        })}
      </div>
    );
  }

  renderLoading() {
    return <SkeletonLoader rows={10} rowHeight={60} />;
  }

  render() {
    return (
      <>
        <div className="w-top-investment-funds-wrapper">
          <div className="w-top-investment-funds-header">
            ALL INVESTMENT FUNDS
          </div>
          <SearchBar
            parentCallback={this.searchCallbackFunction}
            defaultValue="Search for a Fund Name or Denomination Asset"
          />
          <InvestmentFundsTableHeader />

          {this.tableRender()}
        </div>
      </>
    );
  }
}

export default InvestmentFunds;
