import {ADD_TO_FAVORITE , REMOVE_FROM_FAVORITE} from '../actionTypes';

const initialState = [];

export default function favoriteReducer(state = initialState , action){
    switch(action.type){
        case ADD_TO_FAVORITE : {
            return [...state, action.payload.image_data]
        }
        default : 
            return state
    }
}