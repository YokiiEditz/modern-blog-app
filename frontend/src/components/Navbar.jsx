import { NavLink } from "react-router-dom";
import { API_URL, useBlogs } from "../context/BlogContext";

const Navbar = () => {
  const { userInfo, setUserInfo } = useBlogs();

  const username = userInfo?.username;

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline",
      textTransform: isActive ? "uppercase" : "none",
    };
  };

  const handleLogout = () => {
    console.log("Logout clicked!");

    fetch(API_URL + "/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  return (
    <div className="navbar">
      <NavLink style={navLinkStyles} to="/">
        Home
      </NavLink>

      {username ? (
        <div className="navLinks">
          <NavLink style={navLinkStyles} to="/newpost">
            Create Post
          </NavLink>
          {/* <button href="/logout" onClick={handleLogout}>
            Logout
          </button> */}
          <a onClick={handleLogout}>
            Logout
            <span>{username && `(${username})`}</span>
          </a>
        </div>
      ) : (
        <div className="navLinks">
          <NavLink style={navLinkStyles} to="/login">
            Login
          </NavLink>
          <NavLink style={navLinkStyles} to="/register">
            Register
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
