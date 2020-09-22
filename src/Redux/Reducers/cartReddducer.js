import { ADD_TO_CART, LOGIN_NEW_USER, REMOVE_FROM_CART } from "../Actions/cartActions";

const { breakfastData } = require("../../FakeData/BreakfastData");

const initialState = {
    user: [],
    cart : [],
    products : [...breakfastData]
}

export const cartReducer = (state = initialState, actions) => {
    switch(actions.type){
        case ADD_TO_CART:
            const newProduct = actions.product;
            return {
                ...state,
                cart : [...state.cart, newProduct]
            }
        case REMOVE_FROM_CART:
            const remaingFoods = state.cart.filter(food => food.id !== actions.id);
            return {
                ...state,
                cart : remaingFoods
            }
        case LOGIN_NEW_USER:
            const newUser = actions.user;
            return {
                ...state,
                user : newUser
            }
        default:
            return state;
    }
}