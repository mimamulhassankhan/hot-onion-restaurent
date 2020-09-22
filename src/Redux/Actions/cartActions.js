export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const LOGIN_NEW_USER = 'LOGIN_NEW_USER';

export const addToCart = (product) => {
    return {type: ADD_TO_CART, product}
}

export const removeFromCart = id => {
    return {type: REMOVE_FROM_CART, id}
}

export const addLoggedinUser = user => {
    return {type: LOGIN_NEW_USER, user}
}