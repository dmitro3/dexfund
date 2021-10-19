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

const app = (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/your-funds" exact component={YourFundsPage} />
                    <Route path="/fund/:address" exact component={FundDetailsPage} />
                    <Route path="/add-new-fund" exact component={AddNewFundPage} />
                    <Route path="/vaults" exact component={VaultsPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
