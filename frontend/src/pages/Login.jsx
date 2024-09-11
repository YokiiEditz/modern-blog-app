import { useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL, useBlogs } from "../context/BlogContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUserInfo, dataChanged, setDataChanged, handleFetchData } =
    useBlogs();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      alert("Enter Details! to login");
      return null;
    }

    if (username !== "" || password !== "") {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response) {
        return null;
      }

      if (response.ok) {
        response.json().then((userInfo) => {
          // console.log("Userinfo from  LOGIN", userInfo.id);
          sessionStorage.setItem("jwt", userInfo.id); // Assuming userInfo.token contains the JWT

          setUserInfo(userInfo);
          setRedirect(true);
          setUsername("");
          setPassword("");
          handleFetchData();
          setDataChanged(!dataChanged);

          const token = localStorage.getItem("jwt");
          // console.log("token from localitem", token);
        });
      } else {
        alert("Failed! Wrong Credentials");
      }
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="user-name">username</label>
          <input
            type="text"
            id="user-name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="pass-word">password</label>
          <input
            type="password"
            id="pass-word"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;

// import { useState } from "react";
// import { useAuth } from "../context/Auth";
// import { useLocation, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [user, setUser] = useState("");

//   const auth = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   console.log("login loc", location);

//   const redirectPath = location.state?.path || "/";

//   const handleLogin = () => {
//     auth.login(user);
//     // console.log(user);
//     navigate(redirectPath, { replace: true });
//   };

//   return (
//     <>
//       <div>
//         <label htmlFor="">Username:</label>
//         <input
//           type="text"
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//         />
//         <button onClick={handleLogin}>Login</button>
//       </div>
//     </>
//   );
// };

// export default Login;
