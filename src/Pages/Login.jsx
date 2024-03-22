import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { login } = useUserContext();
  const handleLogin = async (values) => {
    await login(values);
  };
  const notifyWithPromise = () => {
    toast.promise(handleLogin(data), {
      pending: "Loading...",
      success: (data) => `Data fetched successfully: ${data}`,
      error: (error) => `Error fetching data: ${error.message}`,
    });
  };
  return (
    <div style={{ background: "#FBFCFF", height: "100vh" }}>
      <Link to="/">
        <img
          style={{ marginTop: "10px", marginLeft: "5px" }}
          className="arrow2"
          src="/images/left-arrow (2).png"
          alt=""
        />
      </Link>
      <img className="ab_img" src="/images/Circle (1).svg" alt="" />
      <div className="login_flex ">
        <div>
          <img className="signup_img" src="/images/Group 392.png" alt="" />
        </div>
        <div className="content_part">
          <h4 className="text-center">Login</h4>
          <div className="fields_flex fields_flex_mbl">
            <div className="login_with">
              <div className="pb-4">
                <label htmlFor="email">Email</label>
                <br></br>
                <input
                  className="input_cls login_with"
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="fields_flex pt-0 pb-0 fields_flex_mbl">
            <div className="item_fields_2 login_width">
              <div className=" pb_4 login_with">
                <label htmlFor="password">Password</label>
                <br></br>
                <input
                  className="input_cls login_with"
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <Link to="/forgot">
            <div
              className="mbl_v"
              style={{
                fontFamily: "exo-reg",
                fontSize: "11px",
                paddingTop: "10px",
              }}
            >
              Forgot Password
            </div>
          </Link>
          <div className="btn2">
            <button onClick={() => notifyWithPromise()} className="login-btn">
              Login
            </button>
          </div>
          <div className="forgot_title">Don’t have any account yet?</div>
          <Link to="/register">
            <div className="btn2">
              <button className="login-btn mt-2">Sign up</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
