import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, refreshToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        refreshToken: refreshToken
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const loginData = {
            username: email,
            password: password
        };
        axios.post('./api/login_check', loginData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.token, response.data.refresh_token))
            })
            .catch(error => {
                console.log(error);
            });
    };
};