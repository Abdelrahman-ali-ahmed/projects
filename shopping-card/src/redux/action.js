import { ADDPRODUCT, DECREMENT, DELETEPRODUCT, FETCH_START, FETCH_USER, FILTERPRODUCT, INCREMENT, INCREMENT_BY_VALUE } from "./type.js";

export function incrementaction(dispatch){
    let increment={type:INCREMENT};
    return  dispatch (increment);
};

export function decrementaction(dispatch){
    let decrement={type:DECREMENT};
    return dispatch(decrement) 
};

export  function incrementactionbyvalue(dispatch,value){
    let incrementbyvalue={type:INCREMENT_BY_VALUE,x:value,}
    return  dispatch(incrementbyvalue)
};
export  function fetchuser (dispatch){
    
return (dispatch)=>{fetch('https://jsonplaceholder.typicode.com/users')
.then(res=>res.json())
.then(data=>dispatch({
    type:FETCH_USER,
    data:data,

}));}


        
    



}


export function deleteProduct(id){

    return{
        type:DELETEPRODUCT,
        id:id
    };
}
export function addProduct(item){

    return{
        type:ADDPRODUCT,
        item:item,
    };
}
export function filterProduct(item){

    return{
        type:FILTERPRODUCT,
        price:item,
    };
}
