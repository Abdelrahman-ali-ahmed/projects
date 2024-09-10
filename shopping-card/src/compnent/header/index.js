import React from "react";
import"./header.css";
import {NavLink} from "react-router-dom";
function Header(){
    return(<div className="Header">

      <ul>
      <li><NavLink to='/'>home</NavLink></li>
      <li><NavLink to='/prodect'>prodect</NavLink></li>
      <li><NavLink to='/createprodect'>add prodect</NavLink></li>
      <li><NavLink to='/viewprodect'>view prodect</NavLink></li>
       
      </ul>
    </div>)
};
export default Header;