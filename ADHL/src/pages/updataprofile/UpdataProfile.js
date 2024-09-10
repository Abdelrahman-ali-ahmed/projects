import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import basestyle from "./Base.module.css";
import "./UpdataProfile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UpdateProfile() {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
  };

  const validateForm = (name, password, cpassword) => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (cpassword !== password) {
      errors.cpassword = "Passwords do not match";
    }
    return errors;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(name, password, cpassword);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `http://127.0.0.1:8000/api/auth/update-profile?name=${name}&password=${password}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success) {
            alert("Profile updated successfully");
            navigate("/profile", { replace: true });
          } else {
            setFormErrors({
              submit: result.message || "Failed to update profile",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setFormErrors({ submit: "Failed to update profile" });
        });
    }
  }, [isSubmit, name, password, token, navigate]);

  return (
    <div>
      <div className="register_div">
        <div className="register">
          <form>
            <input
              type="text"
              placeholder="Name"
              onChange={handleName}
              value={name}
            />
            <p className={basestyle.error}>{formErrors.name}</p>

            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              value={password}
            />
            <p className={basestyle.error}>{formErrors.password}</p>

            <input
              type="password"
              placeholder="Confirm Password"
              onChange={handleCPassword}
              value={cpassword}
            />
            <p className={basestyle.error}>{formErrors.cpassword}</p>

            <div className="register-buttons">
              <Link className="change" to="/change_email">
                Change Email
              </Link>

              <button
                type="submit"
                className={basestyle.button_common}
                onClick={signupHandler}
              >
                Update
              </button>
            </div>
            {formErrors.submit && (
              <p className={basestyle.error}>{formErrors.submit}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
