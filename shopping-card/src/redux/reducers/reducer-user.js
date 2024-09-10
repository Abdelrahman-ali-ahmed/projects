import { FETCH_START, FETCH_USER } from "../type";

function reducer_USER (state={users:[],lodaing:false,},action){
    switch(action.type){    
    case FETCH_USER:
    return {users:action.data};
    default:
    return state;
}
}
export default reducer_USER;