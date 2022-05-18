import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
const Header = () => {
  const history=useHistory()
  const dispatch=useDispatch()
  const {auth}=useSelector((state)=>({...state}))
  const logout=()=>{
    dispatch({
      type:"LOGOUT",
      payload:null
    })
    window.localStorage.removeItem("auth")
    history.push("/login")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand nav-link" to="/">
            EasyBookIt
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-icon">
              <i className="fas fa-bars"></i>{" "}
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <Link className="nav-item nav-link active" to="/">
                Home <span className="sr-only"></span>
              </Link>
              {auth !==null &&(
               <>
                <Link className="nav-item nav-link" to="/dashboard">
                Dashboard
              </Link>
               </>
             )}
             {auth ===null &&(
               <>
                <Link className="nav-item nav-link" to="/login">
                Login
              </Link>
               </>
             )}
             {auth !==null &&(
               <>
                <button className="nav-item logout-btn" onClick={logout}>
                Logout
              </button>
               </>
             )}
              
              <Link className="nav-item nav-link" to="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
