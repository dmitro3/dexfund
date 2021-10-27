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
    }

    toPage(path) {
        this.props.history.push(path);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    tableRender() {
        if (this.props.investments.length > 0) {
            return this.renderFunds();
        } else {
            return this.renderNoFunds();
        }
    }

    renderNoFunds() {
        return (
            <div
            className="w-your-transactions-table-row-no-data"
            style={{textAlign: "center", color: "white"}}
            >
                There are no active funds yet
            </div>
        )
    }

    renderFunds() {
        return (
            <div style={{overflowY: "scroll", height: "80vh"}}>
                    {
                        this.props.investments.map((investment, index) =>
                            <InvestmentFundsTableRow key={index}
                                idFromParent={investment.id}
                                nameFromParent={investment.name}
                                typeFromParent='Investment'
                                denominationAssetFromParent={investment.trackedAssets[0].symbol}
                                // AUMFromParent={investment.lastKnowGavInEth}
                                AUMFromParent="INTERNAL_API"
                                depositorsFromParent={investment.investmentCount}
                                lifetimeGainFromParent='0.00%'
                                {...this.props}
                            />
                        )
                    }
                    </div>
        )
    }

    render() {
        return (

            <>
                <div className="w-top-investment-funds-wrapper" >
                    <div className="w-top-investment-funds-header">
                        ALL INVESTMENT FUNDS
                    </div>
                    <InvestmentFundsTableHeader />

                    {this.tableRender()}
                </div>
            </>
        )
    }
}

export default InvestmentFunds;