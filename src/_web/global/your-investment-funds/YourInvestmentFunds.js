import React, { Component } from 'react';
import axios from 'axios';

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
            investments: []
        }
    }

    componentDidMount() {
        // const url = 'https://api.thegraph.com/subgraphs/name/trust0212/radar-graph'
        const url = "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme";

        const investorAddr = '"0x028a968aca00b3258b767edc9dbba4c2e80f7d00"'

        const investmentQuery = {
            query: `
            { 
                sharesBoughtEvents(first: 4,where:  {investor_contains: ${investorAddr}}){
                    investmentAmount
                    investmentState {
                        shares
                    }
                    fund {
                        name
                        id
                    }
                    investor {
                        firstSeen
                        investorSince
                    }
                } 
            }
        
            `
        }


        axios.post(
            url,
            investmentQuery
        ).then((response) => {
            const investments = response.data.data.sharesBoughtEvents
            console.log('investing', investments);

            this.setState({
                ...this.state,
                investments
            })
        }).catch((err) => {
            console.log("Error: ", err);
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
                    {  this.state.investments.map((investment) => 

                        <YourInvestmentFundsCard {...this.props}
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