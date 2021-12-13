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
import { getTopAsset } from "../../../../ethereum/funds/fund-related";

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'aum', label: 'AUM' },
  { value: 'depositor', label: 'Depositor' },
  { value: 'ltr', label: 'Lifetime Gain' }
]

const sortDirectionOptions = [
  {value: 'desc', label: 'DESC'},
  {value: 'asc', label: 'ASC'}
]

class InvestmentFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      isLoaded: this.props.isLoaded,
      ethPrice: 1,
      sortOption: sortOptions[1],
      sortDirectionOption: sortDirectionOptions[0],
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

  tableRender(sortOption, sortDirectionOption) {
    if (this.state.isLoaded) {
      if (this.props.investments.length > 0) {
        return this.renderFunds(sortOption, sortDirectionOption);
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
        style={{ textAlign: "center", color: "#292A32" }}
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

  renderFunds(sortOption, sortDirectionOption) {
    var funds = this.props.investments || [];
    sortDirectionOption = sortDirectionOption || {};
    sortOption = sortOption || {};
    
    funds.sort((a, b) => {
      switch(sortOption.value) {
        case 'name':
          if (a.name > b.name) {
            return sortDirectionOption.value === 'asc' ? 1 : -1;
          } else if (a.name < b.name) {
            return sortDirectionOption.value === 'asc' ? -1 : 1;
          } else {
            return 0;
          }
        case 'aum':
          if (a.currentAUM > b.currentAUM ) {
            return sortDirectionOption.value === 'asc' ? 1 : -1;
          } else if (a.currentAUM  < b.currentAUM ) {
            return sortDirectionOption.value === 'asc' ? -1 : 1;
          } else {
            return 0;
          }
        case 'depositor':
          if (a.investmentCount > b.investmentCount) {
            return sortDirectionOption.value === 'asc' ? 1 : -1;
          } else if (a.investmentCount < b.investmentCount) {
            return sortDirectionOption.value === 'asc' ? -1 : 1;
          } else {
            return 0;
          }
        case 'ltr':
          if (a.ltr > b.ltr) {
            return sortDirectionOption.value === 'asc' ? 1 : -1;
          } else if (a.ltr < b.ltr) {
            return sortDirectionOption.value === 'asc' ? -1 : 1;
          } else {
            return 0;
          }
        default:
          return 0;
      }
    });
    funds = sortOption.value === 'name' ? funds.reverse() : funds;
    return (
      <div style={{ overflowY: "auto", height: "50vh" }}>
        {funds.map((investment, index) => {
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
            const topAsset = getTopAsset(investment);
            return (
              <InvestmentFundsTableRow
                key={index}
                idFromParent={investment.id}
                nameFromParent={investment.name}
                typeFromParent="Investment"
                denominationAssetFromParent={topAsset.symbol}
                AUMFromParent={currencyFormat(aum * this.state.ethPrice, "")}
                depositorsFromParent={investment.investmentCount}
                lifetimeGainFromParent={ltr.toFixed(2)}
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

  handleSortOptionChange = (sortOption) => {
    this.setState({sortOption});
  }
  handleSortDirectionOptionChange = (sortDirectionOption) => {
    this.setState({sortDirectionOption});
  }
  render() {
    return (
      <>
        <div className="w-investment-funds-wrapper">
          <div className="w-top-investment-funds-header">
            Browse Dexify
          </div>
          <SearchBar
            parentCallback={this.searchCallbackFunction}
            defaultValue="Search Dexfunds"
            handleSortOptionChange={this.handleSortOptionChange}
            handleSortDirectionOptionChange={this.handleSortDirectionOptionChange}
            sortOptions={sortOptions}
            sortDirectionOptions={sortDirectionOptions}
          />
          <div className="investment-funds-container">
            <InvestmentFundsTableHeader />
            {this.tableRender(this.state.sortOption, this.state.sortDirectionOption)}
          </div>

        </div>
      </>
    );
  }
}

export default InvestmentFunds;
