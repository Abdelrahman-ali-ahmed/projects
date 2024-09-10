import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handelSavePost } from '../../redux/action';
import { useNavigate } from 'react-router-dom';
import basestyle from "./Base.module.css";

function EditPost() {
    const { id } = useParams();  // Correctly get the post id from the URL parameters
    const token = useSelector(state => state.token);  // Get the token from Redux state
    const [post, setPost] = useState(null);  // State to hold the post data
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState('');

    const handleMessage = (e) => setMessage(e.target.value);

    const validateForm = (message) => {
        const errors = {};
        if (!message) errors.message = "Message is required";
        return errors;
    };

    const signupHandler = (e) => {
        e.preventDefault();
        const errors = validateForm(message);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmit(true);
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`http://127.0.0.1:8000/api/post/${id}?body=${message}`, requestOptions)
  .then((response) => response.text())
  .then((result) => {console.log(result);
    navigate('/posts');
  })
  .catch((error) => console.error(error));
        }
    };

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
                setMessage(result.data.body);  // Set initial message value
                dispatch(handelSavePost(result.data));  // Optionally save post to Redux state
            })
            .catch(error => console.error('Fetch Error:', error));
    }, [id, token, dispatch]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='posts_div'></div>
            <div className="register_div">
                <div className="register">
                    <form onSubmit={signupHandler}>
                        <textarea
                            rows="6"
                            onChange={handleMessage}
                            value={message}
                            placeholder="Message"
                        />
                        <p className={basestyle.error}>{formErrors.message}</p>
                        <button type="submit" className={basestyle.button_common}>
                            Edit Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPost;
