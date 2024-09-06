import "./Footer.css";
import logo from "../../assets/logo/write.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="logo">
          <img src={logo} alt="" />
          <h3>Blog</h3>
        </div>
        <div className="actions">
          <ul>
            <Link className="action-item">About</Link>
            <Link className="action-item">Contact</Link>
            <Link className="action-item">Privacy</Link>
            <Link className="action-item">Terms</Link>
          </ul>
        </div>
        <div className="reservation">
          <p>&copy; 2024 Blog. All rights reserved </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
