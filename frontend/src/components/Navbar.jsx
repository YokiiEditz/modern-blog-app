import { NavLink } from "react-router-dom";
import { API_URL, useBlogs } from "../context/BlogContext";
import Container from "react-bootstrap/Container";

import { Navbar as Navs } from "react-bootstrap";

const Navbar = () => {
  const { userInfo, setUserInfo } = useBlogs();

  const username = userInfo?.username;

  const handleLogout = () => {
    console.log("Logout clicked!");

    fetch(API_URL + "/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  return (
    <div>
      <header className="fs-5">
        <Navs bg="dark" data-bs-theme="dark">
          <Container className="navbar px-3">
            <NavLink to="/" className="text-white">
              <span style={{ fontWeight: "bold" }}>Blogify</span>
            </NavLink>

            {username ? (
              <div className="navLinks">
                <NavLink to="/newpost" className="text-white ">
                  Create Post
                </NavLink>

                <NavLink
                  onClick={handleLogout}
                  className="text-white text-decoration-none"
                >
                  <span>
                    Logout
                    <span
                      className="p-1 text-secondary-emphasis"
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {username && `(${username})`}
                    </span>
                  </span>
                </NavLink>
              </div>
            ) : (
              <div className="navLinks">
                <NavLink to="/login" className="text-white ">
                  Login
                </NavLink>
                <NavLink to="/register" className="text-white ">
                  Register
                </NavLink>
              </div>
            )}
          </Container>
        </Navs>
      </header>
    </div>
  );
};

export default Navbar;
