import { connectMetamask } from "../../ethereum";

//** Action CONSTANTS */
export const ACCOUNT_CONNECT_DISCONNECT = "ACCOUNT_CONNECT_DISCONNECT";
export const ACCOUNT_CONNECT_SUCCESS = "ACCOUNT_CONNECT_SUCCESS";
export const ACCOUNT_CONNECT_FAILURE = "ACCOUNT_CONNECT_FAILURE";

export const connectAccount = () => {
  return async (dispatch) => {
    try {
      // connect here and the continue here
      const accountInfo = await connectMetamask();

      // saveAccountInfoToLocalStorage(accountInfo);
      dispatch({ type: ACCOUNT_CONNECT_SUCCESS, payload: accountInfo });
      // save records
    } catch (error) {
      dispatch({ type: ACCOUNT_CONNECT_FAILURE, payload: error.message });
    }
  };
};

export const disconnectAccount = () => {
  return async (dispatch) => {
    try {
      // connect here and the continue here
      // const accountInfo = await disconnect();
      // deleteAccountInfoFromLocalStorage(accountInfo);
      dispatch({ type: ACCOUNT_CONNECT_DISCONNECT });
      // save records
    } catch (error) {
      dispatch({ type: ACCOUNT_CONNECT_FAILURE, payload: error.message });
    }
  };
};
