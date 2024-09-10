import { ADDPRODUCT, DELETEPRODUCT, FETCH_START, FETCH_USER, FILTERPRODUCT } from "../type";
import {prodects as items} from "../../data.js"
const initialproduct={products:items,};
function reducer_product (state=initialproduct,action){
    switch(action.type){  
    case  DELETEPRODUCT:
    let allprodect=state.products.filter(p=> p.id != action.id);
    return {products:allprodect};

    case  ADDPRODUCT:
    return {products:[...state.products,action.item]};
    case  FILTERPRODUCT:
    let newprodect=items.filter(p=> p.price == action.price)    
    return {products:newprodect};

    default:
    return state;
}
}
export default reducer_product;