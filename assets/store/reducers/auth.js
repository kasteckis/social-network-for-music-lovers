import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    refreshToken: null,
    tokenExpiresAt: null,
    email: null,
    roles: null,
    username: null,
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        refreshToken: action.refreshToken,
        email: action.email,
        roles: action.roles,
        username: action.username,
        tokenExpiresAt: action.tokenExpiresAt,
        error: null,
        loading: false,
    })
}

const authFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false});
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        refreshToken: null,
        email: null,
        username: null,
        tokenExpiresAt: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;