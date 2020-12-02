import { createStore } from "redux";
import {restaurantReducer} from "../Reducers/RestaurantReducers";

export const restaurantStore = createStore(restaurantReducer);