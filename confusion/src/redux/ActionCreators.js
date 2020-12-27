import * as ActionTypes from './ActionTypes';
import {ADD_DISHES, DISHES_FAILED, DISHES_LOADING} from "./ActionTypes";
import {DISHES} from "../shared/dishes";

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const dishesLoading = () => ({
    type: DISHES_LOADING
})

export const dishesFailed = (errmess) => ({
    type: DISHES_FAILED,
    payload: errmess
});


export const addDishes = (dishes) => ({
    type: ADD_DISHES,
    payload: dishes
})

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    setTimeout(()=>{
        dispatch(addDishes(DISHES));
    }, 2000)
}

