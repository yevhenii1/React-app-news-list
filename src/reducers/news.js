import * as types from '../сonstants/news'

const initialState = {
    feeds_list: [ ],
    feed_item: null,
    request: false,
    status: 200,
    error_message: '',
    edited: false,
    create: false,
    // isPosts: false,
}

const news = (state = initialState, action) => {
    switch (action.type){
        case types.NEWS_ALL_REQUEST:
        case types.CREATE_NEWS_REQUEST:
        case types.DETAIL_NEWS_REQUEST:
        case types.EDIT_NEWS_REQUEST:
            return {
                ...state,
                request: action.payload.request,
                status: 200,
                error_message: '',
                // isPosts: true,
            }
        case types.NEWS_ALL_SUCCESS:
            return {
                ...state,
                status: 200,
                request: action.payload.request,
                feeds_list: action.payload.response_data.feeds,
                error_message: '',
                // isPosts: true,
            }
        case types.DETAIL_NEWS_SUCCESS:
            return {
                ...state,
                status: 200,
                edited: false,
                request: action.payload.request,
                feed_item: action.payload.response_data.feed,
                error_message: '',
            }
        case types.CREATE_NEWS_SUCCESS:
            return {
                ...state,
                feeds_list: [...state.feeds_list, action.createdNews],
                create: true,
            }
        case types.DELETE_NEWS_SUCCESS:
            return {
                ...state,
                status: 204,
                request: action.payload.request,
                feeds_list: state.feeds_list.filter(item => item._id !== action.payload.id),
                error_message: '',
            }
        case types.EDIT_NEWS_SUCCESS:
            return {
                ...state,
                request: action.payload.request,
                feed_item: action.payload.response_data.feed,
                edited: true,
                error_message: '',
            }
        case types.NEWS_ALL_FAILURE:
        case types.CREATE_NEWS_FAILURE:
        case types.DETAIL_NEWS_FAILURE:
        case types.EDIT_NEWS_FAILURE:
            return {
                ...state,
                request: action.payload.request,
                status: action.payload.status,
                error_message: action.payload.error_message,
            }
        default:
            return state
    }
}

export default news