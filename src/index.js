import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store.js";

import HomePage from "./_web/home-page/HomePage";
import YourFundsPage from "./_web/your-funds-page/YourFundsPage";
import FundDetailsPage from "./_web/fund-details-page/FundDetailsPage";
import AddNewFundPage from "./_web/add-new-fund-page/AddNewFundPage";
import VaultsPage from "./_web/vaults-page/VaultsPage";
// web3 connect
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import ProtectedRoute from "./_web/ProtectedRoute/ProtectedRoute";
import LoaderOverlary from "./_web/LoaderOverlay/LoaderOverlay";

//TOASTR
import ReduxToastr from "react-redux-toastr";

//CSS
import "./onboardStyling.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./index.css";
//get Library
function getLibrary(provider) {
  return new Web3(provider);
}

const app = (
  <Web3ReactProvider getLibrary={getLibrary}>
    <React.StrictMode>
      <Provider store={store}>
        <LoaderOverlary>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/your-funds" exact component={YourFundsPage} />
              <Route path="/fund/:address" exact component={FundDetailsPage} />
              <ProtectedRoute
                path="/add-new-fund"
                exact
                component={AddNewFundPage}
              />
              <Route path="/vaults" exact component={VaultsPage} />
            </Switch>
          </BrowserRouter>
        </LoaderOverlary>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          getState={(state) => state.toastr} // This is the default
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
      </Provider>
    </React.StrictMode>
  </Web3ReactProvider>
);
ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
