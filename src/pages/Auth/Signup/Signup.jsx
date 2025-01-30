import "./Signup.css";
import authImage from "../../../assets/AuthImage.png";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { signup } from "../../../services/auth";
import PropTypes from "prop-types";
import cuvetteLogo from "../../../assets/cuvetteLogo.svg";

function Signup({showToast}) {
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {

      setSignupDetails({
        ...signupDetails,
        [e.target.id]: e.target.value,
      });

    setError('');
    setIsError(false);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const res = await signup(signupDetails);
        const data = await res.json();
            

        if(res.status === 201) {
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

        } else if(res.status === 400) {
          const errorMessage = data.message;
            setError(errorMessage);
        } else if (res.status === 401) {
          setIsError(true);
          setError(data.message);
        } else {
          showToast(data.message)
        }
    } catch (err) {
        console.log(err);
    }

  }

  return (
    <div className="signupPage">
      <div className="imageSection">
        <img className="imageSection-image" src={authImage} alt="authPageImage" />

        <div className="imageSection-Logo">
                  <img src={cuvetteLogo} alt="" />
                </div>
      </div>

      <div className="signupSection">
        <div className="redirectButtons">

          <div className="imageSection-Logo-mobileMode">
                    <img src={cuvetteLogo} alt="cuvetteLogo" />
          </div>

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

          <div className="nameInput errorFreeDiv">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={signupDetails.name}
                onChange={handleChange}
              />
            </div>

            <div className="emailInput errorFreeDiv">
              <input
                type="email"
                id="email"
                placeholder="Email Id"
                value={signupDetails.email}
                onChange={handleChange}
              />
            </div>

            <div className="mobileInput errorFreeDiv">
              <input
                type="text"
                id="mobile"
                placeholder="Mobile"
                value={signupDetails.mobile}
                onChange={handleChange}
              />
            </div>

            <div className={`passwordInput ${isError ? "passwordMismatchError" : 'errorFreeDiv'}`}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={signupDetails.password}
                onChange={handleChange}
              />
            </div>

            <div className={`passwordInput ${isError ? "passwordMismatchError" : 'errorFreeDiv'}`}>
              <input
                className={isError ? "passwordMismatchError" : ''}
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={signupDetails.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="errorContainer">
            <p className="signUp-error">{error}</p>
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
