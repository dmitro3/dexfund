import { ACCOUNT_CHANGE, ACCOUNT_DISCONNECT, ONBOARD_CREATED, ONBOARD_UPDATED, ONBOARD_ADDRESS_CHANGE, ONBOARD_BALANCE_UPDATE, ONBOARD_NETWORK_CHANGE } from './../actions/OnboardActions';
import { ethers } from 'ethers';

import configs from './../../config';

const initialState = {
    provider: null,
    walletConnected: false,
    onboard: null,
    address: null,
    balance: 0,
    networkId: configs.DEBUG_MODE ? configs.networkId_DEBUG : configs.networkId
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
                balance: action.payload.balance,
                networkId: action.payload.networkId
            }
        case ONBOARD_UPDATED:
                return {
                    ...state,
                    onboard: action.payload.onboard,
                    walletConnected: true,
                    provider: action.payload.provider,
                    address: action.payload.address,
                    balance: action.payload.balance,
                    networkId: action.payload.networkId
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
        case ONBOARD_NETWORK_CHANGE:
            return {
                ...state,
                networkId: action.payload
            }
        default:
            return state;
    }
}

export const getOnboardInformation = (state) => {
    return state.onboard
}