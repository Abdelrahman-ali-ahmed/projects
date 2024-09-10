import React, { useEffect } from 'react'
import { fetchuser } from './redux/action';
import { useDispatch, useSelector } from 'react-redux';

function User() {
    let {user}=useSelector(state=>state);
    let dispatch=useDispatch();
    useEffect(()=>{
      dispatch(fetchuser()) ;
    })
  return (
<div>{user.users&&user.users.map(item=><div key={item.id}>{item.name}</div>)}</div>

  )
}

export default User;