import React, { Component } from 'react';

// COMPONENTS
import YourInvestmentsTableHeader from './components/YourInvestmentsTableHeader';
import YourinvestmentsTableRow from './components/YourInvestmentsTableRow';

// ASSETS
// ...

// CSS
import './styles/yourInvestments.css';
import { getYourInvestments } from '../../../sub-graph-integrations';

// REDUX


class YourInvestments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            investments: []
        }
    }
    async componentDidMount() {
        const investments = await getYourInvestments();
        this.setState({
            investments
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
                            this.state.investments.map((investment,index) => 

                                <YourinvestmentsTableRow key={index}
                                    fundNameFromParent={investment.fund.name}
                                    yourDepositsFromParent={investment.investmentAmount}
                                    currentValueFromParent={investment.investmentState.shares}
                                    performanceFromParent={(((investment.investmentAmount - investment.investmentState.shares) / investment.investmentAmount) * 100).toFixed(2)}
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