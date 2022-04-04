
import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { register } from "../actions/auth";

const Register = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
   
      try {
        const res = await register({
            name,
            email,
            password,
          });
        console.log("Register User===>", res);
        toast.success("Register success. Please login");
        history.push("/login");
      } catch (err) {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      }
    
  };

  console.log(process.env.REACT_APP_API)

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Join Us</h1>

            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
            <div className="form-group">
              <label htmlFor="password_field">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={!name || !email || !password}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
