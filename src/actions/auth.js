import * as types from '../сonstants/auth'
import jwt from 'jsonwebtoken'
import history from '../utils/history'
import {authAPI} from "../utils/api";

export const startingAuthWithG = () => {
    return dispatch => {
        dispatch({
            type: types.AUTH_REQUEST,
            payload: {
                request: true
            }
        })
    }
}

export const authWithG = (name, token) => dispatch => {
    authAPI.authWithG(token)
        .then(response => {
            const token = response.data.token
            let id = jwt.decode(token).id
            localStorage.setItem('id', id)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('name', name)
            dispatch({
                type: types.AUTH_SUCCESS,
                payload: {
                    request: true,
                    username: name,
                    token: response.data.token,
                }
            })
            history.push('/news');
        })
        .catch((error) => {
            dispatch({
                type: types.AUTH_FAILURE,
                payload: {
                    request: false,
                    error_message: error
                }
            })
        })
}


export const signOutWithG = () => {
    return dispatch => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('id')
        dispatch({
            type: types.AUTH_SIGNOUT,
            payload: {
                request: false,
            }
        })
    }
}

export const errorAuthG = (message) => {
    return dispatch => {
        dispatch({
            type: types.AUTH_FAILURE,
            payload: {
                request: false,
                error_message: message,
            }
        });
    }
}

export const signUp = (data) => dispatch => {
    dispatch({
        type: types.AUTH_REQUEST,
        payload: {
            request: true
        }
    })
    authAPI.signUp(data)
        .then((response) => {
            dispatch({
                type: types.AUTH_SUCCESS,
                payload: {
                    request: false,
                    token: response.data.token,
                }
            });
            history.push('/login');
        })
        .catch((error) => {
            dispatch({
                type: types.AUTH_FAILURE,
                payload: {
                    request: false,
                    error_message: error
                }
            })
        })
}

export function logIn(data) {
    return dispatch => {

        dispatch({
            type: types.AUTH_REQUEST,
            payload: {
                request: true
            }
        })
        authAPI.logIn(data)
            .then((response) => {
                const token = response.data.token
                let id = jwt.decode(token).id
                localStorage.setItem('id', id)
                localStorage.setItem('token', response.data.token)

                authAPI.logInId(id, token)
                    .then(function (response) {
                        localStorage.setItem('name', response.data.user.displayName)
                        dispatch({
                            type: types.AUTH_SUCCESS,
                            payload: {
                                request: false,
                                username: response.data.user.displayName,
                                token: token,
                            }
                        })
                        history.push('/news');
                    })
                    .catch((error) => {
                        dispatch({
                            type: types.AUTH_FAILURE,
                            payload: {
                                request: false,
                                error_message: error
                            }
                        })
                    })
            })
            .catch((error) => {
                dispatch({
                    type: types.AUTH_FAILURE,
                    payload: {
                        request: false,
                        error_message: error
                    }
                })
            })
    }
}