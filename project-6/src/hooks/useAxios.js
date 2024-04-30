import axios from 'axios';
import React, { useEffect, useState } from 'react';
axios.defaults.baseURL=" https://newsapi.org/v2/top-headlines?country=us&apiKey=c1a0300a512946fa8789f0abfaead8be"

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