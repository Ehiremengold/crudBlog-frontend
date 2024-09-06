import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import {
  login,
  setIsError,
} from "../../features/authentication/login/loginSlice";
import { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isAuthenticated, errorMsg, isError } = useSelector(
    (store) => store.login
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginDetails = new FormData(e.currentTarget);
    const loginObj = Object.fromEntries(loginDetails);
    dispatch(login(loginObj));
  };

  const handleIsError = () => {
    if (isError) {
      dispatch(setIsError());
    }
  };

  return (
    <section>
      <div className="form-border">
        <h2>Login</h2>
        <p>
          Welcome back! Please enter your email and password and start writing
          stuff
        </p>
        <form className="form-class" onSubmit={handleLogin}>
          <div className="form-row">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              onChange={() => handleIsError()}
              name="email"
            />
          </div>

          <div className="form-row">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={() => handleIsError()}
            />
          </div>
          <h6 className="msg">{isError && errorMsg}</h6>
          <button type="submit">
            {isLoading ? <LoadingSpinner /> : "Login"}
          </button>
        </form>
        <p className="join-blog">
          New to this platform? <Link to="/auth/register">Create an Account</Link>
        </p>
      </div>
    </section>
  );
};
export default Login;
