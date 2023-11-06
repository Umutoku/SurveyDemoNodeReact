import React, { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('jwt');

  const [loading, setLoading] = useState(false);

  const handleClickLogo = () => {
    if (window.location.pathname !== "/") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 500);
    }
  };

  // Kullanıcı çıkışını yapmak için bu işlemi kullanabilirsiniz.
  const signOutUser = () => {
   localStorage.removeItem('jwt');
  };

  return (
    <>
      {loading && (
        <div className="loading-gif">
          <span className="loader"></span>
        </div>
      )}
      <div className="Navbar-div">
        <div className="Navbar">
          <button onClick={handleClickLogo} className="logo">
          <i className="fas fa-regular fa-book fa-2x"></i>
          </button>

          {!token && (

            <div className="navbar-link">
             <Link className="navbar-link" to="/login">
              Login
            </Link>

            <Link className="navbar-link" to="/register">
              Register
            </Link>
            </div>
          )}
          {token && (
            <div className="nav-links">
            <Link className="navbar-link" to="/createSurvey">Anket oluştur</Link>

            <Link className="navbar-link" onClick={signOutUser} to="/">
              Logout
            </Link>

            </div>

          )}
       

        </div>
      </div>
    </>
  );
};

export default Navbar;
