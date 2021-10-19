import { thisTypeAnnotation } from '@babel/types';
import React, { Component } from 'react';

// COMPONENTS
import YourInvestmentFundsCard from './components/YourInvestmentFundsCard';

// ASSETS
import addIcon from './assets/add-icon.svg';

// CSS
import './styles/yourInvestmentFunds.css';

class YourInvestmentFunds extends Component {

    constructor(props) {
        super(props);

        this.state = {

            title: this.props.titleFromParent,
            addNewFund: this.props.addNewFundFromParent,

            // DATA
            fundAddress1: '1',
            funds1: '2,4123.23',
            performance1: '4.30',
            fundName1: 'RADAR SWAP',

            fundAddress2: '2',
            funds2: '2,4123.23',
            performance2: '4.30',
            fundName2: 'RADAR SWAP',

            fundAddress3: '3',
            funds3: '2,4123.23',
            performance3: '4.30',
            fundName3: 'RADAR SWAP',

            fundAddress4: '4',
            funds4: '2,4123.23',
            performance4: '4.30',
            fundName4: 'RADAR SWAP',
        }
    }

    toPage(path) {
        this.props.history.push(path);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    render() {

        const doNotDisplay = {
            display: 'none',
        }

        return (

            <>
                <div className="w-your-investment-funds-wrapper">
                    <div className="w-your-investment-funds-header">
                        <div className="w-your-investment-funds-title">
                            {this.state.title}
                        </div>
                        <div className="w-your-investment-add-new-fund-button"
                            style={this.state.addNewFund === false ? doNotDisplay : {}}
                            onClick={() => this.toPage('/add-new-fund')}
                        >
                            <img src={addIcon} alt='add-icon' className="add-new-fund-add-icon" />
                            <div className="w-your-investment-add-new-fund-button-text">
                                ADD NEW FUND
                            </div>
                        </div>
                    </div>
                    <div className="w-your-investments-cards-section">
                        <YourInvestmentFundsCard {...this.props}
                            fundAddressFromParent={this.state.fundAddress1}
                            fundsFromParent={this.state.funds1}
                            performanceFromParent={this.state.performance1}
                            fundNameFromParent={this.state.fundName1}
                            sharePriceDataFromParent={this.state.sharePriceChartData1}
                        />
                        <YourInvestmentFundsCard {...this.props}
                            fundAddressFromParent={this.state.fundAddress2}
                            fundsFromParent={this.state.funds2}
                            performanceFromParent={this.state.performance2}
                            fundNameFromParent={this.state.fundName2}
                            sharePriceDataFromParent={this.state.sharePriceChartData2}
                        />
                        <YourInvestmentFundsCard {...this.props}
                            fundAddressFromParent={this.state.fundAddress3}
                            fundsFromParent={this.state.funds3}
                            performanceFromParent={this.state.performance3}
                            fundNameFromParent={this.state.fundName3}
                            sharePriceDataFromParent={this.state.sharePriceChartData3}
                        />
                        <YourInvestmentFundsCard {...this.props}
                            fundAddressFromParent={this.state.fundAddress4}
                            fundsFromParent={this.state.funds4}
                            performanceFromParent={this.state.performance4}
                            fundNameFromParent={this.state.fundName4}
                            sharePriceDataFromParent={this.state.sharePriceChartData4}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default YourInvestmentFunds;