import {ADD_TO_FAVORITE , REMOVE_FROM_FAVORITE} from '../actionTypes'

export function add_to_favorite(image_data){
    return {
        type : ADD_TO_FAVORITE,
        payload : {
            image_data : image_data
        }
    }
}