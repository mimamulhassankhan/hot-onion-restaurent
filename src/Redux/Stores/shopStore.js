import { createStore } from "redux";
import { cartReducer } from "../Reducers/cartReddducer";

export const shopStore = createStore(cartReducer);