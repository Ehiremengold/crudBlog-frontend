import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const creationDetails = new FormData(e.currentTarget);
    const creationObj = Object.fromEntries(creationDetails);

    // SUCCESSFUL DISPATCH

    //  ROUTE  TO LOGIN PAGE
  };

  return (
    <section>
      <div className="form-border">
        <h2>Create Account</h2>
        <p>Welcome blogger, Create an account and start writing stuff!</p>
        <form className="form-class" onSubmit={handleCreateAccount}>
          <div className="form-row">
            <label htmlFor="Email">Email</label>
            <input type="email" placeholder="you@email.com" name="email" />
          </div>
          <div className="form-row">
            <label htmlFor="Email">Username</label>
            <input type="email" placeholder="e.g John Doe" name="username" />
          </div>
          <div className="form-row">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
            />
          </div>
          <div className="form-row">
            <label htmlFor="Password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              name="confirm_password"
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
        <p className="join-blog">
          Already on this platform? <Link href="/login">Sign in!</Link>
        </p>
      </div>
    </section>
  );
};
export default CreateAccount;
