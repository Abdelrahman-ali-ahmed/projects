import React from "react";
import "./Logout.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handelLOGGED, handelTOKEN } from "../../redux/action";
import basestyle from "./Base.module.css";

function LogOut() {
  const logged = useSelector((state) => state.logged);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handellogout = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "XSRF-TOKEN=your_xsrf_token; ahdl_session=your_ahdl_session"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://127.0.0.1:8000/api/auth/logout?token=${token}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        if (!result) {
          console.log(result);
          dispatch(handelLOGGED(false));
          dispatch(handelTOKEN(""));
          navigate("/login", { replace: true });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <div>
        <div className="logout_div">
          <div className="logout">
            <form onSubmit={handellogout}>
              <button type="submit" className={basestyle.button_common}>
                log out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogOut;
