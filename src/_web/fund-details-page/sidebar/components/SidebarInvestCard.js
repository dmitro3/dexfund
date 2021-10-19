import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import ethIcon from '../assets/eth-icon.svg';

// CSS
import '../styles/sidebar.css';

class SidebarInvestCard extends Component {

    constructor() {
        super();
        this.state = {
            amountToInvest: '0.00',
            maxAmountToInvest: '5.00',
        }
    }

    inputField = (e) => {

        if (e.target.value == '') {
            this.setState({ amountToInvest: '0.00' });
            return;
        }

        const re = /^[0-9.\b]+$/;
        if (!re.test(e.target.value)) {
            return;
        }

        var value = e.target.value;
        this.setState({ amountToInvest: value });
    }

    render() {

        return (

            <>
                <div className="w-invest-card">
                    <div className="w-invest-card-header">
                        Amount to invest
                    </div>
                    <div className="w-invest-table">
                        <div className="w-invest-table-asset-cell">
                            <img src={ethIcon} alt='eth-icon' className="sidebar-eth-icon" />
                            <div className="w-invest-table-asset">
                                ETH
                            </div>
                        </div>
                        <div className="w-invest-table-amount-cell">
                            <div className="w-invest-table-amount-input">
                                <input type="text" id="amount-to-invest" name="amountToInvest"
                                    value={this.state.amountToInvest} onChange={(e) => this.inputField(e)}
                                    style={{
                                        color: '#fff',
                                        backgroundColor: '#070708',
                                        fontFamily: 'Bai Jamjuree, sans-serif',
                                        borderColor: '#070708',
                                        borderWidth: '2px 0px',
                                        fontSize: '15px',
                                        fontWeight: '400',
                                        outline: 'none',
                                        textAlign: 'left',
                                        width: '120px',
                                        marginTop: '-4px'
                                    }}>
                                </input>
                            </div>
                            <div className="w-invest-table-amount-max-button"
                                onClick={() => this.setState({ amountToInvest: this.state.maxAmountToInvest })}>
                                <div className="w-invest-table-amount-max-button-text">
                                    Max: {this.state.maxAmountToInvest}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-invest-card-button">
                        <div className="w-invest-card-button-text">
                            INVEST {this.state.amountToInvest}ETH
                        </div>
                    </div>
                </div>
            </>
        )

    }
}

export default SidebarInvestCard;
