import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import wethIcon from '../assets/weth-icon.svg';

// CSS
import '../styles/fundYield.css';

class MarketsTableRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fundAddress: this.props.fundAddressFromParent,
            fundName: this.props.fundNameFromParent,

            name: this.props.nameFromParent,
            fullName: this.props.fullNameFromParent,
            protocol1: this.props.protocol1FromParent,
            protocol2: this.props.protocol2FromParent,
            protocol3: this.props.protocol3FromParent,
            protocol4: this.props.protocol3FromParent,
            balance: this.props.balanceFromParent,
            bestAPY: this.props.bestAPYFromParent,
        }
    }

    toPage(name, params) {
        let path = window.location.pathname.split('/');
        let fundAddress = path.pop();

        this.props.history.push(('/fund/' + fundAddress + '/yield/' + name), params);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    };

    render() {

        const doNotDisplay = {
            display: 'none'
        }

        var fundAddress = this.state.fundAddress;
        var fundName = this.state.fundName;
        var name = this.state.name;

        return (

            <>
                <div className="w-markets-table-row"
                    onClick={() => this.toPage(this.state.name,
                    {
                        fundAddress,
                        fundName,
                        name
                    })}
                >
                    <div className="w-markets-table-cell name">
                        <div className="w-markets-table-name-cell">
                            <img 
                                src={wethIcon}
                                alt='weth-icon'
                                className="w-markets-table-name-icon"
                            />
                            <div className="w-markets-table-name-cell-text">
                                <div className="w-markets-table-name">
                                    {this.state.name}
                                </div>
                                <div className="w-markets-table-full-name">
                                    {this.state.fullName}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-markets-table-cell protocols">
                        <div className="w-markets-table-protocols-cell">
                            <div className="w-markets-protocol">
                                {this.state.protocol1}
                            </div>
                            <div className="w-markets-protocol"
                                style={this.state.protocol2 === '-' ? doNotDisplay : {}}
                            >
                                {this.state.protocol2}
                            </div>
                            <div className="w-markets-protocol"
                                style={this.state.protocol3 === '-' ? doNotDisplay : {}}
                            >
                                {this.state.protocol3}
                            </div>
                            <div className="w-markets-protocol"
                                style={this.state.protocol4 === '-' ? doNotDisplay : {}}
                            >
                                {this.state.protocol4}
                            </div>
                        </div>
                    </div>
                    <div className="w-markets-table-cell balance">
                        {this.state.balance} <a style={this.state.balance === '-' ? doNotDisplay : {}} >{this.state.name}</a>
                    </div>
                    <div className="w-markets-table-cell best-apy">
                        {this.state.bestAPY}%
                    </div>
                </div>
            </>
        )
    }
}

export default MarketsTableRow;