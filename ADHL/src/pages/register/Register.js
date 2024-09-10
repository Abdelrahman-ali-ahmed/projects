import React, { useEffect, useState } from 'react';
import basestyle from "./Base.module.css";
import "./register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [category_id, setCategory_id] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [age, setAge] = useState('');
  const [relation, setRelation] = useState('');
  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCPassword = (e) => setCPassword(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleRelation = (e) => setRelation(e.target.value);

  const validateForm = (name, email, password, cpassword, relation) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!name) errors.name = "First Name is required";
    if (!email) errors.email = "Email is required";
    else if (!regex.test(email)) errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    else if (password.length < 4 || password.length > 10) errors.password = "Password must be between 4 to 10 characters";
    if (!cpassword) errors.cpassword = "Confirm Password is required";
    else if (cpassword !== password) errors.cpassword = "Passwords do not match";
    if (!relation) errors.relation = "Relation is required";

    return errors;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(name, email, password, cpassword, relation);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const requestOptions = {
        method: "POST",
        redirect: "follow"
      };

      fetch(`http://127.0.0.1:8000/api/auth/register?name=${name}&email=${email}&password=${password}&category_id=${category_id}&age=${age}&relation=${relation}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          navigate("/confirmcode", { replace: true });
        })
        .catch(error => console.error('Error:', error));
    }
  }, [formErrors]);

  return (
    <div>
      <div className="register_div">
        <div className="register">
          <form>
            <input type="text" placeholder="Name" onChange={handleName} value={name} />
            <p className={basestyle.error}>{formErrors.name}</p>

            <input type="email" placeholder="Email" onChange={handleEmail} value={email} />
            <p className={basestyle.error}>{formErrors.email}</p>

            <input type="password" placeholder="Password" onChange={handlePassword} value={password} />
            <p className={basestyle.error}>{formErrors.password}</p>

            <input type="password" placeholder="Confirm Password" onChange={handleCPassword} value={cpassword} />
            <p className={basestyle.error}>{formErrors.cpassword}</p>

            <input type="text" placeholder="Age for patient" onChange={handleAge} value={age} />

            <select onChange={handleRelation} value={relation}>
              <option value="">Select Relation</option>
              <option value="parent">Parent</option>
              <option value="sister">Sister</option>
              <option value="brother">Brother</option>
            </select>

            <div className='dis'>
              <p className={basestyle.error}>{formErrors.disease}</p>
              <input type="radio" name="disease" onChange={() => setCategory_id(2)} value={2} /> Autism
              <input type="radio" name="disease" onChange={() => setCategory_id(1)} value={1} /> Difficulty learning
              <input type="radio" name="disease" onChange={() => setCategory_id(3)} value={3} /> Hyperactivity
            </div>

            <button type="submit" className={basestyle.button_common} onClick={signupHandler}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
