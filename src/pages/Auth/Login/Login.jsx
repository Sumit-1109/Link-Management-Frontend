import "./Login.css";
import authImage from "../../../assets/AuthImage.png";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../../services/auth";
import PropTypes from "prop-types";
import cuvetteLogo from "../../../assets/cuvetteLogo.svg";

function Login({showToast}) {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.id]: e.target.value.trim(),
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const res = await login(loginDetails);
        const data = await res.json();

        if (res.status === 200){

            const {message, token} = data;

            localStorage.setItem("token", token);

            setLoginDetails({
                email: "",
                password: "",
            });

            showToast(message);
            navigate("/home");
        } else if (res.status === 400 || res.status === 401) {
            
            const errorMessage = data.message;

            setError(errorMessage);
        } else {
          showToast(data.message);
        }
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div className="loginPage">
      <div className="imageSection">
        <img className="imageSection-image" src={authImage} alt="authPageImage" />

        <div className="imageSection-Logo">
          <img src={cuvetteLogo} alt="" />
        </div>
      </div>

      <div className="loginSection">
        <div className="redirectButtons">

        <div className="imageSection-Logo-mobileMode">
          <img src={cuvetteLogo} alt="cuvetteLogo" />
        </div>

          <div className="buttons signup">
            <button onClick={() => navigate("/signup")}>SignUp</button>
          </div>

          <div className="buttons login">
            <button>Login</button>
          </div>
        </div>

        <div className="heading">Login</div>

        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginInputBoxes">
            <div className={`${error === '' ? 'emailInput' : 'loginError' }`}>
              <input
                type="email"
                id="email"
                placeholder="Email id"
                value={loginDetails.email}
                onChange={handleChange}
              />
            </div>

            <div className={`${error === '' ? 'passwordInput' : 'loginError' }`}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={loginDetails.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="loginPageErrorContainer">
            <p className="login-error">{error}</p>
          </div>

          <div className="loginRegister">
            <button>Register</button>
          </div>
        </form>

        <div className="toSignup">
          <p>Don’t have an account? </p>
          <NavLink to="/signup" className="aTag">
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;

Login.propTypes = {
    showToast: PropTypes.func,
}