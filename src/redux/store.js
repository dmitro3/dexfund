import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from "./reducers/LoginReducer";
import registerReducer from "./reducers/RegisterReducer";

const rootReducer = combineReducers({
    loginInfo: loginReducer,
    registerInfo: registerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;