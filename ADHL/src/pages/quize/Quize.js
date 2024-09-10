import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handelSavePost, handelSaveTestId } from "../../redux/action";
import basestyle from "./Base.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import "./Quize.css";
function Quize() {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const token = useSelector((state) => state.token); // Adjust this if the token is nested
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateForm = (selectedTest) => {
    const error = {};
    if (!selectedTest) {
      error.name = "selectedTest is required";
    }

    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(selectedTest));
    setIsSubmit(true);
    dispatch(handelSaveTestId(selectedTest));
    // if (!formErrors) {
    //   setIsSubmit(true);
    // }
    navigate("/quize/Question", { replace: true });
  };

  useEffect(() => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    const fetchPosts = () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://127.0.0.1:8000/api/specified-tests", requestOptions)
        .then((response) => response.json()) // Use response.json() to parse JSON response
        .then((result) => {
          if (result.data && Array.isArray(result.data)) {
            setData(result.data);
          } else {
            console.error("API response does not contain data array:", result);
            setData([]);
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
          setData([]);
        });
    };

    fetchPosts();
  }, [token, dispatch]);

  return (
    <div>
      <div className="register_div">
        <div className="register">
          <form>
            {data.map((item, index) => (
              <div key={index} className="disease">
                <input
                  type="radio"
                  name="disease"
                  onChange={() => setSelectedTest(item.id)}
                  value={item["English Name"]}
                />

                <span>{item["English Name"]}</span>
              </div>
            ))}
            <button
              type="submit"
              className={basestyle.button_common}
              onClick={signupHandler}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Quize;
