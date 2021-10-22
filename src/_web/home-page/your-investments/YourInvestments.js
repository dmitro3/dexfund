import React, { Component } from 'react';
import axios from 'axios';

// COMPONENTS
import YourInvestmentsTableHeader from './components/YourInvestmentsTableHeader';
import YourinvestmentsTableRow from './components/YourInvestmentsTableRow';

// ASSETS
// ...

// CSS
import './styles/yourInvestments.css';

class YourInvestments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fundName: 'Initial',
            yourDeposits: '$1.000.000,00',
            currentValue: '$1.100.000,00',
            performance: '+10%',
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
                sharesBoughtEvents(where:  {investor_contains: ${investorAddr}}){
                    investmentAmount
                    investmentState {
                        shares
                    }
                    fund {
                        name
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
    render() {

        return (

            <>
                <div className="w-your-investments-wrapper">
                    <div className="w-your-investments-header">
                        YOUR INVESTMENTS
                    </div>
                    <div className="w-your-investments-table">
                        <YourInvestmentsTableHeader />
                        {
                            this.state.investments.map((investment) => 

                                <YourinvestmentsTableRow
                                    fundNameFromParent={investment.fund.name}
                                    yourDepositsFromParent={investment.investmentAmount}
                                    currentValueFromParent={investment.investmentState.shares}
                                    performanceFromParent={((investment.investmentAmount - investment.investmentState.shares) / investment.investmentAmount) * 100}
                                />
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default YourInvestments;