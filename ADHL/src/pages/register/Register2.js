import React, { useEffect, useState } from "react";
import basestyle from "./Base.module.css";
import registerstyle from "./register.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [disease,setdisease] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({

   name: "",
    email: "",
    password: "",
    cpassword: "",
    disease:"",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fname) {
      error.fname = "First Name is required";
    }
    if (!values.lname) {
      error.lname = "Last Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {
    //   setIsSubmit(true);
    // }
  };

  
    //   const requestOptions = {
    //     method: "POST",
    //     redirect: "follow"
    //   };
      
    //   fetch(`http://127.0.0.1:8000/api/auth/register?name=${user.name} &email=${user.email}&password=${user.password}& category_id=1`, requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.error(error));
    // }
   
     useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(user);
        axios.post(`http://127.0.0.1:8000/api/auth/register?name=${user.name} &email=${user.email}&password=${user.password}& category_id=1`, user).then((res) => {
          alert(res.data.message);
          navigate("/login", { replace: true });
        });
      }
    }, [formErrors]);
  return (
    <>
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="name"
            id="name"
            placeholder=" Name"
            onChange={changeHandler}
            value={user.name}
          />
          <p className={basestyle.error}>{formErrors.name}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            value={user.cpassword}
          />
          <div className='dis' >
          <p className={basestyle.error}>{formErrors.disease}</p>
          <input
            type="radio"
            name="disease"
            onChange={e=>setdisease(e.target.value)}
            value={user.disease}
          />Autism
          <p className={basestyle.error}>{formErrors.disease}</p>
          <input
            type="radio"
            name="disease"
            onChange={e=>setdisease(e.target.value)}
            value={user.disease}
          />Difficulty learning
          <p className={basestyle.error}>{formErrors.disease}</p>
          <input
            type="radio"
            name="disease"
            onChange={e=>setdisease(e.target.valuSe)}
            value={user.disease}
          />Hyperactivity
          </div>
          <input type="submit" value=" Register" className={basestyle.button_common} onClick={signupHandler}/>
            
          
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </>
  );
};
export default Register;
