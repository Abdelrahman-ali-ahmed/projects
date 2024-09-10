import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../../component/post/post';
import { handelSavePost } from '../../redux/action';
import { useNavigate } from 'react-router-dom';
import"./postdetials.css"
function Postdetails() {
    const { id } = useParams();  // Correctly get the post id from the URL parameters
    const token = useSelector(state => state.token);  // Get the token from Redux state
    const [post, setPost] = useState(null);  // State to hold the post data
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handeldelete = (id) => {
      
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`http://127.0.0.1:8000/api/posts/${id}`, requestOptions)
  .then((response) => response.text())
  .then(result => {
    console.log(result);
    // if (result.message === "the post deleted") {
    //     navigate("/posts", { replace: true });
    // }
    navigate("/posts", { replace: true });
})
  .catch((error) => console.error(error));
    }

    const handeledit = (id) => {
        navigate(`/edit_post/${id}`);
    }

    useEffect(() => {
        if (!token) {
            console.error("Token is missing");
            return;
        }

        const requestOptions = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            redirect: "follow"
        };

        fetch(`http://127.0.0.1:8000/api/post/${id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log('Post fetched:', result);
                setPost(result.data);  // Assuming the response has a `data` field with the post details
                dispatch(handelSavePost(result.data));  // Optionally save post to Redux state
            })
            .catch(error => console.error('Fetch Error:', error));
    }, [id, token, dispatch]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="box">
            <h1>View Product Details {id}</h1>
            <div key={post.id} className="post">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
            <button onClick={() => handeldelete(id)}>Delete</button>
            <button onClick={() => handeledit(id)}>Edit</button>
        </div>
    );
}

export default Postdetails;
