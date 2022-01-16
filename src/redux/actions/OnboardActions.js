import { toastr } from "react-redux-toastr";
import { onboard } from "./../../ethereum/onboard";

export const ACCOUNT_CHANGE = "WALLET_CHANGE_SUBSCRIPTION";
export const ONBOARD_CREATED = "ONBOARD_CREATED";
export const ONBOARD_UPDATED = "ONBOARD_UPDATED";
export const ACCOUNT_DISCONNECT = "ONBOARD_DESTORYED";
export const ONBOARD_ADDRESS_CHANGE = "ONBOARD_ADDRESS_UPDATE";
export const ONBOARD_BALANCE_UPDATE = "ONBOARD_BALANCE_UPDATE";
export const ONBOARD_NETWORK_CHANGE = "ONBOARD_NETWORK_CHANGE";

export const walletChange = (newWallet) => {
  return async (dispatch) => {
    dispatch({
      type: ACCOUNT_CHANGE,
      payload: newWallet,
    });
  };
};

export const balanceChange = (newBalance) => {
  return async (dispatch) => {
    dispatch({
      type: ONBOARD_BALANCE_UPDATE,
      payload: newBalance,
    });
  };
};

export const addressChange = (newAddress) => {
  return async (dispatch) => {
    dispatch({
      type: ONBOARD_ADDRESS_CHANGE,
      payload: newAddress,
    });
  };
};

export const onboardUpdated = () => {
  return async (dispatch) => {
    const check = await onboard.checkWallet();
    if (check) {
      var statee = await onboard.getState();
      dispatch({
        type: ONBOARD_UPDATED,
        payload: {
          onboard,
          provider: statee.wallet.provider,
          address: statee.address,
          balance: statee.balance,
          networkId: statee.network,
        },
      });
    } else {
      disconnectAccountOnboard();
    }
  };
};

export const connectAccountOnboard = () => {
  return async (dispatch) => {
    try {
      // const onboard = initOnboard();
      await onboard.walletReset();
      const hasConnected = await onboard.walletSelect();
      if (hasConnected) {
        var check = await onboard.walletCheck();
        if (!check) return;
        var statee = await onboard.getState();
        console.log('wallet connected: ', statee);
        dispatch({
          type: ONBOARD_CREATED,
          payload: {
            onboard,
            provider: statee.wallet.provider,
            address: statee.address,
            balance: statee.balance,
            networkId: statee.network,
          },
        });
        toastr.success("Successfully connect to your account");
      }
    } catch (e) {
      toastr.error("Error connecting: ", e.message);
    }
  };
};

export const disconnectAccountOnboard = () => {
  try {
    const data = async (dispatch) => {
      await onboard.walletReset();
      dispatch({
        type: ACCOUNT_DISCONNECT,
      });
    };

    toastr.success("Successfully disconnect to your account");

    return data;
  } catch (e) {
    toastr.error("Error disconnecting: ", e.message);
  }
};

export const checkWallet = () => {
  return async (dispatch) => {
    const check = await onboard.walletCheck();
    if (check) {
      var statee = await onboard.getState();
      dispatch({
        type: ONBOARD_UPDATED,
        payload: {
          onboard,
          provider: statee.wallet.provider,
          address: statee.address,
          balance: statee.balance,
          networkId: statee.network,
        },
      });
    }
  };
};
