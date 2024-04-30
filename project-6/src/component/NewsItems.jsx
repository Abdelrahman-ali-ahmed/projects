import React from 'react';
import news from "../news.jpg"  ;

function NewsItems(props) {
  return (
<div class="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 py-2 px-2"  style={{maxWidth: "345px"} }>
  <img src={props.image?props.image:news} style={{height:"200px",width:"300px"}} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{props.title.slice(0,50)}</h5>
    <p class="card-text">{props.description?props.description.slice(0,50):"News not found"}</p>
    <a href={props.urlarticle} class="btn btn-primary">Go somewhere</a>
  </div>
</div>
  )
}

export default NewsItems