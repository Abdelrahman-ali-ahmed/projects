import React, { useState, useEffect } from 'react';
import './ConfirmChangeEmail.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import basestyle from './Base.module.css';

function ConfirmChangeEmail() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [confirm, setConfirm] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    // Assuming token is stored in Redux state
    const token = useSelector(state => state.token);

    const handleConfirm = (e) => {
        setConfirm(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!confirm) {
            errors.confirm = 'Confirmation code is required';
        }
        return errors;
    };

    const signupHandler = (e) => {
        e.preventDefault();
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmit(true);
        }
    };

    useEffect(() => {
        if (isSubmit) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({ email, code: confirm }),
                redirect: "follow"
            };

            fetch("http://127.0.0.1:8000/api/auth/confirmChange", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    console.log('API Response:', result);
                    if (result.status === 201) {
                        navigate('/profile'); // Navigate to profile page on success
                    } else {
                        setFormErrors({ api: result.message });
                    }
                })
                .catch(error => {
                    console.error('Fetch Error:', error);
                    setFormErrors({ api: 'An error occurred. Please try again.' });
                })
                .finally(() => {
                    setIsSubmit(false);
                });
        }
    }, [isSubmit, confirm, email, navigate, token]);

    return (
        <div>
            <div className='confirm_div'>
                <div className='confirm'>
                    <form onSubmit={signupHandler}>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={handleEmail}
                            value={email}
                        />
                        {formErrors.email && <p className={basestyle.error}>{formErrors.email}</p>}
                        <input
                            type="text"
                            placeholder="Confirmation Code"
                            onChange={handleConfirm}
                            value={confirm}
                        />
                        {formErrors.confirm && <p className={basestyle.error}>{formErrors.confirm}</p>}
                        {formErrors.api && <p className={basestyle.error}>{formErrors.api}</p>}
                        <button type="submit" className={basestyle.button_common}>Confirm Code</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfirmChangeEmail;
