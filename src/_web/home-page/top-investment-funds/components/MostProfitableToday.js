import React, { Component } from 'react';

// COMPONENTS
import MostProfitableRow from './sub-components/MostProfitableRow';

// ASSETS
// ...

// CSS
import '../styles/topInvestmentFunds.css';

class MostProfitableToday extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    toPage(e, path) {
        e.preventDefault();
        this.props.history.push(path);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }

    render() {

        return (

            <>
                <div className="w-profitable-funds-card">
                    <div className="w-profitable-funds-card-header">
                        <div className="w-profitable-funds-card-title">
                            MOST PROFITABLE THIS MONTH
                        </div>
                        <div onClick={(e) => this.toPage(e, '/vaults')} className="w-profitable-funds-card-see-all">
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

export default MostProfitableToday;