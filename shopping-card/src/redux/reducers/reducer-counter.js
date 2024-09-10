import { DECREMENT, INCREMENT, INCREMENT_BY_VALUE } from "../type";

function reducer_counter (state={count:0,},action){
    
    switch(action.type){
        case INCREMENT:
        return {count:state.count+1};
        case DECREMENT:
        return {count: state.count-1};
        case INCREMENT_BY_VALUE:
        return {count:state.count + action.x};
    default:
    return state;
}

    

return state;
}
export default reducer_counter;