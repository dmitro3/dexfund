import React, { Component } from 'react';

// COMPONENTS
import Portfolio from '../../global/portfolio/Portfolio';
import SwapCard from './components/swap-card/SwapCard';
import SwapsTable from './components/swaps-table/SwapsTable';
import { getTradePaths } from '../../../ethereum/funds/trade';

// ASSETS
// ... 

// CSS
import './styles/fundTrade.css';
import RoundCard from '../../components/RoundCard/RoundCard';
import PriceFeedChart from '../../components/PriceFeedChart/PriceFeedChart';
import { getFundSwapTrades } from "../../../sub-graph-integrations/trades";
import { currencyFormat } from "../../../ethereum/utils";
import SwapHistory from './components/swap-history/SwapHistory';

class FundTrade extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props.state,
            swapTrades: [],
            pathsLoading: false,
            destSymbol: '',
            selectedSwapPath: null,
            swapHistory: []
        }

        this.getSwapTrades = this.getSwapTrades.bind(this);
        this.setPathsLoading = this.setPathsLoading.bind(this);
        this.getSwapTrades = this.getSwapTrades.bind(this);
    }

    async getSwapTrades(from, to, amount, slippage=3, toSymbol) {
        const paths = await getTradePaths(this.state.fundId, from, to, amount, slippage);
        await this.setState({
            swapTrades: paths,
            pathsLoading: false,
            destSymbol: toSymbol,
            selectedSwapPath: paths.length > 0 ? paths[0] : null
        })
    }

    async componentDidMount() {
        const fundTradeHistory = await getFundSwapTrades(this.state.fundId) || [];
        this.setState({
            swapHistory: fundTradeHistory
        });
        console.log('fundTradeHistory: ', fundTradeHistory);
    }

    async setPathsLoading(bl) {
        await this.setState({ pathsLoading: bl, selectedSwapPath: null })
    }

    render() {

        var width = window.innerWidth;

        if (width > 1000) {
            return (

                <>
                    <div className="">
                        {/* <Portfolio /> */}
                        <RoundCard width="100%">
                            <SwapCard selectedSwapPath={this.state.selectedSwapPath} getSwapTrades={this.getSwapTrades} setPathsLoading={this.setPathsLoading} state={this.state} {...this.props}/>
                            <SwapsTable selectedSwapPath={this.state.selectedSwapPath} destSymbol={this.state.destSymbol} pathsLoading={this.state.pathsLoading} swapTrades={this.state.swapTrades} state={this.state} {...this.props} />
                        </RoundCard>
                        <div className="pricefeed-container">
                            <RoundCard width="100%">
                                {/* <PriceFeedChart /> */}
                                <SwapHistory swapHistory={this.state.swapHistory}/>
                            </RoundCard>
                        </div>
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
