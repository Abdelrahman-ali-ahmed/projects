
import { createStore,combineReducers,applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { TodoReducer } from "./reducers/todoReducers";
const reducer=combineReducers({
    Todo:TodoReducer,
});
const initialState={};

const store=createStore(reducer,initialState,applyMiddleware(thunk));
export default store;