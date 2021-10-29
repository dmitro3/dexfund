import React, { Component } from 'react';

// COMPONENTS
import YourInvestmentsTableHeader from './sub-components/YourInvestmentsTableHeader';
import YourInvestmentsTableRow from './sub-components/YourInvestmentsTableRow';

// ASSETS
// ...

// CSS
import './styles/yourInvestments.css';
import { getYourInvestmentsPerFund } from '../../../../../../../sub-graph-integrations';
import { currencyFormat } from '../../../../../../../ethereum/utils';

class YourInvestments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            asset1: '2.00',
            price1: '2000',
            value1: '20000',
            performance1: '20',

            yourFundInvestments: [],
            ...this.props.state
        }
    }

    async componentDidMount() {
        const investments = await getYourInvestmentsPerFund(this.props.state.fundId)
        console.log('1221', investments);
        const yourFundInvestments = investments.state.fundState.portfolio.holdings
        console.log(yourFundInvestments)
        this.setState({
            yourFundInvestments
        })
    }

    render() {

        return (

            <>
                <div className="w-fund-statistics-your-investments-wrapper">
                    <YourInvestmentsTableHeader />
                    {
                        this.state.yourFundInvestments.map((investment) => (
                            <YourInvestmentsTableRow 
                                assetFromParent={investment.asset.symbol}
                                amountFromParent={currencyFormat(investment.amount)}
                                priceFromParent={currencyFormat(investment.price.price)}
                                valueFromParent={currencyFormat((investment.price.price) * investment.amount)}
                                performanceFromParent='some '
                            />

                        ))
                    }

                   
                </div>
            </>
        )
    }
}

export default YourInvestments;
