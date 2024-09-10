import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import basestyle from './Base.module.css';
import './confirmcode.css';

function ConfirmCode() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

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
      const requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };

      fetch(`http://127.0.0.1:8000/api/auth/confirmCode?code=${confirm}&email=${email}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          alert('Code confirmed successfully');
          navigate('/login', { replace: true });
        })
        .catch((error) => console.error(error));
    }
  }, [isSubmit, confirm, email, navigate]);

  return (
    <div>
      <div className='confirm_div'> 
        <div className='confirm'>
        <form onSubmit={signupHandler}>
        <input
          type="email"
          placeholder="New Email"
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
        <button type="submit" className={basestyle.button_common}>Confirm Code</button>
      </form>
        </div>
      </div>
     
    </div>
  );
}

export default ConfirmCode;

// {{url}}/api/auth/login
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTgxMTYyNzcsImV4cCI6MTcxODExOTg3NywibmJmIjoxNzE4MTE2Mjc3LCJqdGkiOiI0N3hQTXltaU9Bc1Q2QlVjIiwic3ViIjoiMTEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.mAY_D7ospTe5JZp0XTef_M02Sx1r9z5W5nk9cno3Uxs