import React from 'react';
import {useEffect, useState,createContext}from "react";
import { useDispatch, useSelector } from 'react-redux';
import { incrementaction,decrementaction,incrementactionbyvalue } from './redux/action';


function Countr() {
    let {counter}=useSelector((state)=>state);
    let dispatch=useDispatch();
    let handelupp=()=>{
        
       
        incrementaction( dispatch);
    };
    let handeldown=()=>{
        
      decrementaction(dispatch);
        
    };
    let handelbyvalue=(value)=>{
        
      incrementactionbyvalue(dispatch,value);
    };

  return (
    <div className="Countr">
    <button onClick={handelupp}>+1</button>
    <p>{counter.count}</p>
    <button onClick={handeldown}>-1</button>
    <button onClick={()=>handelbyvalue(5)}>+5</button>
</div>
  )
}

export default Countr