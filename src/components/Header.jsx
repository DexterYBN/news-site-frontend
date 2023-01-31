import React from "react";
import "./styles/headerStyles.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../features/categoriesSlice";
import { VscAccount } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";
import { serverUrl } from "../serverUrl.js";

const Header = () => {
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const token = useSelector((state) => state.application.token);
  const error = useSelector((state) => state.categories.error);
  const login = useSelector((state) => state.application.login);

  const dispatch = useDispatch();

  const clearToken = () => {
    window.location.reload();
    localStorage.clear(token);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return (
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <header>
      <div className="logo">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="categories">
        {categories.map((category) => {
          return (
            <Link
              key={category._id}
              to={`${serverUrl}/category/${category._id}`}
              className="link"
            >
              {category.name}
            </Link>
          );
        })}
      </div>
      <div className="auth">
        <Link to="/login" hidden={token}>
          Sign In
        </Link>
        {token && (
          <div className="username">
            <VscAccount className="userIcon" />
            {login} |
            <button className="exitButton" onClick={clearToken}>
              Log out
              <BiLogOut className="logoutIcon" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
