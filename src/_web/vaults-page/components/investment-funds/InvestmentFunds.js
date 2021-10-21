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
        const url = 'https://api.thegraph.com/subgraphs/name/trust0212/radar-graph'


        axios.post(
            url,
            {
                query: `
                {
                    funds {
                      id
                      name
                      investmentCount
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
                            <InvestmentFundsTableRow
                                idFromParrent={investment.id}   
                                nameFromParent={investment.name}
                                typeFromParent='Investment'
                                denominationAssetFromParent={investment.trackedAssets[0].symbol}
                                AUMFromParent='$1.000.000,00'
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