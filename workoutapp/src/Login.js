import Input from "./Reusable/Input";
import Button from "./Reusable/Button";
import "./Styles/global.css";
import { useState } from "react";
import AuthContext from "./Contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      localStorage.setItem("userID", data.userID);

      setAuth(true);
      alert("Login successful");
      navigate('/');
    } else {
      alert("Please check your username and password");
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={loginUser}>
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Login" className="button-default" />
      </form>
    </div>
  );
}
