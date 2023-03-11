import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../features/applicationSlice";
import { Link } from "react-router-dom";
import "./styles/signIn.css";
import video from "../assets/videoBG.mp4";

const SignIn = () => {
  const error = useSelector((state) => state.application.error);
  const logining = useSelector((state) => state.application.logining);

  // Состояния
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

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
            <div className="login">
              <form onSubmit={handleSignIn}>
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
                <button disabled={!login || !password} type="submit">
                  LOGIN
                </button>
                <h3>
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </h3>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
