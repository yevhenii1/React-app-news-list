import * as types from '../сonstants/news'
import {newsAPI} from "../utils/api";
import history from '../utils/history'


export const getNews = () => (dispatch) => {
    dispatch({
        type: types.NEWS_ALL_REQUEST,
        payload: {
            request: true
        }
    })

    newsAPI.getNews()
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.NEWS_ALL_SUCCESS,
                    payload: {
                        request: false,
                        response_data: response.data
                    }
                })
            }
        })
        .catch(error => {
            dispatch({
                type: types.NEWS_ALL_FAILURE,
                payload: {
                    request: false,
                    error_message: error
                }
            })
        })
}
export const addNews = (title, content, token) => (dispatch) => {
    dispatch({
        type: types.CREATE_NEWS_REQUEST,
        payload: {
            request: true
        }
    })

    newsAPI.addNewsData(title, content, token)
        .then(({data}) => {
            const createdNews = data.feed
            dispatch({
                type: types.CREATE_NEWS_SUCCESS,
                createdNews
            })
        }).catch(error => {
        dispatch({
            type: types.CREATE_NEWS_FAILURE,
            payload: {
                request: false,
                error_message: error
            }
        })
    })
}

export const deleteNewById = (id, token) => (dispatch) => {
    dispatch({
        type: types.DELETE_NEWS_REQUEST,
        payload: {
            request: true,
        }
    })

    newsAPI.deleteNewsById(id, token)
        .then(response => {
            dispatch({
                type: types.DELETE_NEWS_SUCCESS,
                payload: {
                    request: false,
                    id: response.data._id,
                }
            })
        })
        .catch(error => {
            dispatch({
                type: types.DELETE_NEWS_FAILURE,
                response: {
                    request: false,
                    error_message: error,
                }
            })
        })
}

export const getNewsById = (id) => (dispatch) => {
    dispatch({
        type: types.DETAIL_NEWS_REQUEST,
        payload: {
            request: true,
        }
    })
    newsAPI.getNewsById(id)
        .then(response => {
            dispatch({
                type: types.DETAIL_NEWS_SUCCESS,
                payload: {
                    request: false,
                    response_data: response.data,
                }
            })
        })
        .catch(error => {
            dispatch({
                type: types.DETAIL_NEWS_FAILURE,
                payload: {
                    request: false,
                    status: error.response.status,
                    error_message: error.message,
                }
            })
        })
}

export const editNewsById = (id, token, data) => (dispatch) => {
    dispatch({
        type: types.EDIT_NEWS_REQUEST,
        payload: {
            request: true,
        }
    })
    newsAPI.editNewsById(id, token, data)
        .then(response => {
            dispatch({
                type: types.EDIT_NEWS_SUCCESS,
                payload: {
                    request: false,
                    response_data: response.data,
                }
            })
        })
        .catch(error => {
            dispatch({
                type: types.EDIT_NEWS_FAILURE,
                payload: {
                    request: false,
                    error_message: error,
                }
            })
        })
}