import axios from 'axios';
import { loginURL, registerURL } from "../utils/AuthUrls";
import { saveUserInfoToLocalStorage, deleteUserInfoFromLocalStorage } from "../../managers/LocalStorageManager";

export const RESET_LOGIN = 'RESET_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login(email, password) {
    return function (dispatch) {
        dispatch({ type: RESET_LOGIN });
        axios.post(loginURL(), {email, password}).then((response) => {
            saveUserInfoToLocalStorage(response.data.token);
            dispatch({ type: LOGIN_SUCCESS });
        }).catch(error => {
            dispatch({type: LOGIN_FAILURE, payload: error.response.data});
        })
    }
}

export const LOGOUT = 'LOGOUT';

export function logout() {
    return function (dispatch) {
        deleteUserInfoFromLocalStorage();
        dispatch({ type: LOGOUT });
    }
}

export const RESET_REGISTER = 'RESET_REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function register(name, email, password) {
    return function (dispatch) {
        dispatch({ type: RESET_REGISTER });
        axios.post(registerURL(), {name, email, password}).then((response) => {
            saveUserInfoToLocalStorage(response.data.token);
            dispatch({ type: REGISTER_SUCCESS });
        }).catch(error => {
            dispatch({type: REGISTER_FAILURE, payload: error.response.data});
        })
    }
}