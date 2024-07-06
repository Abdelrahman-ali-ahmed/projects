import React ,{useContext}from "react";
import{ Component } from "react";
import"./listprodect.css";
import { NavLink } from "react-router-dom";
import Prodect from "../../compnent/prodect/prodect";
import { Datacontext } from "../../App.js";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/action.js";

function ListpProdect (props){
    let {product}=useSelector(state=>state)
    // let c=props.prodects
  let dispatch=useDispatch();
    console.log(product);

     let handeldelet=(id)=>{
        dispatch(deleteProduct(id));

     }
       
        return(<div className="boxes">

            {product.products.map( (prodect)=>{return(<div className="box"><NavLink to={`/prodect/${prodect.id}`}  key={prodect.id}>
                <Prodect prodect={prodect}/>  </NavLink>
                
                <button onClick={()=>handeldelet(prodect.id)}> delete</button>
                </div>)})
    }</div>)

};
export default ListpProdect;
