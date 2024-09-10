import React, { useState } from 'react';
import './ChangeEmail.css';
import { useNavigate } from 'react-router-dom';
import basestyle from './Base.module.css';
import { useSelector } from 'react-redux';

function ChangeEmail() {
    const [email, setEmail] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const token = useSelector(state => state.token);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        }
        return errors;
    };

    const signupHandler = (e) => {
        e.preventDefault();
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            const myHeaders = new Headers();
            myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkIvYWhVUFhJbXl2VzczNEhCeE8zYWc9PSIsInZhbHVlIjoiNE54a3FJNUFoZWQ4OTNFdGUrWHhKNkZhM0hnYnlzNlE2b1FpZWx2TlgramdXL3VLQmtTU0dnZ2JXZG1nSHpCZzZqODVtV0xJYmcxTzFmWmltRDd5TXJPN3BnZCtRS3hZRjlFV0FadjNkeDlnOVZjTnlyL1BmZW9GREVpU21ScjUiLCJtYWMiOiI4MDEwODUwOGVmOGE3N2EyMThmN2EwZmZlYjI1MTRjOWUzZWMxNTQ2ZDQ5Yzk3OTNhYWNlMTk2ZTBlYzc5NTRkIiwidGFnIjoiIn0%3D; ahdl_session=eyJpdiI6IkZ3bG8zQU5BQWNQQ2dnZVpKU3pudXc9PSIsInZhbHVlIjoiaTY4WTRidmVCeWNCZEpOQkJpNTQ3M1FLc0lESld3YmpYR2dhYzgvc0hmZHdGZ2RiSDhjUSswSHF4cEQ3SStPZXNFNVgwS25Dd2Y5NnNVNEQ4VENGU281ZTdzY05yUWNORlhoMi8yeUV1Z052Uy9jTE1jU0pxQ0ZxWDRPZXJhTUgiLCJtYWMiOiJiNzIyNDczNzkzMTlhY2VkZWUyNzJiNzBiZTkxYWI0ZTU5NWYwNTczM2ZkNmViNDc5OTFhYjA1OGJjYzBmMmM0IiwidGFnIjoiIn0%3D");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow"
            };

            fetch(`http://127.0.0.1:8000/api/auth/change-email?new_email=${email}&token=${token}`, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then((result) => {
                    console.log(result); // Log response if needed
                    navigate('/confirm_change_email'); // Navigate to success page on success
                })
                .catch((error) => {
                    console.error('Fetch Error:', error);
                    setFormErrors({ api: 'An error occurred. Please try again.' });
                })
                .finally(() => {
                    // Reset form state or perform cleanup if needed
                });
        }
    };

    return (
        <div>
            <div className='changeemail_div'>
                <div className='changeemail'>
                    <form onSubmit={signupHandler}>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={handleEmail}
                            value={email}
                        />
                        {formErrors.email && <p className={basestyle.error}>{formErrors.email}</p>}
                        <button type="submit" className={basestyle.button_common}>Change Email</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangeEmail;
