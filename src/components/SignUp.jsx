import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../features/applicationSlice";
import { Link, Navigate } from "react-router-dom";
import "./styles/signUp.css";
import video from "../assets/videoBG.mp4";
import SignIn from "./SignIn";

const SignUp = () => {
  const error = useSelector((state) => state.application.error);
  const registrationing = useSelector(
    (state) => state.application.registrationing
  );

  // Состояния
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

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

  const handleLog = () => {
    window.location.href = "/login"
  }

  // При ошибке
  if (error) {
    return <div>{error}</div>;
  }

  // Прелоадер
  if (registrationing) {
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
    <>
      <main>
        <div className="main">
          <video src={video} muted loop autoPlay />
          <div className="content">
            <div className="register">
              <form onSubmit={handleSignUp}>
                <input
                  type="text"
                  value={login}
                  placeholder="Enter your name"
                  onChange={handleSetName}
                />
                <br />
                <input
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={handleSetPass}
                />
                <br />
                <button onClick={() => handleLog()} disabled={!login || !password} type="submit">
                  REGISTER
                </button>
                <h3>
                  Already have an account? <Link to="/login">Sign In</Link>
                </h3>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
