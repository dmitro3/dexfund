import React, { Component } from 'react';

// COMPONENTS
import MostProfitableAllTime from './components/MostProfitableAllTime';
import MostProfitableThisMonth from './components/MostProfitableThisMonth';
import MostProfitableToday from './components/MostProfitableToday';

// ASSETS
// ...

// CSS
import './styles/topInvestmentFunds.css';

class TopInvestmentFunds extends Component {

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
                        TOP INVESTMENT FUNDS
                    </div>
                   {
                       this.props.account.account ? ( <div className="w-top-investment-funds-content">
                       <MostProfitableAllTime {...this.props} />
                       <MostProfitableThisMonth {...this.props} />
                       <MostProfitableToday {...this.props} />
                   </div>) : <div> </div>
                   }
                </div>
            </>
        )
    }
}

export default TopInvestmentFunds;