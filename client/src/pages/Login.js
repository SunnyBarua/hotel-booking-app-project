import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../actions/auth";

const Login = () => {
  const history=useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const res = await login({
            email,
            password,
          });
        console.log("Login User===>", res);
        if(res.data){
          window.localStorage.setItem("auth",JSON.stringify(res.data))
          dispatch({
            type:"LOGGED_IN_USER",
            payload:res.data,
          })
        }
        toast.success("Login Successful!!");
        history.push("/");
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 400) toast.error(err.response.data);
      }
    
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Login Your Account</h1>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
            disabled={!email || !password}
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Login
            </button>
            <Link to="/register" className="register-link">
              <h5>If you don't have account click here...</h5>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
