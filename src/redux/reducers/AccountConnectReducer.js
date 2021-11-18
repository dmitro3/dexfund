import {
  ACCOUNT_CONNECT_DISCONNECT,
  ACCOUNT_CONNECT_FAILURE,
  ACCOUNT_CONNECT_SUCCESS,
} from "../actions/AccountActions";


const initialState = {
  connectSuccess: false,
  message: "Next",
  provider: null,
  account: "",
  error: null,
};

export default function connectToAccountReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_CONNECT_SUCCESS:
      return {
        ...state,
        connectSuccess: true,
        message: "Successfully connected to you account.",
        error: null,
        account: action.payload,
      };
    case ACCOUNT_CONNECT_FAILURE:
      return {
        ...state,
        connectSuccess: false,
        message: "Not connected successfully",
        error: action.payload,
      };

    case ACCOUNT_CONNECT_DISCONNECT:
      return {
        account: null,
        connectSuccess: false,
        message: "Disconnected. Please use correct network",
        error: "",
      };
    default:
      return state;
  }
}


export const getConnectInformation = (state) => {
  return state.connect;
}