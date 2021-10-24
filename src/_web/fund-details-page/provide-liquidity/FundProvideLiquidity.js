import React, { Component } from 'react';

// COMPONENTS
import SearchBar from './components/SearchBar';
import PoolsTableHeader from './components/PoolsTableHeader';
import PoolsTableRow from './components/PoolsTableRow';
import FundDetailsPopup from '../fund-details-popup/FundDetailsPopup';

// ASSETS
// ... 

// CSS
import './styles/fundProvideLiquidity.css';

class FundProvideLiquidity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedValue: '',

            token1: 'aDAI',
            token2: 'aUSDC',
            token3: 'a,USDT',

            exchange: 'Curve',

            poolSize: '232,231,223.00',
            totalAPY: '10.00',
            yourAssets: '200.00',
            yourAssetsToken: 'USDC',
            noAssets: '-',

            depositPopup: false,
            withdrawPopup: false,
        }
    }

    callbackFunction = (childData) => {
        this.setState({ searchedValue: childData })
    }

    displayDepositPopup = () => {
        this.setState({depositPopup: true, withdrawPopup: false})
    }

    closeDepositPopup = () => {
        this.setState({depositPopup: false, withdrawPopup: false})
    }

    displayWithdrawPopup = () => {
        this.setState({withdrawPopup: true, depositPopup: false})
    }

    closeWithdrawPopup = () => {
        this.setState({withdrawPopup: false, depositPopup: false,})
    }

    renderDepositPopup() {

        return (

            <>
                <FundDetailsPopup {...this.props}
                    closePopupEvent={this.closeDepositPopup}
                    titleFromParent='DEPOSIT'
                    subtitleFromParent='Amount to deposit'
                    token1FromParent={this.state.token1}
                    token2FromParent={this.state.token2}
                    token3FromParent={this.state.token3}
                />
            </>
        )
    }

    renderWithdrawPopup() {

        return (

            <>
                <FundDetailsPopup {...this.props}
                    closePopupEvent={this.closeWithdrawPopup}
                    titleFromParent='WITHDRAW'
                    subtitleFromParent='Amount to withdraw'
                    token1FromParent={this.state.yourAssetsToken}
                    token2FromParent=''
                    token3FromParent=''
                />
            </>
        )
    }

    render() {

        var width = window.innerWidth;

        if (width > 1000) {
            return (

                <>
                    <div className="w-fund-provide-liquidity-wrapper">
                        <div className="w-fund-provide-liquidity-header">
                            POOLS
                        </div>
                        <SearchBar {...this.props}
                            parentCallback={this.callbackFunction} />
                        <PoolsTableHeader />
                        <PoolsTableRow {...this.props}
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                        <PoolsTableRow {...this.props} 
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                        <PoolsTableRow {...this.props}
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                        <PoolsTableRow {...this.props}
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                        <PoolsTableRow {...this.props}
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                        <PoolsTableRow {...this.props}
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                        <PoolsTableRow {...this.props}
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                        <PoolsTableRow {...this.props}
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                        <PoolsTableRow {...this.props}
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                        <PoolsTableRow {...this.props}
                            displayDepositPopupEvent={this.displayDepositPopup}
                            displayWithdrawPopupEvent={this.displayWithdrawPopup}
                            token1FromParent={this.state.token1}
                            token2FromParent={this.state.token2}
                            token3FromParent={this.state.token3}
                            exchangeFromParent={this.state.exchange}
                            poolSizeFromParent={this.state.poolSize}
                            totalAPYFromParent={this.state.totalAPY}
                            yourAssetsFromParent={this.state.yourAssets}
                            yourAssetsTokenFromParent={this.state.yourAssetsToken}
                        />
                    </div>
                    {this.state.depositPopup === true && this.renderDepositPopup()}
                    {this.state.withdrawPopup === true && this.renderWithdrawPopup()}
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

export default FundProvideLiquidity;
