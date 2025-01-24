import "./Login.css";
import authImage from "../../../assets/AuthImage.png";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Login() {
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

        <form className="loginForm" action="">
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
                value={loginDetails.email}
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
