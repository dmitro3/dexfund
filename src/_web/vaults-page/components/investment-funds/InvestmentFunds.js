import React from 'react';

// COMPONENTS
import InvestmentFundsTableHeader from './sub-components/InvestmentFundsTableHeader';
import InvestmentFundsTableRow from './sub-components/InvestmentFundsTableRow';

// ASSETS
// ...

// CSS
import '../../vaultsPage.css';
import axios from 'axios';

class InvestmentFunds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            investments: []
        }
    }

    componentDidMount() {
        // const url = 'https://api.thegraph.com/subgraphs/name/trust0212/radar-graph'
        const url = "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme";



        axios.post(
            url,
            {
                query: `
                {
                    funds(first: 5, orderBy: lastKnowGavInEth, orderDirection: desc) {
                      id
                      name
                      investmentCount
                      lastKnowGavInEth
                      trackedAssets {
                        name
                        symbol
                      }
                    }
                  }
                `
            }
        ).then((response) => {
            const investments = response.data.data.funds
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
        return (

            <>
                <div className="w-top-investment-funds-wrapper">
                    <div className="w-top-investment-funds-header">
                        INVESTMENT FUNDS
                    </div>
                    <InvestmentFundsTableHeader />
                    {
                        this.state.investments.map((investment) =>
                            <InvestmentFundsTableRow key={investment.id}
                                idFromParrent={investment.id}
                                nameFromParent={investment.name}
                                typeFromParent='Investment'
                                denominationAssetFromParent={investment.trackedAssets[0].symbol}
                                AUMFromParent={investment.lastKnowGavInEth}
                                depositorsFromParent={investment.investmentCount}
                                lifetimeGainFromParent='21.31%'
                            />
                        )
                    }
                </div>
            </>
        )
    }
}

export default InvestmentFunds;