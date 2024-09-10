import React from 'react'
import'./post.css'

function Post(props) {
  return (
    <div> <div key={props.id} className="post">
    <h2>{props.title}</h2>
    <p>{props.body}</p>
</div></div>
  )
}

export default Post