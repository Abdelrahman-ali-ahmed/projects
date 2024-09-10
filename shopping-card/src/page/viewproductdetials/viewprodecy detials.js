import React ,{useContext}from "react";
import { useParams } from "react-router-dom";
import "./viewprodectdetails.css";
import Prodect from "../../compnent/prodect/prodect";
import { Datacontext } from "../../App.js";
import { useSelector } from "react-redux";


function ViewProdectdetails (props){
    let {product}=useSelector(state=>state)
    let perams=useParams();
    let prodect=product.products.find(prodect=>prodect.id==perams.id)
 return(<div className="box"> viewprodectdetials {perams.id}
  <Prodect prodect={prodect}/>
   </div>)
    
};
export default ViewProdectdetails;