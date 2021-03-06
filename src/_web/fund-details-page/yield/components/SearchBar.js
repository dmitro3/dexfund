import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import searchIcon from '../assets/search-icon.svg';

// CSS
import '../styles/fundYield.css';

class InvestmentFunds extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 'Search a pool, a protocol or APY',
        }
    }

    inputField = (e) => {

        if (e.target.value =='') {
            this.setState({ value: 'Search a pool, a protocol or APY' });
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
                                    width: '320px',
                                    height: '100%',
                                    borderWidth: '0px 0px 0px 0px',
                                    backgroundColor: '#fff',
                                    color: '#222',
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