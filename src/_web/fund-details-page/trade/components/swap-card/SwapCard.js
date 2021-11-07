import React, { Component } from 'react';
import { connect } from "react-redux";

// COMPONENTS
import SkeletonLoader from './../../../../global/skeleton-loader/SkeletonLoader';
import {
    deactivateLoaderOverlay,
    activateLoaderOverlay
} from './../../../../../redux/actions/LoaderAction';
import { getFundCompostion } from '../../../../../sub-graph-integrations';
import { getDenominationAssets } from '../../../../../sub-graph-integrations';
import { getIconSource } from '../../../../../icons';
import { getFundAvailable, doTrade } from '../../../../../ethereum/funds/trade';
// ASSETS
import middleImg from '../../assets/middle-img.svg';
import ethIcon from '../../assets/eth-icon.svg';
import usdcIcon from '../../assets/usdc-icon.svg';
import caretDownIcon from '../../assets/caret-down-icon.svg';
// import dots from './../../assets/dots.gif';

import { toastr } from "react-redux-toastr";

// CSS
import '../../styles/fundTrade.css';

class SwapCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.props.state,
            amountToSwap: '',
            amountToReceive: '',
            maxAmountToSwap: '',

            fromDropdown: false,
            toDropdown: false,
            selectedFrom: {},
            selectedTo: {},

            fromTokens: [],
            toTokens: [],

            fromAvailable: 0,

            loading: true,

            loadingAmount: false,
            selectedMax: false,

            lastLoadData: 0,
            setPathsLoadingCallback: this.props.setPathsLoading,
            getSwapTradesCallback: this.props.getSwapTrades,
            warning: "",

            selectedSwapPath: this.props.selectedSwapPath
        }
    }

    async componentDidMount() {
        const compositiom = await getFundCompostion(this.state.fundId);
        const fromTokens = compositiom.portfolio.holdings.map((item) => {
            return {
                address: item.asset.id,
                symbol: item.asset.symbol,
                decimals: item.asset.decimals
            }
        })

        const denoms = await getDenominationAssets();
        const toTokens = denoms.map((item) => {
            return {
                address: item.id,
                symbol: item.symbol,
                decimals: item.decimals
            }
        });

        await this.setState({
            loading: false,
            fromTokens: fromTokens,
            toTokens: toTokens,
            selectedFrom: fromTokens[0],
            selectedTo: toTokens[0]
        })
        await this.getVaultAmount();
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedFrom.symbol != this.state.selectedFrom.symbol) {
            this.getVaultAmount();
        }

        if(this.props.selectedSwapPath != this.state.selectedSwapPath) {
            this.setState({ selectedSwapPath: this.props.selectedSwapPath })
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async loadNewData() {
        await this.setState({ lastLoadData: Date.now(), selectedSwapPath: null });
        await this.state.setPathsLoadingCallback(true);
        await this.sleep(4000);
        if (this.state.lastLoadData + 4000 > Date.now())
            return;
        
        await this.state.getSwapTradesCallback(
            this.state.selectedFrom.address,
            this.state.selectedTo.address,
            this.state.selectedMax ? this.state.fromAvailable : this.state.amountToSwap,
            3, //3% slippage until implemented
            this.state.selectedTo.symbol
        );
    }

    async getVaultAmount() {
        await this.setState({ loadingAmount: true });
        const balance = await getFundAvailable(this.state.fundId, this.state.selectedFrom.address, this.props.onboard.provider);

        var warn;
        if (parseFloat(this.state.amountToSwap) > (parseInt(balance) / (10**this.state.selectedFrom.decimals))) {
            warn = "WARNING: Amount exceeds available amount"
        } else {
            warn = "";
        }
        this.setState({ fromAvailable: (parseInt(balance) / (10**this.state.selectedFrom.decimals)), loadingAmount: false, warning: warn })
    }

    async doSwap(e) {
        e.preventDefault();
        console.log("Selected path: "+JSON.stringify(this.state.selectedSwapPath))
        if (this.state.selectedSwapPath == null)
            return;
        await this.props.activateLoaderOverlay();

        try {
            await doTrade(
                this.state.fundId,
                this.props.onboard.provider,
                this.state.selectedSwapPath
            );
            toastr.success("Swap complete!");
            await this.sleep(5000)
            window.location.reload(false);
        } catch(e) {
            console.log(e)
            toastr.error("Error swapping assets: "+e.message)
        }

        await this.props.deactivateLoaderOverlay();
    }

    inputField = async (e) => {
        var warn = "";

        if(e.target.value == '') {
            warn = "";
            await this.setState({amountToSwap: '', selectedMax: false, warning: warn});
            await this.loadNewData();
        }

        const re = /^[0-9.\b]+$/;
        if (!re.test(e.target.value)) {
            return;
        }

        if (parseFloat(e.target.value) > this.state.fromAvailable) {
            warn = "WARNING: Amount exceeds available amount"
        }

        var value = e.target.value;
        this.setState({ amountToSwap: value, selectedMax: false, warning: warn });
        await this.loadNewData();
    }

    selectMax = async (e) => {
        e.preventDefault();

        await this.setState({
            selectedMax: true,
            amountToSwap: this.state.fromAvailable.toFixed(4)
        })
        await this.loadNewData();
    }

    renderFromDropdownOff() {

        return (

            <>
                <div className="w-swap-card-half-section-asset-input"
                    onClick={() => this.setState({
                        fromDropdown: true
                    })}
                >
                    <div className="w-swap-card-half-section-asset-section">
                        <img src={getIconSource(this.state.selectedFrom.symbol)} alt='eth-icon' className="swap-asset-icon" />
                        <div className="w-swap-card-half-section-asset-text">
                            {this.state.selectedFrom.symbol}
                        </div>
                    </div>
                    <img src={caretDownIcon} alt='caret-down-icon' className="swap-caret-down-icon" />
                </div>
            </>
        )
    }

    renderFromDropdownOn() {

        return (

            <>
                <div className="w-swap-card-half-section-asset-input"
                    style={{ border: '1px solid #E926C3' }}
                    onClick={() => this.setState({
                        fromDropdown: false
                    })}
                >
                    <div className="w-swap-card-half-section-asset-section">
                        <img src={getIconSource(this.state.selectedFrom.symbol)} alt='eth-icon' className="swap-asset-icon" />
                        <div className="w-swap-card-half-section-asset-text">
                            {this.state.selectedFrom.symbol}
                        </div>
                    </div>
                    <img src={caretDownIcon} alt='caret-down-icon' className="swap-caret-down-icon" />
                </div>
                <div className="w-swap-card-half-section-asset-dropdown">
                    {this.state.fromTokens.map((item) => (
                        <div className="w-swap-card-half-section-asset-row"
                        onClick={() => {this.setState({
                            fromDropdown: false,
                            selectedFrom: item
                        }); this.loadNewData();}}
                        >
                            <div className="w-swap-card-half-section-asset-section">
                                <img src={getIconSource(item.symbol)} alt='eth-icon' className="swap-asset-icon" />
                                <div className="w-swap-card-half-section-asset-text">
                                    {item.symbol}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    renderToDropdownOff() {

        return (

            <>
                <div className="w-swap-card-half-section-asset-input"
                    onClick={() => this.setState({
                        toDropdown: true
                    })}
                >
                    <div className="w-swap-card-half-section-asset-section">
                        <img src={getIconSource(this.state.selectedTo.symbol)} alt='eth-icon' className="swap-asset-icon" />
                        <div className="w-swap-card-half-section-asset-text">
                            {this.state.selectedTo.symbol}
                        </div>
                    </div>
                    <img src={caretDownIcon} alt='caret-down-icon' className="swap-caret-down-icon" />
                </div>
            </>
        )
    }

    renderToDropdownOn() {

        return (

            <>
                <div className="w-swap-card-half-section-asset-input"
                    style={{ border: '1px solid #E926C3' }}
                    onClick={() => this.setState({
                        toDropdown: false
                    })}
                >
                    <div className="w-swap-card-half-section-asset-section">
                        <img src={getIconSource(this.state.selectedTo.symbol)} alt='eth-icon' className="swap-asset-icon" />
                        <div className="w-swap-card-half-section-asset-text">
                            {this.state.selectedTo.symbol}
                        </div>
                    </div>
                    <img src={caretDownIcon} alt='caret-down-icon' className="swap-caret-down-icon" />
                </div>
                <div className="w-swap-card-half-section-asset-dropdown">
                {this.state.toTokens.map((item) => (
                        <div className="w-swap-card-half-section-asset-row"
                        onClick={() => {this.setState({
                            toDropdown: false,
                            selectedTo: item
                        }); this.loadNewData();}}
                        >
                            <div className="w-swap-card-half-section-asset-section">
                                <img src={getIconSource(item.symbol)} alt='eth-icon' className="swap-asset-icon" />
                                <div className="w-swap-card-half-section-asset-text">
                                    {item.symbol}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    renderData() {
        return (

            <>
                <div className="w-swap-card-wrapper">
                    <div className="w-swap-card">
                        <div className="w-swap-card-inputs-section">
                            <div className="w-swap-card-half-section">
                                <div className="w-swap-card-half-section-header">
                                    FROM
                                </div>
                                <div className="w-swap-card-half-section-text">
                                    Asset
                                </div>

                                {this.state.fromDropdown === false && this.renderFromDropdownOff()}
                                {this.state.fromDropdown === true && this.renderFromDropdownOn()}

                                <div className="w-swap-card-half-section-text">
                                    Amount
                                </div>
                                <div className="w-swap-card-half-section-amount-input">
                                    <input type="text" id="amount" name="amount"
                                        value={this.state.amountToSwap} onChange={(e) => this.inputField(e)}
                                        style={{
                                            color: '#fff',
                                            backgroundColor: '#070708',
                                            fontFamily: 'Bai Jamjuree, sans-serif',
                                            borderWidth: '0',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            outline: 'none',
                                            textAlign: 'left',
                                            width: '100%',
                                        }}>
                                    </input>
                                    <div className="w-swap-card-max-amount-bullet"
                                        onClick={(e) => this.selectMax(e) }>
                                        <div className="w-swap-card-max-amount-bullet-text">
                                            Max
                                        </div>
                                    </div>
                                </div>
                                <div className="w-swap-card-half-section-text value">
                                    Available: {this.state.loadingAmount ? 
                                    "..." : this.state.fromAvailable.toFixed(4)}
                                </div>
                                <div style={{color: 'red'}}>
                                    {this.state.warning}
                                </div>
                            </div>
                            <img src={middleImg} alt='middle-img' className="swap-middle-img" />
                            <div className="w-swap-card-half-section">
                                <div className="w-swap-card-half-section-header">
                                    TO
                                </div>
                                <div className="w-swap-card-half-section-text">
                                    Asset
                                </div>

                                {this.state.toDropdown === false && this.renderToDropdownOff()}
                                {this.state.toDropdown === true && this.renderToDropdownOn()}

                                <div className="w-swap-card-half-section-text">
                                    Amount
                                </div>
                                <div className="w-swap-card-half-section-amount-input">
                                    <div className="w-swap-card-half-section-amount-input-text">
                                        {this.state.selectedSwapPath == null ? "-" : this.state.selectedSwapPath.amount.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="w-swap-card-button-section">
                            <div onClick={(e) => this.doSwap(e)} className={"w-swap-card-button" + ((this.state.selectedSwapPath !== null && this.state.warning == "") ? "" : "-disabled")}>
                                <div className="w-swap-card-button-text">
                                    SWAP
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    renderLoading() {
        return (
            <SkeletonLoader rows={5} rowHeight={40} />
        );
    }

    render() {
        if (this.state.loading) {
            return this.renderLoading();
        } else {
            return this.renderData();
        }
    }
}

const mapStateToProps = (state) => {
    return {
      account: state.connect,
      onboard: state.onboard,
    };
  };
  
  const mapDispatchToProps = {
    deactivateLoaderOverlay,
    activateLoaderOverlay,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SwapCard);