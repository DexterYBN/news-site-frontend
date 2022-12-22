import React from "react";
import "./styles/headerStyles.css";
import { Link } from "react-router-dom";
import logo from "../logo.png";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="auth">
        <Link to="/login">Войти</Link> | <Link to="/register">Регистрация</Link>
      </div>
    </header>
  );
};

export default Header;
