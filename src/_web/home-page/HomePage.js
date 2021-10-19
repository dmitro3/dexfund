import React, { Component } from 'react';

// COMPONENTS
import Header from '../global/header/Header';
import Portfolio from '../global/portfolio/Portfolio';
import SettingsPopup from '../global/settings-popup/SettingsPopup';
import YourInvestments from './your-investments/YourInvestments';
import TopInvestmentFunds from './top-investment-funds/TopInvestmentFunds';
import YourInvestmentFunds from '../global/your-investment-funds/YourInvestmentFunds';
import YourTransactions from '../global/your-transactions/YourTransactions';

// ASSETS
// ... 

// CSS
import './homePage.css';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settingsPopup: false
        }
    }

    displaySettingsPopup = () => {
        this.setState({ settingsPopup: true })
    }

    closeSettingsPopup = () => {
        this.setState({ settingsPopup: false })
    }

    render() {

        var width = window.innerWidth;

        const doNotDisplay = {
            display: 'none',
        }

        if (width > 1000) {
            return (

                <>
                    <Header {...this.props}
                        displaySettingsPopupEvent={this.displaySettingsPopup} />
                    <div className="w-home-page-wrapper">
                        <div className="w-home-page-content">
                            <Portfolio />
                            <TopInvestmentFunds />
                            <YourInvestments />
                            <YourInvestmentFunds {...this.props}
                                titleFromParent='YOUR INVESTMENT FUNDS'
                                addNewFundFromParent={false} />
                            <YourTransactions
                                titleFromParent='YOUR TRANSACTIONS' />
                        </div>
                    </div>
                    <div
                        style={this.state.settingsPopup === false ? doNotDisplay : {}}
                    >
                        <SettingsPopup {...this.props}
                            closeSettingsPopupEvent={this.closeSettingsPopup} />
                    </div>
                </>

            )
        } else {
            return (

                <>

                </>
            )
        }
    }
}

export default HomePage;
