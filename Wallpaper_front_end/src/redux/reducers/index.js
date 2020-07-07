import {combineReducers} from 'redux';

import favoriteReducer from './favoriteReducer';
import loginReducer from './loginReducer';



export default combineReducers({
    loginReducer, favoriteReducer
})