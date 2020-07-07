import {REQUEST_LOGIN, RECEIVE_LOGIN} from '../actionTypes';

const initialstate = {
    status_code : " ",
    token : "",
}

export default function loginReducer(state = initialstate, action){
    switch(action.type){
        case RECEIVE_LOGIN:{
            return Object.assign({}, state,{
                status_code : action.payload.status_code,
                token : action.payload.token
            })
        }
        default :
            return state
    }
}
