import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_LOGIN,
} from "../actions/AuthActions";

const initialState = {
  invalidCredentials: false,
  loginSuccess: false,
  feedbackMessage: null,
  error: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        invalidCredentials: false,
        loginSuccess: true,
        feedbackMessage: "Login successful!",
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        invalidCredentials: true,
        loginSuccess: false,
        feedbackMessage: "Invalid credentials!",
        error: action.payload.error,
      };

    case LOGOUT:
    case RESET_LOGIN:
      return {
        invalidCredentials: false,
        loginSuccess: false,
        feedbackMessage: null,
        error: null,
      };

    default:
      return state;
  }
}
