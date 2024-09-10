import { createStore ,applyMiddleware } from "redux";
import reducer from "./reducers";
import { thunk } from "redux-thunk";
let initstate={
    prodects:[],

};


let store=createStore(reducer,applyMiddleware(thunk));
export default store;
