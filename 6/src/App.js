import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState,createContext} from 'react';
import {prodects as items} from "./data.js"
import Footer from './compnent/footer/index.js';
import Header from './compnent/header/index.js';
import Home from './page/Home/Home.js';
import {BrowserRouter,Routes,Route, NavLink} from "react-router-dom";
import ListpProdect from './page/listprodect/listprodect.js';
import ViewProdect from './page/viewprodect/viewprodect.js';
import CreateProdect from './page/createprodect/createprodect.js';
import ViewProdectdetails from './page/viewproductdetials/viewprodecy detials.js';
import { useDispatch, useSelector } from 'react-redux';
import store from './redux/store.js';
import Countr from './countr.js';
import User from './user.js';
import { filterProduct } from './redux/action.js';
export let Datacontext=createContext();
function App () {
  
  let [prodects,setProdects]=useState(items);
  let [name,setName]=useState("");
  let [Price,setPrice]=useState(0);
  let dispatch=useDispatch();
  
let handelfilter=(e)=>{
  // let newprodects=items.filter((p)=>p.price == e.target.value);
  dispatch(filterProduct(e.target.value));
// setProdects(newprodects);
};

  return (
    
    
  <BrowserRouter>
  
  <Header/>
    <main>
      <select onChange={handelfilter}>
<option value="1000">1000 </option>
<option value="2000">2000 </option>
<option value="3000">3000</option>
      </select>
      
    
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/countr" element={<Countr/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/prodect" element={<ListpProdect  prodects={prodects} setProdect={setProdects}/>}/>
        <Route path="/viewprodect" element={<ViewProdect/>}/>
        <Route path="/createprodect" element={<CreateProdect prodects={prodects}setName={setName} setPrice={setPrice} name={name} price={Price}  setProdect={setProdects} />}/>
        <Route path="/prodect/:id" element={<ViewProdectdetails  prodects={prodects} />}/>
      </Routes>
    </main>
    <Footer/>
    </BrowserRouter>
    
    
  );
}

export default App;
