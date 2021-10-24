import React from 'react';

// COMPONENTS
import InvestmentFundsTableHeader from './sub-components/InvestmentFundsTableHeader';
import InvestmentFundsTableRow from './sub-components/InvestmentFundsTableRow';

// ASSETS
// ...

// CSS
import '../../vaultsPage.css';

class InvestmentFunds extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }


        console.log(props)
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
                <div className="w-top-investment-funds-wrapper" >
                    <div className="w-top-investment-funds-header">
                        INVESTMENT FUNDS
                    </div>
                    <InvestmentFundsTableHeader />

                    this.props.investments ?
                    ({
                        this.props.investments.map((investment) =>
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
                    }) : (<InvestmentFundsTableRow > </InvestmentFundsTableRow>)
                </div>
            </>
        )
    }
}

export default InvestmentFunds;