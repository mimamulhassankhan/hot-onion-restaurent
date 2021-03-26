import { ADD_ALL_FOODS, ADD_ALL_ORDERS, ADD_ALL_SUPPLIERS, ADD_ALL_USERS, ADD_TO_CART, LOGIN_NEW_USER, REMOVE_FROM_CART, UPDATE_CURRENT_USER_LOCATION, UPDATE_OWNER_LOGIN } from "../Actions/RestaurantActions";
import { ADD_RESTAURANT } from "../Actions/RestaurantActions";

const initialState = {
    user: [],
    cart : [],
    allFoods : [],
    restaurants: [],
    restaurantOwnerInfo: {},
    currentUserLocation: {lat: 23.7772, lng: 90.3994},
    allUsers: [],
    allSuppliers: [],
    allOrders: []
}

export const restaurantReducer = (state = initialState, actions) => {
    switch(actions.type){
        case ADD_TO_CART:
            return {
                ...state,
                cart : funcToAddCart(state.cart, actions.product)
            }
        case REMOVE_FROM_CART:
            const remainingFoods = state.cart.filter(food => food._id !== actions.foodId);
            return {
                ...state,
                cart : remainingFoods
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
                restaurantOwnerInfo: actions.ownerInfo
            }
        case UPDATE_CURRENT_USER_LOCATION:
            return{
                ...state,
                currentUserLocation: {lat: actions.lat, lng: actions.lng }
            }
        case ADD_ALL_FOODS:
            return{
                ...state,
                allFoods: actions.foods
            }
        case ADD_ALL_USERS:
            return{
                ...state,
                allUsers: actions.users
            }
        case ADD_ALL_SUPPLIERS:
            return{
                ...state,
                allSuppliers: actions.suppliers
            }
        case ADD_ALL_ORDERS:
            return{
                ...state,
                allOrders: actions.orders
            }
        default:
            return state;
    }
}

const funcToAddCart = (cartItems, cartItemToAdd) =>{
    const existingCartItem = cartItems.find(item => item._id === cartItemToAdd._id);
    if (existingCartItem) {
        const dfdf = cartItems.map(item =>
        item._id === cartItemToAdd._id
            ? { ...cartItemToAdd, quantity: item.quantity + cartItemToAdd.quantity }
            : item
        );
        return dfdf;
    }  
    return [...cartItems, { ...cartItemToAdd, quantity: cartItemToAdd.quantity }];
}