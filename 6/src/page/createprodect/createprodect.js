import React,{useContext} from "react";
import{ Component } from "react";
import"./createprodecr.css"
import { Datacontext } from "../../App.js";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/action.js";

function CreateProdect (props) {
    let c=props.prodects;
    let {product}=useSelector(state=>state);
    let dispatch=useDispatch();
    let name="";
    let price="";

    let handelchangename=(e)=>{
        name=e.target.value;
       }
       let handelchangeprice=(e)=>{
        price=e.target.value;
       }
       let handeladdprodect =(e)=>{
        e.preventDefault();
        let addp={
            id:product.products.lenght+1,
            name:name,
            price:price,
        }
        dispatch(addProduct(addp));

        // props.setProdect([...props.prodects,addp]);
       }

        return(<div>
            
            <form onSubmit={handeladdprodect}>
             <input type="text" placeholder="name" onChange={handelchangename}/>
             <input type="numper" placeholder="price" onChange={handelchangeprice}/>
             <input type="submit" value="add prodect"/>

            </form>
            
            
             </div>)
    
};
export default CreateProdect;
