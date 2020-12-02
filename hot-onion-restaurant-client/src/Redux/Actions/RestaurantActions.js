export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const LOGIN_NEW_USER = 'LOGIN_NEW_USER';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const UPDATE_OWNER_LOGIN = 'UPDATE_OWNER_LOGIN';

export const addToCart = (product) => {
    return {type: ADD_TO_CART, product}
}

export const removeFromCart = id => {
    return {type: REMOVE_FROM_CART, id}
}

export const addLoggedinUser = user => {
    return {type: LOGIN_NEW_USER, user}
}

export const addRestaurant = restaurant => {
    return {
        type: ADD_RESTAURANT,
        restaurant
    }
}

export const updateOwnerLogin = loginState => {
    return{
        type: UPDATE_OWNER_LOGIN,
        loginState
    }
}