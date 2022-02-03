import React, { Component } from "react";

// COMPONENTS

// ...

// ASSETS
import searchIcon from "../assets/search-icon.svg";

// CSS
import "../styles/yourTransactions.css";
import { Filter } from "react-bootstrap-icons";
import Select from 'react-select';
import { Fragment } from "react";



class InvestmentFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.defaultValue,
      sortOption: this.props.sortOptions[1],
      sortDirectionOption: this.props.sortDirectionOptions[0]
    };
  }

  rewriteField() {
    if (this.state.value === "") {
      this.setState({
        value: this.props.defaultValue
      })
    }
  }

  inputField = (e) => {

    var value = e.target.value;
    this.setState({ value: value });

    this.props.parentCallback(value);
  };

  clearInputValue = () => {
    if (this.state.value === this.props.defaultValue) {
      this.setState({ value: "" });
      this.props.parentCallback("")
    }
  };

  handleSortChange = (selectedOption) => {
    this.setState({ sortOption: selectedOption });
    if (this.props.handleSortOptionChange) {
      this.props.handleSortOptionChange(selectedOption);
    }
  }

  handleSortDirectionChange = (selectedOption) => {
    this.setState({ sortDirectionOption: selectedOption });
    if (this.props.handleSortDirectionOptionChange) {
      this.props.handleSortDirectionOptionChange(selectedOption);
    }
  }

  render() {
    return (
      <>
        <div className="w-search-bar-wrapper">
          <div className="w-search-bar">
            <img
              src={searchIcon}
              alt="search-icon"
              className="investment-funds-search-icon"
            />
            <div className="w-search-bar-input">
              <input
                type="text"
                id="your-transactions-search-bar"
                name="yourTransactionsSearchBar"
                value={this.state.value}
                onChange={(e) => this.inputField(e)}
                onFocus={() => this.clearInputValue()}
                onBlur={() => this.rewriteField()}
                className="search-bar-input"
                
              />
            </div>
          </div>
          <div className="searchbar-sort-layout">
            <label className="label">Sort by: </label>
            <div className="filter-input">
            <Fragment>
              <Select
                className="sort-option"
                classNamePrefix="select"
                defaultValue={this.state.sortOption}
                isClearable={true}
                isSearchable={true}
                name="sortOption"
                onChange={this.handleSortChange}
                options={this.props.sortOptions}
              />
            </Fragment>
            </div>
            <div className="filter-input">
            <Fragment>
              <Select
                className="sort-direction-option"
                classNamePrefix="select"
                defaultValue={this.state.sortDirectionOption}
                isClearable={true}
                isSearchable={true}
                name="sortDirectionOption"
                onChange={this.handleSortDirectionChange}
                options={this.props.sortDirectionOptions}
              />
            </Fragment>
            </div>
            
          </div>
        </div>
      </>
    );
  }
}

export default InvestmentFunds;
