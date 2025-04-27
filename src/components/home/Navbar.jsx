import React from "react";
import "./Navbar.css";

function Navbar({ onLoginClick, onHomeClick }) {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
        <span className="logo-red">Cedar</span>
        <span className="logo-black">Shield</span>
      </div>
        <div className="navbar-links">
          <button
            onClick={(event) => {
              onHomeClick();
            }}
            className="navbar-link"
          >
            Home
          </button>
          <button onClick={onLoginClick} className="navbar-button">
            Login
          </button>
        </div>
      </nav>
    );
  }
export default Navbar;
