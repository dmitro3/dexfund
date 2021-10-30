import React, { Component } from 'react';

// COMPONENTS
import SwapsTableHeader from './sub-components/SwapsTableHeader';
import SwapsTableRow from './sub-components/SwapsTableRow';

// ASSETS
// ... 

// CSS
import './styles/swapsTable.css';
import { getFundSwapTrades } from '../../../../../sub-graph-integrations/trades';
import { currencyFormat } from '../../../../../ethereum/utils';

class SwapsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exchange: 'Paraswap',
            price1: '$2,000.00',
            amount1: '2,000.00 WETH',
            vsReference1: '+10%',
            vsBestPrice1: 'Best price',

            exchange2: 'Paraswap',
            price2: '$2,000.00',
            amount2: '2,000.00 WETH',
            vsReference2: '+10%',
            vsBestPrice2: '-21.31%',

            swapTrades: []
        }
    }

    async componentDidMount() {
        const swapTrades = await getFundSwapTrades()
        console.log('Trades: ', swapTrades);

        this.setState({
            swapTrades
        })
    }

    render() {

        return (

            <>
                <div className="w-swaps-table">
                    <SwapsTableHeader />
                    {
                        this.state.swapTrades.map((trade, i) => (

                            <SwapsTableRow 
                                exchangeFromParent={trade.adapter.identifier}
                                priceFromParent={trade.incomingAssetAmount.price.price}
                                amountFromParent={currencyFormat(trade.incomingAssetAmount.amount)}
                                symbolFromParent = {trade.incomingAssetAmount.asset.symbol}
                                vsReferenceFromParent="vsRef"
                                vsBestPriceFromParent="vsBestPrice"
                            />
                        ))
                    }
                </div>
            </>
        )
    }
}

export default SwapsTable;
