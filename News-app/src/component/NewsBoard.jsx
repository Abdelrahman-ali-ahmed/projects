import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems';

function NewsBoard(props) {
    const [articles,setArticle]=useState([]);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(true);
    const VITE_API_KEY="c1a0300a512946fa8789f0abfaead8be";
    useEffect(()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=c1a0300a512946fa8789f0abfaead8be`;
//   axios
//   .get(url)
//   .then(res =>setArticle(res.data.articles))
//   .catch( err => setError(err))
//   .finally( ()=>setLoading(false))

fetch(url)
  .then((res)=> res.json())
  .then((data)=>{setArticle(data.articles)})
  .catch(function(err){setError(err)});

    },[props.category])
    // console.log(articles);
  return (
    
    <div>
<h2 className='text-center'>Latest <span className='badge bg-danger'>News</span></h2>
{articles.map((article,index)=>{return(<NewsItems key={index} image={article.urlToImage} title={article.title} description={article.description} urlarticle={article.url}/>)})}
    </div>
  )
}

export default NewsBoard