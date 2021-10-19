import React, { Component } from 'react';

// COMPONENTS
import SwapsTableHeader from './sub-components/SwapsTableHeader';
import SwapsTableRow from './sub-components/SwapsTableRow';

// ASSETS
// ... 

// CSS
import './styles/swapsTable.css';

class SwapsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exchange1: 'Paraswap',
            price1: '$2,000.00',
            amount1: '2,000.00 WETH',
            vsReference1: '+10%',
            vsBestPrice1: 'Best price',

            exchange2: 'Paraswap',
            price2: '$2,000.00',
            amount2: '2,000.00 WETH',
            vsReference2: '+10%',
            vsBestPrice2: '-21.31%',
        }
    }

    render() {

        return (

            <>
                <div className="w-swaps-table">
                    <SwapsTableHeader />
                    <SwapsTableRow 
                        exchangeFromParent={this.state.exchange1}
                        priceFromParent={this.state.price1}
                        amountFromParent={this.state.amount1}
                        vsReferenceFromParent={this.state.vsReference1}
                        vsBestPriceFromParent={this.state.vsBestPrice1}
                    />
                     <SwapsTableRow 
                        exchangeFromParent={this.state.exchange2}
                        priceFromParent={this.state.price2}
                        amountFromParent={this.state.amount2}
                        vsReferenceFromParent={this.state.vsReference2}
                        vsBestPriceFromParent={this.state.vsBestPrice2}
                    />
                    <SwapsTableRow 
                        exchangeFromParent={this.state.exchange2}
                        priceFromParent={this.state.price2}
                        amountFromParent={this.state.amount2}
                        vsReferenceFromParent={this.state.vsReference2}
                        vsBestPriceFromParent={this.state.vsBestPrice2}
                    />
                    <SwapsTableRow 
                        exchangeFromParent={this.state.exchange2}
                        priceFromParent={this.state.price2}
                        amountFromParent={this.state.amount2}
                        vsReferenceFromParent={this.state.vsReference2}
                        vsBestPriceFromParent={this.state.vsBestPrice2}
                    />
                    <SwapsTableRow 
                        exchangeFromParent={this.state.exchange2}
                        priceFromParent={this.state.price2}
                        amountFromParent={this.state.amount2}
                        vsReferenceFromParent={this.state.vsReference2}
                        vsBestPriceFromParent={this.state.vsBestPrice2}
                    />
                    <SwapsTableRow 
                        exchangeFromParent={this.state.exchange2}
                        priceFromParent={this.state.price2}
                        amountFromParent={this.state.amount2}
                        vsReferenceFromParent={this.state.vsReference2}
                        vsBestPriceFromParent={this.state.vsBestPrice2}
                    />
                    <SwapsTableRow 
                        exchangeFromParent={this.state.exchange2}
                        priceFromParent={this.state.price2}
                        amountFromParent={this.state.amount2}
                        vsReferenceFromParent={this.state.vsReference2}
                        vsBestPriceFromParent={this.state.vsBestPrice2}
                    />
                    <SwapsTableRow 
                        exchangeFromParent={this.state.exchange2}
                        priceFromParent={this.state.price2}
                        amountFromParent={this.state.amount2}
                        vsReferenceFromParent={this.state.vsReference2}
                        vsBestPriceFromParent={this.state.vsBestPrice2}
                    />
                </div>
            </>
        )
    }
}

export default SwapsTable;
