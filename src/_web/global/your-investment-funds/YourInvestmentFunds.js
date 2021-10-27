import React, { Component } from 'react';
import axios from 'axios';

// COMPONENTS
import YourInvestmentFundsCard from './components/YourInvestmentFundsCard';

// ASSETS
import addIcon from './assets/add-icon.svg';

// CSS
import './styles/yourInvestmentFunds.css';
import { getYourInvestments } from '../../../sub-graph-integrations';

class YourInvestmentFunds extends Component {

    constructor(props) {
        super(props);

        this.state = {

            title: this.props.titleFromParent,
            addNewFund: this.props.addNewFundFromParent,

            // DATA
            yourInvestments: []
        }
    }
    async componentDidMount() {
        const yourInvestments = await getYourInvestments();
        console.log("i", yourInvestments);
        this.setState({
            yourInvestments
        })
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
                    {  this.state.yourInvestments.map((investment) => 

                        <YourInvestmentFundsCard {...this.props} key={investment.index}
                            fundAddressFromParent={investment.fund.id}
                            fundsFromParent={investment.investmentAmount}
                            performanceFromParent={((investment.investmentAmount - investment.investmentState.shares) / investment.investmentAmount) * 100}
                            fundNameFromParent={investment.fund.name}
                            sharePriceDataFromParent={investment.investmentState.shares}
                        />
                    )
                    }
                    </div>
                </div>
            </>
        )
    }
}

export default YourInvestmentFunds;