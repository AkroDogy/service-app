import Google from "./img/google.png";
import "./login.css";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">GAB AUTO GARAGE</h1>
      <div className="wrapper">
        <div className="in_box">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <hr className="hrStyle" />
          <input className="hrStyle_2" type="text" placeholder="Username" disabled />
          <input type="text" placeholder="Password" disabled />
          <button className="submit">Login (Login/Signup-ul nu functioneaza momentan, doar google auth)</button>
          <a href="/register" className="bottom_login">
            New here? Create an account
          </a>
          <a href="/forgot" className="bottom_login">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
