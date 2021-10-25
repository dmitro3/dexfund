import React, { Component } from 'react';

// COMPONENTS
import FundFactsheets from './sub-components/FundFactsheets';
import FundFees from './sub-components/FundFees';
import FundFinancials from './sub-components/FundFinancials';
import FundRuleset from './sub-components/FundRuleset';

// ASSETS
// ... 

// CSS
import './styles/fundDetails.css';

class FundDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedNavbarItem: 'factsheets',
        }
    }

    renderFactsheets() {

        return (

            <>
                <FundFactsheets />
            </>
        )
    }

    renderFees() {

        return (

            <>
                <FundFees />
            </>
        )
    }

    renderFinancials() {

        return (

            <>
                <FundFinancials />
            </>
        )
    }

    renderRuleset() {

        return (

            <>
                <FundRuleset />
            </>
        )
    }

    render() {

        const selectedNavbarItemStyle = {
            background: 'linear-gradient(to right, #E926C3 10%, #FF4D86 100%)',
            '-webkit-background-clip': 'text',
            'WebkitTextFillColor': 'transparent',
        }

        return (

            <>
                <div className="w-fund-details-wrapper">
                    <div className="w-fund-details-content">
                        <div className="w-fund-details-title">
                            DETAILS
                        </div>
                        <div className="w-fund-details-navbar">
                            <div className="w-fund-details-navbar-item"
                                style={this.state.selectedNavbarItem === 'factsheets' ? selectedNavbarItemStyle : {}}
                                onClick={() => this.setState({ selectedNavbarItem: 'factsheets' })}
                            >
                                Factsheets
                            </div>
                            <div className="w-fund-details-navbar-item"
                                style={this.state.selectedNavbarItem === 'fees' ? selectedNavbarItemStyle : {}}
                                onClick={() => this.setState({ selectedNavbarItem: 'fees' })}
                            >
                                Fees
                            </div>
                            <div className="w-fund-details-navbar-item"
                                style={this.state.selectedNavbarItem === 'financials' ? selectedNavbarItemStyle : {}}
                                onClick={() => this.setState({ selectedNavbarItem: 'financials' })}
                            >
                                Financials
                            </div>
                            <div className="w-fund-details-navbar-item"
                                style={this.state.selectedNavbarItem === 'ruleset' ? selectedNavbarItemStyle : {}}
                                onClick={() => this.setState({ selectedNavbarItem: 'ruleset' })}
                            >
                                Ruleset
                            </div>
                            <div className="w-fund-details-navbar-item"
                                style={this.state.selectedNavbarItem === 'transactions' ? selectedNavbarItemStyle : {}}
                                onClick={() => this.setState({ selectedNavbarItem: 'transactions' })}
                            >
                                Transactions
                            </div>
                            <div className="w-fund-details-navbar-item"
                                style={this.state.selectedNavbarItem === 'trades' ? selectedNavbarItemStyle : {}}
                                onClick={() => this.setState({ selectedNavbarItem: 'trades' })}
                            >
                                Trades
                            </div>
                        </div>
                        <div className="w-fund-details-info-section">
                            {this.state.selectedNavbarItem === 'factsheets' && this.renderFactsheets()}
                            {this.state.selectedNavbarItem === 'fees' && this.renderFees()}
                            {this.state.selectedNavbarItem === 'financials' && this.renderFinancials()}
                            {this.state.selectedNavbarItem === 'ruleset' && this.renderRuleset()}
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default FundDetails;
