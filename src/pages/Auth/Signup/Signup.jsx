import "./Signup.css";
import authImage from "../../../assets/AuthImage.png";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setSignupDetails({
      ...signupDetails,
      [e.target.id]: e.target.value.trim(),
    });
  };

  return (
    <div className="signupPage">
      <div className="imageSection">
        <img src={authImage} alt="authPageImage" />
      </div>

      <div className="signupSection">
        <div className="redirectButtons">
          <div className="buttons signup">
            <button disabled={true}>SignUp</button>
          </div>

          <div className="buttons login">
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>

        <div className="heading">Join us Today!</div>

        <form className="signupForm" action="">
        
          <div className="signupInputBoxes">

          <div className="nameInput">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={signupDetails.email}
                onChange={handleChange}
              />
            </div>

            <div className="emailInput">
              <input
                type="email"
                id="email"
                placeholder="Email Id"
                value={signupDetails.email}
                onChange={handleChange}
              />
            </div>

            <div className="mobileInput">
              <input
                type="number"
                id="mobile"
                placeholder="Mobile"
                value={signupDetails.email}
                onChange={handleChange}
              />
            </div>

            <div className="passwordInput">
              <input
                type="password"
                placeholder="Password"
                value={signupDetails.password}
                onChange={handleChange}
              />
            </div>

            <div className="confirmPasswordInput">
              <input
                type="password"
                placeholder="Confirm Password"
                value={signupDetails.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          

          <div className="signupRegister">
            <button>Register</button>
          </div>
        </form>

        <div className="toLogin">
          <p>Already have an account? </p>
          <NavLink to="/login" className="aTag">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Signup;
