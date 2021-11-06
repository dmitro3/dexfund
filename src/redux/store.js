import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import connectAccountReducer from "./reducers/AccountConnectReducer";
import loaderOverlaryReducer from "./reducers/loaderOverlary";
import connectToOnboardReducer from "./reducers/OnboardReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
const rootReducer = combineReducers({
  connect: connectAccountReducer,
  loader: loaderOverlaryReducer,
  onboard: connectToOnboardReducer,
  toastr: toastrReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
