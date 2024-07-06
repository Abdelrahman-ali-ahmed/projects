import React, { useState, useEffect } from 'react';
import basestyle from "../../Base.module.css";
import './login.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handelLOGGED, handelTOKEN } from '../../redux/action';

function Login() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
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
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
        redirect: "follow"
      };
      
      fetch('http://127.0.0.1:8000/api/auth/login', requestOptions)
        .then((response) => response.json())
        .then((result) => {
         
          if(result["email"]){
            dispatch(handelLOGGED(true));
          }
          if (result["message"]==="User successfully Logged in") {
            dispatch(handelLOGGED(true));
            dispatch(handelTOKEN(result["data"]["token"]));
            navigate('/profile', { replace: true });
           
          } else {
            alert('Login failed');
          }
          console.log(result["token"]);
        })
        .catch((error) => console.error('Error:', error))
        .finally(() => setIsSubmit(false));
    }
  }, [isSubmit, email, password, navigate]);

  return (
    <div>
      <div className='login_div'>
        <div className="login">
          <form onSubmit={signupHandler}>
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmail}
              value={email}
            />
            {formErrors.email && <p className={basestyle.error}>{formErrors.email}</p>}
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              value={password}
            />
            {formErrors.password && <p className={basestyle.error}>{formErrors.password}</p>}
            <button type="submit" className={basestyle.button_common}>Login</button>
          </form>
          <NavLink to="/forgetpassword" className="re_name">forget password</NavLink>
          <NavLink to="/register" className="re_name">Not registered yet? Register Now</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;