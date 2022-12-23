import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../features/applicationSlice";
import { Link } from "react-router-dom";
import "./styles/signUp.css";

const SignUp = () => {
  const error = useSelector((state) => state.application.error);
  const registrationing = useSelector(
    (state) => state.application.registrationing
  );

  // Состояния
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Дисппетчер
  const dispatch = useDispatch();

  // На input. Для логина
  const handleSetName = (e) => {
    setLogin(e.target.value);
  };
  // На input. Для пароля
  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };
  // Форма отправки данных
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authRegister({ login, password }));
  };

  // При ошибке
  if (error) {
    return <div>{error}</div>;
  }

  // Прелоадер
  if (registrationing) {
    return (
      <div style={{ color: "brown", fontSize: "50px", textAlign: "center" }}>
        Registration in progress. Wait...
      </div>
    );
  }

  return (
    <div className="register">
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={login}
          placeholder="name"
          onChange={handleSetName}
        />
        <br />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={handleSetPass}
        />
        <br />
        <button disabled={!login || !password} type="submit">
          Register
        </button>
        <h3>
          Already have an account? <Link to="/login">Sign In</Link>
        </h3>
      </form>
    </div>
  );
};

export default SignUp;
