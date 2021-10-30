import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
import pinkOutlineButtonIcon from '../assets/pink-outline-button-icon.svg';
import pinkFillButtonIcon from '../assets/pink-fill-button-icon.svg';

// STYLES
import '../styles/addNewFundSteps.css';

class AddNewFundFinish extends Component {

    constructor() {
        super();
        this.toPage = this.toPage.bind(this);
        this.state = {
        }
    }

    toPage(path) {
        this.props.history.push(path);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    render() {

        return (

            <>
                <div className="w-add-new-fund-step-card">
                    <div className="w-add-new-fund-step-sidebar">
                        <div className="w-add-new-fund-step">
                            <img src={pinkFillButtonIcon} alt="pink-fill-button-icon" className="add-new-fund-button-icon" />
                            <div className="w-add-new-fund-step-text ">
                                General
                            </div>
                        </div>
                        <div className="w-add-new-fund-step">
                            <img src={pinkFillButtonIcon} alt="pink-outline-button-icon" className="add-new-fund-button-icon" />
                            <div className="w-add-new-fund-step-text">
                                Fees (optional)
                            </div>
                        </div>
                        <div className="w-add-new-fund-step">
                            <img src={pinkFillButtonIcon} alt="grey-outline-button-icon" className="add-new-fund-button-icon" />
                            <div className="w-add-new-fund-step-text">
                                Deposits (optional)
                            </div>
                        </div>
                        <div className="w-add-new-fund-step current">
                            <img src={pinkOutlineButtonIcon} alt="grey-outline-button-icon" className="add-new-fund-button-icon" />
                            <div className="w-add-new-fund-step-text current">
                                Review
                            </div>
                        </div>
                    </div>
                    <div className="w-add-new-fund-step-input-section">
                        <div className="w-fund-finish-header">
                            FUND SUCCESSFULLY CREATED!
                        </div>
                        <div className="w-fund-finish-row prim">
                            You’re ready to go. You can now:
                        </div>
                        <div className="w-fund-finish-row sec">
                            1. Add capital and start building a portfolio.
                        </div>
                        <div className="w-fund-finish-row sec">
                            2. Interact with other DeFi protocols.
                        </div>
                        <div className="w-fund-finish-your-funds-button" onClick={() => this.toPage('/your-funds')}>
                            <div className="w-fund-finish-your-funds-button-text">
                                VIEW YOUR VAULTS
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddNewFundFinish;