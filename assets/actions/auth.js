import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, refreshToken, userId, email, username, tokenExpiresAt, roles) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        refreshToken: refreshToken,
        userId: userId,
        email: email,
        username: username,
        tokenExpiresAt: tokenExpiresAt,
        roles: roles
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {{
    // todo pakeist i refresh tokeno regeneravima
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const loginData = {
            username: email,
            password: password
        };
        axios.post('./api/login_check', loginData)
            .then(response1 => {
                console.log(response1);
                const headers = {
                    headers: {
                        Authorization: 'Bearer ' + response1.data.token
                    }
                };
                axios.get('./api/user', headers)
                    .then(response2 => {
                        console.log(response2)
                        dispatch(authSuccess(
                            response1.data.token,
                            response1.data.refresh_token,
                            response2.data.id,
                            response2.data.email,
                            response2.data.username,
                            response2.data.tokenExpiresAt,
                            response2.data.roles
                        ));
                        dispatch(checkAuthTimeout(900));
                    })
                    .catch(error => {
                        switch (error.response.data.code) {
                            case 401:
                                dispatch(authFail('Neteisingi prisijungimo duomenys!'));
                                break;
                            default:
                                dispatch(authFail('Unhandled error'));
                        }
                    });
            })
            .catch(error => {
                switch (error.response.data.code) {
                    case 401:
                        dispatch(authFail('Neteisingi prisijungimo duomenys!'));
                        break;
                    default:
                        dispatch(authFail('Unhandled error'));
                }
            });
    };
};