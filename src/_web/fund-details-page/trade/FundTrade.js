import React, { Component } from 'react';

// COMPONENTS
import Portfolio from '../../global/portfolio/Portfolio';
import SwapCard from './components/swap-card/SwapCard';
import SwapsTable from './components/swaps-table/SwapsTable';
import { getParaswapData } from '../../../ethereum/funds/trade';

// ASSETS
// ... 

// CSS
import './styles/fundTrade.css';

class FundTrade extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props.state
        }
    }

    async componentDidMount() {
        const pData = await getParaswapData(this.state.fundId, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 1, 3); // slippage 3%
        console.log(`pdata response: ${JSON.stringify(pData)}`)
    }

    render() {

        var width = window.innerWidth;

        if (width > 1000) {
            return (

                <>
                    <div className="">
                        {/* <Portfolio /> */}
                        <SwapCard state={this.state} {...this.props}/>
                        <SwapsTable state={this.state} {...this.props} />
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
