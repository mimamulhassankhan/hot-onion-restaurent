import { allProducts } from "../../FakeData";
import { ADD_TO_CART, LOGIN_NEW_USER, REMOVE_FROM_CART, UPDATE_OWNER_LOGIN } from "../Actions/RestaurantActions";
import { ADD_RESTAURANT } from "../Actions/RestaurantActions";

const initialState = {
    user: [],
    cart : [],
    products : [...allProducts],
    restaurants: [],
    ownerIsSingedIn: false
}

export const restaurantReducer = (state = initialState, actions) => {
    switch(actions.type){
        case ADD_TO_CART:
            return {
                ...state,
                cart : funcToAddCart(state.cart, actions.product)
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
        case ADD_RESTAURANT:
            return {
                ...state,
                restaurants: actions.restaurant
            }
        case UPDATE_OWNER_LOGIN:
            return{
                ...state,
                ownerIsSingedIn: actions.loginState
            }
        default:
            return state;
    }
}

const funcToAddCart = (cartItems, cartItemToAdd) =>{
    const existingCartItem = cartItems.find(item => item.id === cartItemToAdd.id);
    if (existingCartItem) {
        const dfdf = cartItems.map(item =>
        item.id === cartItemToAdd.id
            ? { ...cartItemToAdd, quantity: item.quantity + cartItemToAdd.quantity }
            : item
        );
        return dfdf;
    }  
    return [...cartItems, { ...cartItemToAdd, quantity: cartItemToAdd.quantity }];
}