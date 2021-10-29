import { ACCOUNT_CHANGE, ACCOUNT_DISCONNECT, ONBOARD_CREATED, ONBOARD_UPDATED, ONBOARD_ADDRESS_CHANGE, ONBOARD_BALANCE_UPDATE } from './../actions/OnboardActions';
import { ethers } from 'ethers';

const initialState = {
    provider: null,
    walletConnected: false,
    onboard: null,
    address: null,
    balance: 0
}

export default function connectToOnboardReducer(state=initialState, action) {
    switch(action.type) {
        case ACCOUNT_CHANGE:
            return {
                ...state,
                provider: action.payload.provider,
                walletConnected: action.payload.provider != null
            };
        case ONBOARD_CREATED:
            return {
                ...state,
                onboard: action.payload.onboard,
                walletConnected: true,
                provider: action.payload.provider,
                address: action.payload.address,
                balance: action.payload.balance
            }
        case ONBOARD_UPDATED:
                return {
                    ...state,
                    onboard: action.payload.onboard,
                    walletConnected: true,
                    provider: action.payload.provider,
                    address: action.payload.address,
                    balance: action.payload.balance
                }
        case ONBOARD_ADDRESS_CHANGE:
                return{
                    ...state,
                    address: action.payload,
                    walletConnected: action.payload != null
                }
        case ACCOUNT_DISCONNECT:
            return initialState;
        case ONBOARD_BALANCE_UPDATE:
                return {
                    ...state,
                    balance: action.payload
                }
        default:
            return state;
    }
}