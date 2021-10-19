import React, { Component } from 'react';

// COMPONENTS
import Portfolio from '../../global/portfolio/Portfolio';
import SwapCard from './components/swap-card/SwapCard';
import SwapsTable from './components/swaps-table/SwapsTable';

// ASSETS
// ... 

// CSS
import './styles/fundTrade.css';

class FundTrade extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        var width = window.innerWidth;

        if (width > 1000) {
            return (

                <>
                    <div className="">
                        <Portfolio />
                        <SwapCard />
                        <SwapsTable />
                    </div>
                </>

            )
        } else {
            return (

                <>

                </>
            )
        }
    }
}

export default FundTrade;
