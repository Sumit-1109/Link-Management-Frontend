import "./Login.css";
import authImage from "../../../assets/AuthImage.png";

function Login() {
  return (
    <div className="loginPage">
      <div className="imageSection">
        <img src={authImage} alt="authPageImage" />
      </div>

      <div className="loginSection">
        <div className="redirectButtons">
          <div className="buttons signup">
            <button>SignUp</button>
          </div>

          <div className="buttons login">
            <button>Login</button>
          </div>
        </div>

        <div className="heading">Login</div>

        <form action="">
          <div className="inputBoxes">
            <div className="emailInput">
              <input type="text" placeholder="Email id" />
            </div>

            <div className="passwordInput">
              <input type="password" placeholder="Password" />
            </div>
          </div>

          <div className="register">
            <button>Register</button>
          </div>
        </form>

        <div className="toSignup">
          <p>
          Don’t have an account? </p> <a href="#">Signup</a>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
