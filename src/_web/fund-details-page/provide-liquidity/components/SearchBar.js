import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import searchIcon from '../assets/search-icon.svg';

// CSS
import '../styles/fundProvideLiquidity.css';

class InvestmentFunds extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 'Search a token, a fund, anything',
        }
    }

    inputField = (e) => {

        if (e.target.value == '') {
            this.setState({ value: 'Search a token, a fund, anything' });
            this.props.parentCallback('');
            return;
        }

        var value = e.target.value;
        this.setState({ value: value });
        
        this.props.parentCallback(value);
    }

    clearInputValue = () => {
        this.setState({ value: '' });
    }

    render() {

        return (

            <>
                <div className="w-search-bar-wrapper">
                    <div className="w-search-bar">
                        <img src={searchIcon} alt='search-icon' className="investment-funds-search-icon" />
                        <div className="w-search-bar-input">
                            <input type="text" id="your-transactions-search-bar" name="yourTransactionsSearchBar"
                                value={this.state.value}
                                onChange={(e) => this.inputField(e)}
                                onFocus={() => this.clearInputValue()}
                                style={{
                                    marginTop: '9px',
                                    width: '700px',
                                    borderWidth: '0px 0px 0px 0px',
                                    backgroundColor: '#020202',
                                    color: '#999',
                                    fontFamily: 'Bai Jamjuree, sans-serif',
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    outline: 'none',
                                    textAlign: 'left'
                                }}>
                            </input>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default InvestmentFunds;