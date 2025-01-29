import "./Signup.css";
import authImage from "../../../assets/AuthImage.png";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { signup } from "../../../services/auth";
import PropTypes from "prop-types";

function Signup({showToast}) {
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    name: "",
    mobile: "",
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

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const res = await signup(signupDetails);

        if(res.status === 201) {
            const data = await res.json();
            const successMessage = data.message; 

            setSignupDetails({
                name: "",
                mobile: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            showToast(successMessage);
            navigate("/login");

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
    <div className="signupPage">
      <div className="imageSection">
        <img src={authImage} alt="authPageImage" />
      </div>

      <div className="signupSection">
        <div className="redirectButtons">
          <div className="buttons signup">
            <button>SignUp</button>
          </div>

          <div className="buttons login">
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>

        <div className="heading">Join us Today!</div>

        <form className="signupForm" onSubmit={handleSubmit}>
        
          <div className="signupInputBoxes">

          <div className="nameInput">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={signupDetails.name}
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
                type="text"
                id="mobile"
                placeholder="Mobile"
                value={signupDetails.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="passwordInput">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={signupDetails.password}
                onChange={handleChange}
              />
            </div>

            <div className="confirmPasswordInput">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={signupDetails.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          

          <div className="signupRegister">
            <button type="submit">Register</button>
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

Signup.propTypes = {
    showToast : PropTypes.func,
}
