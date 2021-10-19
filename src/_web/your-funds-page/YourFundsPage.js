import React, { Component } from 'react';

// COMPONENTS
import Header from '../global/header/Header';
import SettingsPopup from '../global/settings-popup/SettingsPopup';
import Portfolio from '../global/portfolio/Portfolio';
import YourInvestmentFunds from '../global/your-investment-funds/YourInvestmentFunds';
import YourTransactions from '../global/your-transactions/YourTransactions';

// ASSETS
// ... 

// CSS
import './yourFundsPage.css';

class YourFundsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebar: false,
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
                    <div className="w-your-funds-page-wrapper">
                        <div className="w-your-funds-page-content">
                            <Portfolio />
                            <YourInvestmentFunds {...this.props}
                                titleFromParent='YOUR FUNDS'
                                addNewFundFromParent={true} />
                            <YourTransactions
                                titleFromParent='TRANSACTIONS'
                                displaySearchBarFromParent={true} />
                        </div>
                    </div>
                    <div style={this.state.settingsPopup === false ? doNotDisplay : {}}>
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

export default YourFundsPage;