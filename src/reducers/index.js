import { combineReducers } from 'redux'
import news from './news'
import auth from "./auth";
import { reducer as formReducer } from 'redux-form'

export default combineReducers ({
    form: formReducer,
    news,
    auth,
})

