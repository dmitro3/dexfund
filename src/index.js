import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import store from './redux/store.js'

import HomePage from "./_web/home-page/HomePage";
import YourFundsPage from './_web/your-funds-page/YourFundsPage';
import FundDetailsPage from './_web/fund-details-page/FundDetailsPage';
import AddNewFundPage from './_web/add-new-fund-page/AddNewFundPage';
import VaultsPage from './_web/vaults-page/VaultsPage';
// web3 connect
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core'
import {connectMetamask}  from  './ethereum/index'
import ProtectedRoute from './_web/ProtectedRoute/ProtectedRoute';

function getLibrary(provider) {
    return new Web3(provider)
}


const app = (
    <Web3ReactProvider getLibrary={getLibrary}>
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/your-funds" exact component={YourFundsPage} />
                        <Route path="/fund/:address" exact component={FundDetailsPage} />
                        <ProtectedRoute path="/add-new-fund" exact component={AddNewFundPage} />
                        <Route path="/vaults" exact component={VaultsPage} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>

    </Web3ReactProvider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
