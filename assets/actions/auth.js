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
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiresAt');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {{
    return dispatch => {
        setTimeout(() => {
            dispatch(authCheckState());
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
                const headers = {
                    headers: {
                        Authorization: 'Bearer ' + response1.data.token
                    }
                };
                axios.get('./api/user', headers)
                    .then(response2 => {
                        const tokenExpiresAt = new Date(response2.data.tokenExpiresAt);
                        localStorage.setItem('token', response1.data.token);
                        localStorage.setItem('refreshToken', response1.data.refresh_token);
                        localStorage.setItem('tokenExpiresAt', tokenExpiresAt);
                        dispatch(authSuccess(
                            response1.data.token,
                            response1.data.refresh_token,
                            response2.data.id,
                            response2.data.email,
                            response2.data.username,
                            response2.data.tokenExpiresAt,
                            response2.data.roles
                        ));
                        const timeTillTokenExpiration = (tokenExpiresAt.getTime() - new Date().getTime()) / 1000;
                        dispatch(checkAuthTimeout(timeTillTokenExpiration));
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');
        if (!token && !tokenExpiresAt && !refreshToken) {
        } else {
            const tokenExpiresAtDate = new Date(tokenExpiresAt);
            if (tokenExpiresAtDate.getTime() > new Date().getTime()) {
                const headers = {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                };
                axios.get('./api/user', headers)
                    .then(response => {
                        dispatch(authSuccess(
                            token,
                            refreshToken,
                            response.data.id,
                            response.data.email,
                            response.data.username,
                            tokenExpiresAt,
                            response.data.roles
                        ));
                        const timeTillTokenExpiration = (tokenExpiresAtDate.getTime() - new Date().getTime()) / 1000;
                        dispatch(checkAuthTimeout(timeTillTokenExpiration));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                const refreshTokenData = {
                    refresh_token: refreshToken
                };
                axios.post('./api/token/refresh', refreshTokenData)
                    .then(response1 => {
                        const newToken = response1.data.token;

                        localStorage.setItem('token', newToken);

                        const headers = {
                            headers: {
                                Authorization: 'Bearer ' + newToken
                            }
                        };

                        axios.get('./api/user', headers)
                            .then(response2 => {

                                const newTokenExpiresAt = new Date(response2.data.tokenExpiresAt);
                                localStorage.setItem('tokenExpiresAt', newTokenExpiresAt);

                                dispatch(authSuccess(
                                    newToken,
                                    refreshToken,
                                    response2.data.id,
                                    response2.data.email,
                                    response2.data.username,
                                    newTokenExpiresAt,
                                    response2.data.roles
                                ));
                                const timeTillTokenExpiration = (newTokenExpiresAt.getTime() - new Date().getTime()) / 1000;
                                dispatch(checkAuthTimeout(timeTillTokenExpiration));
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(error => {
                        // Atsijungiame, nes pasibaige refresh tokenas.
                        dispatch(logout());
                        console.log(error);
                    })
            }
        }
    };
};

export const register = (email, username, password) => {
    return dispatch => {
        dispatch(authStart());
        const body = {
            email: email,
            username: username,
            password: password
        };

        axios.post('./api/register', body)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
                switch (error.response.status) {
                    case 400:
                        dispatch(authFail('Blogi duomenys!'));
                        break;
                    case 409:
                        dispatch(authFail(error.response.data.error));
                        break;
                    default:
                        dispatch(authFail('Unhandled error'));
                }
            })
    }
};
