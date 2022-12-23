import React from "react";
import "./styles/headerStyles.css";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../features/categoriesSlice";

const Header = () => {
  const categories = useSelector((state) => state.categories.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
              to={`/category/${category._id}`}
              className="link"
            >
              {category.name}
            </Link>
          );
        })}
      </div>
      <div className="auth">
        <Link to="/login">Войти</Link> | <Link to="/register">Регистрация</Link>
      </div>
    </header>
  );
};

export default Header;
