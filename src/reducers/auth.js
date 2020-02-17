import * as types from '../сonstants/auth'


const token = localStorage.getItem('token')
const username = localStorage.getItem('name')
const userId = localStorage.getItem('id')

const initialState = {
    request: false,
    error_message: '',
    username: username,
    token,
    isAuth: !!token,
    userId: userId,
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_SIGNUP:
            return {
                ...state,
                token: action.payload.token,
                request: action.payload.request,
                error_message: '',
            }
        case types.AUTH_REQUEST:
            return {
                ...state,
                request: action.payload.request,
                error_message: '',
            }
        case types.AUTH_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                request: action.payload.request,
                error_message: '',
                isAuth: true,
            }

        case types.AUTH_FAILURE:
            return {
                ...state,
                request: action.payload.request,
                error_message: action.payload.error_message,
                isAuth: false,
            }
        case types.AUTH_SIGNOUT:
            return {
                ...state,
                username: null,
                token: null,
                request: action.payload.request,
                error_message: '',
                isAuth: false,
            }
        default:
            return state
    }
}

export default auth