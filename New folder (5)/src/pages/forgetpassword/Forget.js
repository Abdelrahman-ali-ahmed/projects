import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import basestyle from "../../Base.module.css";
import "./forget.css"

function Forget() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

  
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
        setIsSubmit(true);
      }
    };
  
    useEffect(() => {
      if (isSubmit) {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6InhFT0NNbFY4OU1jb0didlgraGtzSWc9PSIsInZhbHVlIjoiRjhySHg0TzlXaUJBbCtjejczVitFZEM2MEhzdXEzZk9LLzVIVk83N0FCZSs1TmNxTXZXOWxETDcraTN1VHNCTXRPSnduODdUOCtHMU1sMzFFb3hwNTltRE8wN0s4MktqQW5JejR2dzFBVUdiWVpFYmxvZnQ3MUxKaFhKbFNOWG4iLCJtYWMiOiJjYTBhOGRjZTcyMjhkMWJlOWNlYWVjNjdlMDdjZDM3NTVmYzE0N2QyMTVjMjMwMWIyNTI3ZTk5MTEyZWI2NTA3IiwidGFnIjoiIn0%3D; ahdl_session=eyJpdiI6IjZTTmJaaDVMWmNwRiszMGtKbzhnTUE9PSIsInZhbHVlIjoiZUZKeitSb3BXVVZOU3lpbkR0azIwMkNKMlpqVjVNTkw1Tkl2UnRBMm5aRWdEUWFkVERkbHhzdWdBVkdpR0JvZDVnY1kzRW5BU0haZ2JRcFpEd3VaWk5adDJOVkNaZjFnOHFvMTZzWXh2NThtM3FZcjF6SGhsRWtIenVtUkRveDYiLCJtYWMiOiI0YjM4MTlmNWE2NGZjYTBlMzBmOWM1MWJiMjg3NDA5Y2ZlYmY4YjBmNWE2YmYxMDM2MTE0Nzg1MDY4NzhkMzc3IiwidGFnIjoiIn0%3D");
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch(`http://127.0.0.1:8000/api/auth/forget-password?email=${email}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            if(result["message"]==="Please Check Your Email")
           { console.log(result);
            navigate('/login', { replace: true });}
          })
          .catch((error) => console.error(error));
      }
    }, [isSubmit, email, navigate]);
  return (
    <div>
        <div className='forget_div'>
        <div className="forget">
          <form onSubmit={signupHandler}>
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmail}
              value={email}
            />
            {formErrors.email && <p className={basestyle.error}>{formErrors.email}</p>}
          
            <button type="submit" className={basestyle.button_common}>get back password</button>
          </form>
        </div>
      </div>


    </div>
  )
}

export default Forget
