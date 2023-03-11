import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../features/categoriesSlice";
import { VscAccount } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";
import "./styles/headerStyles.css";
import logo from "../assets/logo.png";

const Header = () => {
  const categories = useSelector((state) => state.categories.categories);
  const token = useSelector((state) => state.application.token);
  const login = useSelector((state) => state.application.login);

  const dispatch = useDispatch();

  const clearToken = () => {
    localStorage.clear(token);
    window.location.reload();
  };

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
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
