import {combineReducers} from 'redux';
import booksReducer from './booksReducer'
import authReducer from './authReducer'

const appReducer = combineReducers({
    books:booksReducer,
    auth:authReducer
    
});
export default appReducer;