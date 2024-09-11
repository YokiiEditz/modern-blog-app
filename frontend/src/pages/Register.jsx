import { useState } from "react";
import { API_URL } from "../context/BlogContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerForm = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      alert("Enter Details to Register");
      return null;
    }

    if (username !== "" || password !== "") {
      const response = await fetch(API_URL + "/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      // console.log("res", response);

      if (response.status === 201) {
        alert("Registration completed!");
        setUsername("");
        setPassword("");
        navigate("/login");
      } else {
        alert("Username already exists! Try new username");
      }
    } else {
      alert("Enter Details!");
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={registerForm}>
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

        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
