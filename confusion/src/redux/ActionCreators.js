import * as ActionTypes from './ActionTypes';
import {
    ADD_COMMENT,
    ADD_DISHES,
    ADD_LEADERS,
    DISHES_FAILED,
    DISHES_LOADING,
    LEADERS_FAILED,
    LEADERS_LOADING
} from './ActionTypes';
import {baseUrl} from "../shared/baseUrls";

export const addComment = ( comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
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
    dispatch(dishesLoading());
    return fetch(baseUrl + 'dishes')
        .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));

}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));

};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (dishId, rating, author, comment) => dispatch => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error('Error ' + response.status + ':' + response.statusText)
            error.response = response;
            throw error;
        }
    }, err => {
        throw err;
    })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comments ', error.message);
            alert('Your comment could not be posted\nError: '+error.message);
        })
}

export const addFeedback = (values) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: values
})

export const postFeedback = (values) => dispatch => {
    //
    // let newFeedback ={
    //     firstname: values.firstname,
    //     lastname: values.lastname,
    //     telnum: values.telnum,
    //     email: values.email,
    //     agree: values.agree,
    //     contactType: values.contactType,
    //     message: values.message
    // }

    fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error('Error ' + response.status + ':' + response.statusText)
            error.response = response;
            throw error;
        }
    }, err => {
        throw err;
    })
        .then(response => response.json())
        .then(response => {
            alert('Thank you for your feedback! \n' + JSON.stringify(response))
            dispatch(addFeedback(values));
        })
        .catch(error => {
            console.log('post comments ', error.message);
            alert('Your comment could not be posted\nError: '+error.message);
        })
}

export const leadersLoading = () => ({
    type: LEADERS_LOADING,
});
export const leadersFailed = errMess => ({
    type: LEADERS_FAILED,
    payload: errMess
});

export const addLeaders = leaders => ({
    type: ADD_LEADERS,
    payload: leaders
})

export const fetchLeaders = () => dispatch => {
    dispatch(leadersLoading())
    return fetch(baseUrl + 'leaders')
        .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addLeaders(dishes)))
        .catch(error => dispatch(leadersFailed(error.message)))
};