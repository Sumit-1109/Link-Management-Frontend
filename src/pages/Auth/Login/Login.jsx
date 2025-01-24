import "./Login.css";
import authImage from "../../../assets/AuthImage.png";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../../services/auth";
import PropTypes from "prop-types";

function Login({showToast}) {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const res = await login(loginDetails);

        if (res.status === 200){

            const data = await res.json();
            const {message, token} = data;

            localStorage.setItem("token", token);

            setLoginDetails({
                email: "",
                password: "",
            });

            showToast(message);
            navigate("/dashboard");
        } else {
            const data = await res.json();
            const errorMessage = data.message;

            showToast(errorMessage);
        }
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div className="loginPage">
      <div className="imageSection">
        <img src={authImage} alt="authPageImage" />
      </div>

      <div className="loginSection">
        <div className="redirectButtons">
          <div className="buttons signup">
            <button onClick={() => navigate("/signup")}>SignUp</button>
          </div>

          <div className="buttons login">
            <button disabled="true">Login</button>
          </div>
        </div>

        <div className="heading">Login</div>

        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginInputBoxes">
            <div className="emailInput">
              <input
                type="text"
                id="email"
                placeholder="Email id"
                value={loginDetails.email}
                onChange={handleChange}
              />
            </div>

            <div className="passwordInput">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={loginDetails.password}
                onChange={handleChange}
              />
            </div>
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