import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/write.png";
import "./Header.css";
import {
  userIcon,
  logoutIcon,
  menuIcon,
  closeMenuIcon,
} from "../../assets/icons/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authentication/login/loginSlice";
import { persistor } from "../../store";
import { getSearchedPosts } from "../../features/search/searchSlice";

const Header = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const location = useLocation();

  const { username, isAuthenticated } = useSelector((store) => store.login);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setToggleNav(false);
  }, [location]);

  const handleLogout = async () => {
    console.log("Logging out...");
    dispatch(logout());
    try {
      await persistor.purge();
      console.log("Successfully purged storage.");
      navigate("/auth/login");
    } catch (error) {
      console.error("Error during purge:", error);
    }
  };

  const handleSearch = () => {
    dispatch(getSearchedPosts(query));
    const searchUrl = `/posts/search/?q=${encodeURIComponent(query)}`;
    navigate(searchUrl);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setToggleNav(!toggleNav);
  };

  return (
    <header>
      <div className="header-wrapper">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="" />
            <h2>Blog</h2>
          </div>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <img src={menuIcon} alt="" />
        </button>

        <nav className={`${toggleNav ? "show" : ""}`}>
          <img
            src={closeMenuIcon}
            className="menu-toggle-close"
            alt=""
            onClick={toggleMenu}
          />
          <ul className="nav-items">
            <Link className="nav-item" to={"/all/posts"}>
              <p>Posts</p>
            </Link>
            <Link className="nav-item">
              <p>Bookmarks</p>
            </Link>
          </ul>

          <input
            placeholder="Search"
            className="nav-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {isAuthenticated ? (
            <div className="authenticated">
              <a href="/create/post">
                <button className="create">Write Post</button>
              </a>
              <div className="profile">
                <img className="" src={userIcon} alt="" />
                <div className="menu-actions">
                  <p>Profile</p>
                  <hr />
                  <p onClick={handleLogout} className="logout-action">
                    Logout
                  </p>
                  <hr />
                  <p>Version 1.0</p>
                </div>
              </div>
            </div>
          ) : location.pathname === "/auth/login" ? null : (
            <a href="/auth/login">
              <button className="login">Login</button>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
