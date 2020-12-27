import {COMMENTS} from "../shared/comments";
import {ADD_COMMENT, ADD_DISHES, DISHES_FAILED, DISHES_LOADING} from "./ActionTypes";
import {DISHES} from "../shared/dishes";

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            console.log(action.payload);
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log('state');
            console.log(state.length);
            console.log("Comment: ", comment);
            let newState =  state.concat(comment);
            console.log(newState.length);
            return newState;
        default:
            return state;
    }
}