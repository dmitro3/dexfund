<<<<<<< HEAD
import React, { Component } from "react";

// COMPONENTS
import YourInvestmentsTableHeader from "./components/YourInvestmentsTableHeader";
import YourinvestmentsTableRow from "./components/YourInvestmentsTableRow";

=======
import React, { Component } from 'react';
import { connect } from "react-redux";

// COMPONENTS
import YourInvestmentsTableHeader from './components/YourInvestmentsTableHeader';
import YourinvestmentsTableRow from './components/YourInvestmentsTableRow';
import WalletNotConnected from './../../global/wallet-not-connected/WalletNotConnected';
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b
// ASSETS
// ...

import SkeletonLoader from './../../global/skeleton-loader/SkeletonLoader';

// CSS
import "./styles/yourInvestments.css";
import { getYourInvestments } from "../../../sub-graph-integrations";

// REDUX

class YourInvestments extends Component {
  constructor(props) {
    super(props);

<<<<<<< HEAD
    this.state = {
      fundName: "Initial",
      yourDeposits: "$1.000.000,00",
      currentValue: "$1.100.000,00",
      performance: "+10%",
      investments: [],
    };
  }
  async componentDidMount() {
    const investments = await getYourInvestments();

    console.log(investments);
    this.setState({
      investments: investments ? investments : [],
    });
  }
  render() {
    return (
      <>
        <div className="w-your-investments-wrapper">
          <div className="w-your-investments-header">YOUR INVESTMENTS</div>
          <div className="w-your-investments-table">
            <YourInvestmentsTableHeader />
            {this.state.investments.map((investment, index) => (
              <YourinvestmentsTableRow
                key={index}
                fundNameFromParent={investment.fund.name}
                yourDepositsFromParent={investment.investmentAmount}
                currentValueFromParent={investment.investmentState.shares}
                performanceFromParent={(
                  ((investment.investmentAmount -
                    investment.investmentState.shares) /
                    investment.investmentAmount) *
                  100
                ).toFixed(2)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default YourInvestments;
=======
    constructor(props) {
        super(props);

        this.state = {
            investments: []
        }

        this.getInvestments = this.getInvestments.bind(this);
        this.isConnected = this.isConnected.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.account != this.props.account) {
            this.getInvestments();
        }
    }

    isConnected() {
        return this.props.account.account && this.props.account.connectSuccess;
    }

     loader = () => {
        return (<SkeletonLoader
        rows={2}
        rowHeight={40}
        />)
     }

    async getInvestments() {
        await this.setState({
            isLoaded: false
        })
        if (this.isConnected()) {
            const investments = await getYourInvestments(this.props.account.account.address);
            this.setState({
                investments,
                isLoaded: true
            })
        } else {
            this.setState({
                investments: [],
                isLoaded: true
            })
        }
    }

    async componentDidMount() {
        await this.getInvestments();
    }

    renderInvestments() {
        return (
            
                this.state.investments.map((investment,index) => 

                    <YourinvestmentsTableRow key={index}
                        fundNameFromParent={investment.fund.name}
                        yourDepositsFromParent={investment.investmentAmount}
                        currentValueFromParent={investment.investmentState.shares}
                        performanceFromParent={(((investment.investmentAmount - investment.investmentState.shares) / investment.investmentAmount) * 100).toFixed(2)}
                    />
                )
            
        )
    }

    renderNoInvestments() {
        return (
            <div className="w-your-investments-table-row-no-data">
                You have no investments
            </div>
        )
    }

    renderWalletNotConnected() {
        return (
            <div className="w-your-investments-table-row">
                <WalletNotConnected textFromParent="to view your investments" />
            </div>
        )
    }

    renderLoading() {
        return (
            <div
            style={{paddingTop: "2%"}}>
                {this.loader()}
            </div>
        )
    }

    render() {

        return (

            <>
                <div className="w-your-investments-wrapper">
                    <div className="w-your-investments-header">
                        YOUR INVESTMENTS
                    </div>
                    <div className="w-your-investments-table">
                        <YourInvestmentsTableHeader />
                        {this.state.isLoaded === true && this.isConnected() && this.state.investments.length > 0 && this.renderInvestments()}
                        {this.state.isLoaded === true && this.isConnected() && this.state.investments.length == 0 && this.renderNoInvestments()}
                        {this.state.isLoaded === true && !this.isConnected() && this.renderWalletNotConnected()}
                        {this.state.isLoaded === false && this.renderLoading()}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      account: state.connect,
    };
  };
  
  const mapDispatchToProps = {
    
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(YourInvestments);
>>>>>>> 2ef1454396df607d8ba5a10c2612cfe106ccb14b
