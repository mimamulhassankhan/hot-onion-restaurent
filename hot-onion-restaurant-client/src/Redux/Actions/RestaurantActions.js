export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const LOGIN_NEW_USER = 'LOGIN_NEW_USER';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const UPDATE_OWNER_LOGIN = 'UPDATE_OWNER_LOGIN';
export const UPDATE_CURRENT_USER_LOCATION = 'UPDATE_CURRENT_USER_LOCATION';
export const ADD_ALL_FOODS = 'ADD_ALL_FOODS';
export const ADD_ALL_USERS = 'ADD_ALL_USERS';
export const ADD_ALL_SUPPLIERS = 'ADD_ALL_SUPPLIERS';
export const ADD_ALL_ORDERS = 'ADD_ALL_ORDERS';

export const addToCart = (product) => {
    return {type: ADD_TO_CART, product}
}

export const removeFromCart = foodId => {
    return {type: REMOVE_FROM_CART, foodId}
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

export const updateOwnerLogin = ownerInfo => {
    return{
        type: UPDATE_OWNER_LOGIN,
        ownerInfo
    }
}

export const setCurrentUserLocation = (lat, lng) => {
    return{
        type: UPDATE_CURRENT_USER_LOCATION,
        lat,
        lng
    }
}

export const setAllFoods = foods => {
    return{
        type: ADD_ALL_FOODS,
        foods
    }
}

export const setAllUsers = users => {
    return{
        type: ADD_ALL_USERS,
        users
    }
}

export const setAllSuppliers = suppliers => {
    return{
        type: ADD_ALL_SUPPLIERS,
        suppliers
    }
}

export const setAllOrders = orders => {
    return{
        type: ADD_ALL_ORDERS,
        orders
    }
}


