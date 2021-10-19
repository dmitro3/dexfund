import React, { Component } from 'react';

// COMPONENTS
import MostProfitableRow from './sub-components/MostProfitableRow';

// ASSETS
// ...

// CSS
import '../styles/topInvestmentFunds.css';

class MostProfitableThisMonth extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (

            <>
                <div className="w-profitable-funds-card">
                    <div className="w-profitable-funds-card-header">
                        <div className="w-profitable-funds-card-title">
                            MOST PROFITABLE THIS MONTH
                        </div>
                        <div className="w-profitable-funds-card-see-all">
                            See all
                        </div>
                    </div>
                    <MostProfitableRow 
                        fundNoFromParent='1'
                        fundNameFromParent='Radar Swap'
                        fundAssetFromParent='WETH'
                        fundPerformanceFromParent='4.30%'
                    />
                    <MostProfitableRow 
                        fundNoFromParent='2'
                        fundNameFromParent='Radar Swap'
                        fundAssetFromParent='WETH'
                        fundPerformanceFromParent='4.30%'
                    />
                    <MostProfitableRow 
                        fundNoFromParent='3'
                        fundNameFromParent='Radar Swap'
                        fundAssetFromParent='WETH'
                        fundPerformanceFromParent='4.30%'
                    />
                    <MostProfitableRow 
                        fundNoFromParent='4'
                        fundNameFromParent='Radar Swap'
                        fundAssetFromParent='WETH'
                        fundPerformanceFromParent='4.30%'
                    />
                    <MostProfitableRow 
                        fundNoFromParent='5'
                        fundNameFromParent='Radar Swap'
                        fundAssetFromParent='WETH'
                        fundPerformanceFromParent='4.30%'
                    />
                </div>
            </>
        )
    }
}

export default MostProfitableThisMonth;