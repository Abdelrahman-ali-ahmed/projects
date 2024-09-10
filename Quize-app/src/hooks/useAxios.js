import axios from 'axios';
import React, { useEffect, useState } from 'react';
axios.defaults.baseURL="https://opentdb.com/"

function useAxios({url}) {
    const [response,setResponse]=useState(null);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
const fatchData=()=>{
    axios
    .get(url)
    .then(res =>setResponse(res.data))
    .catch( err => setError(err))
    .finally( ()=>setLoading(false))

};

fatchData();


    },[url])
  return (
    {response,error,loading}
  )
}

export default useAxios