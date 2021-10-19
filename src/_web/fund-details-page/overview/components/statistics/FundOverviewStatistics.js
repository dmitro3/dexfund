import { TimerSharp } from '@material-ui/icons';
import React, { Component } from 'react';

// COMPONENTS
import YourInvestments from './sub-components/your-investments/YourInvestments';
import YourTransactions from './sub-components/your-transactions/YourTransactions';

// ASSETS
// ...

// CSS
import '../../styles/fundOverview.css';

class FundOverviewStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedNavbarItem: 'yourInvestments',
        }
    }

    renderYourInvestments() {

        return (

            <>
               <YourInvestments />
            </>
        )
    }

    renderYourTransactions() {

        return (

            <>
                <YourTransactions />
            </>
        )
    }

    render() {

        const selectedNavbarItemStyle = {
            background: 'linear-gradient(to right, #E926C3 10%, #FF4D86 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent'
        }

        return (

            <>
                <div className="w-fund-overview-statistics-wrapper">
                    <div className="w-fund-overview-statistics-content">
                        <div className="w-fund-overview-statistics-title">
                            STATISTICS
                        </div>
                        <div className="w-fund-overview-statistics-navbar">
                            <div className="w-fund-overview-statistics-navbar-item"
                                style={this.state.selectedNavbarItem === 'yourInvestments' ? selectedNavbarItemStyle : {}}
                                onClick={() => this.setState({ selectedNavbarItem: 'yourInvestments' })}
                            >
                                Your investments
                            </div>
                            <div className="w-fund-overview-statistics-navbar-item"
                                style={this.state.selectedNavbarItem === 'yourTransactions' ? selectedNavbarItemStyle : {}}
                                onClick={() => this.setState({ selectedNavbarItem: 'yourTransactions' })}
                            >
                                Your transactions
                            </div>
                        </div>
                        {this.state.selectedNavbarItem === 'yourInvestments' && this.renderYourInvestments()}
                        {this.state.selectedNavbarItem === 'yourTransactions' && this.renderYourTransactions()}
                    </div>
                </div>
            </>
        )
    }
}

export default FundOverviewStatistics;
