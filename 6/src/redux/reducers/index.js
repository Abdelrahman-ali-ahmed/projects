import { combineReducers } from "redux";
import reducer_USER from "./reducer-user";
import reducer_counter from "./reducer-counter";
import reducer_product from "./reducer_prodect";
export default combineReducers(
    {user:reducer_USER,
    counter:reducer_counter,
    product:reducer_product,})