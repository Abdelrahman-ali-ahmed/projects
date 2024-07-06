import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../../component/post/post';
import { handelSavePost } from '../../redux/action';
import { NavLink } from 'react-router-dom';
import basestyle from "./Base.module.css";

function Posts() {
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState('');

    const token = useSelector(state => state.token); // Adjust this if the token is nested
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

   
    const handleMessage = (e) => setMessage(e.target.value);

    const validateForm = ( message) => {
        const errors = {};
    
        if (!message) errors.message = "Message is required";
        return errors;
    };

    const signupHandler = (e) => {
        e.preventDefault();
        const errors = validateForm( message);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmit(true);
        }
    };

    useEffect(() => {
        if (!token) {
            console.error("Token is missing");
            return;
        }

        const fetchPosts = () => {
            fetch(`http://127.0.0.1:8000/api/posts?token=${encodeURIComponent(token)}`)
                .then(response => response.json())
                .then(result => {
                    if (result.data && Array.isArray(result.data)) {
                        setData(result.data);
                        dispatch(handelSavePost(result.data));
                    } else {
                        console.error('API response does not contain data array:', result);
                        setData([]);
                    }
                })
                .catch(error => {
                    console.error('Fetch Error:', error);
                    setData([]);
                });
        };

        fetchPosts();
    }, [token, dispatch]);

    useEffect(() => {
        if (isSubmit && Object.keys(formErrors).length === 0) {
            
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              redirect: "follow"
            };
            
            fetch(`http://127.0.0.1:8000/api/addpost?body=${message}`, requestOptions)
              .then((response) => response.text())
              .then((result) => console.log(result))
              .catch((error) => console.error(error));
        }
    }, [isSubmit, formErrors, message, token]);

    return (
        <div>
            <div className='posts_div'>
                {data.length > 0 ? (
                    data.map((post) => (
                        <NavLink to={`/post/${post.id}`} key={post.id}>
                            <Post id={post.id} title={post.title} body={post.body} />
                        </NavLink>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
            <div className="register_div">
                <div className="register">
                    <form>
                       
                        <textarea 
                            rows="6" 
                            onChange={handleMessage} 
                            value={message} 
                            placeholder="Message"
                        />
                        <p className={basestyle.error}>{formErrors.message}</p>
                        <button type="submit" className={basestyle.button_common} onClick={signupHandler}>
                            Add post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Posts;
