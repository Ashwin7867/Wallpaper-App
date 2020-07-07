import {RECEIVE_LOGIN} from '../actionTypes';


export function receive_login(status, token){
    return {
        type : RECEIVE_LOGIN,
        payload : {
            status_code : status,
            token : token
        }
    }
}
