import React, { Component } from 'react';

import './styles/walletNotConnected.css';

import {
    connectAccount,
    disconnectAccount,
  } from "./../../../redux/actions/AccountActions";
import {activateLoaderOverlay, deactivateLoaderOverlay}  from  './../../../redux/actions/LoaderAction'

// REDUX
import { connect } from "react-redux";

class WalletNotConnected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.textFromParent,
        }
    }

    async doCon(e) {
        await e.preventDefault();
        await this.props.activateLoaderOverlay();
        await this.props.connectAccount();
        await this.props.deactivateLoaderOverlay();
    }

    render() {

        return (

            <>
                <div className="wallet-not-connected-section">
                    <div className="wallet-not-connected-text">
                        <a onClick={(e) => this.doCon(e)}>Connect wallet</a> <a className="wallet-not-connected-text-grey">{this.state.text}</a> 
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
    connectAccount,
    disconnectAccount,
    activateLoaderOverlay,
    deactivateLoaderOverlay
};


export default connect(mapStateToProps, mapDispatchToProps)(WalletNotConnected);