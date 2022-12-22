import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../features/applicationSlice";
import { Link } from "react-router-dom";

const SignIn = () => {
  const error = useSelector((state) => state.application.error);
  const logining = useSelector((state) => state.application.logining);

  // Состояния
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Диспетчер
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
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(authLogin({ login, password }));
  };

  // При ошибке
  if (error) {
    return <div>{error}</div>;
  }

  // Прелоадер
  if (logining) {
    return (
      <div style={{ color: "brown", fontSize: "50px", textAlign: "center" }}>
        Login in progress. Wait...
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSignIn}>
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
          Войти
        </button>
        <h3>
          Нет аккаунта?
          <Link to="/register">Зарегистрироваться</Link>
        </h3>
      </form>
    </div>
  );
};

export default SignIn;
