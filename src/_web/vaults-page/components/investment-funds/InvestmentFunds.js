import React, { Component } from 'react';

// COMPONENTS
import InvestmentFundsTableHeader from './sub-components/InvestmentFundsTableHeader';
import InvestmentFundsTableRow from './sub-components/InvestmentFundsTableRow';

// ASSETS
// ...

// CSS
import '../../vaultsPage.css';

class InvestmentFunds extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (

            <>
                <div className="w-top-investment-funds-wrapper">
                    <div className="w-top-investment-funds-header">
                        INVESTMENT FUNDS
                    </div>
                    <InvestmentFundsTableHeader />
                    <InvestmentFundsTableRow
                        nameFromParent='Radar Swap'
                        typeFromParent='Investment'
                        denominationAssetFromParent='WETH'
                        AUMFromParent='$1.000.000,00'
                        depositorsFromParent='231'
                        lifetimeGainFromParent='21.31%'
                    />
                    <InvestmentFundsTableRow
                        nameFromParent='Radar Swap'
                        typeFromParent='Investment'
                        denominationAssetFromParent='WETH'
                        AUMFromParent='$1.000.000,00'
                        depositorsFromParent='231'
                        lifetimeGainFromParent='21.31%'
                    />
                    <InvestmentFundsTableRow
                        nameFromParent='Radar Swap'
                        typeFromParent='Investment'
                        denominationAssetFromParent='WETH'
                        AUMFromParent='$1.000.000,00'
                        depositorsFromParent='231'
                        lifetimeGainFromParent='21.31%'
                    />
                    <InvestmentFundsTableRow
                        nameFromParent='Radar Swap'
                        typeFromParent='Investment'
                        denominationAssetFromParent='WETH'
                        AUMFromParent='$1.000.000,00'
                        depositorsFromParent='231'
                        lifetimeGainFromParent='21.31%'
                    />
                    <InvestmentFundsTableRow
                        nameFromParent='Radar Swap'
                        typeFromParent='Investment'
                        denominationAssetFromParent='WETH'
                        AUMFromParent='$1.000.000,00'
                        depositorsFromParent='231'
                        lifetimeGainFromParent='21.31%'
                    />
                    <InvestmentFundsTableRow
                        nameFromParent='Radar Swap'
                        typeFromParent='Investment'
                        denominationAssetFromParent='WETH'
                        AUMFromParent='$1.000.000,00'
                        depositorsFromParent='231'
                        lifetimeGainFromParent='21.31%'
                    />
                    <InvestmentFundsTableRow
                        nameFromParent='Radar Swap'
                        typeFromParent='Investment'
                        denominationAssetFromParent='WETH'
                        AUMFromParent='$1.000.000,00'
                        depositorsFromParent='231'
                        lifetimeGainFromParent='21.31%'
                    />
                </div>
            </>
        )
    }
}

export default InvestmentFunds;