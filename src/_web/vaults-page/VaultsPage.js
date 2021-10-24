import React, { Component } from 'react';

//REDUX 
import {connect}  from 'react-redux'
import {activateLoaderOverlay, deactivateLoaderOverlay}  from  './../../redux/actions/LoaderAction'


// COMPONENTS
import Header from '../global/header/Header';
import SettingsPopup from '../global/settings-popup/SettingsPopup';
import TopInvestmentFunds from '../home-page/top-investment-funds/TopInvestmentFunds';
import InvestmentFunds from './components/investment-funds/InvestmentFunds';

// ASSETS
// ... 

// CSS
import './vaultsPage.css';
import '../your-funds-page/yourFundsPage.css';

// QUERYS
import {getAllInvestments}  from './../../sub-graph-integrations/index'

class VaultsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebar: false,
            settingsPopup: false,
            investments: []
        }
    }

    async componentDidMount() {
        this.props.activateLoaderOverlay()
        const investments =  await getAllInvestments();
        this.setState({
            ...this.state,
            investments:  investments
        })
        this.props.deactivateLoaderOverlay();

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
                    <div className="w-your-funds-page-wrapper" style={{padding: '60px 0 120px 0'}}>
                        <div className="w-your-funds-page-content">
                            <TopInvestmentFunds {...this.props} />
                            <InvestmentFunds investments={this.state.investments} />
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


const mapStateToProps = (state) => {
    return {
        account: state.connect,
    };
};


const mapDispatchToProps = {
    activateLoaderOverlay, 
    deactivateLoaderOverlay
};


export default connect(mapStateToProps, mapDispatchToProps)(VaultsPage);
