import Input from "./Reusable/Input";
import Button from "./Reusable/Button";
import "./Styles/global.css";
import { useState } from "react";
import AuthContext from "./Contexts/AuthContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Title from "./Reusable/Title";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    console.log("tak")

    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
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
      alert("Please check your email and password");
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={loginUser}>
        <Title title="Hello again!" />
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button text="Login" className="button-default" />
        <p className="question">Don't have an account?<Link to="/register"> Sign up</Link></p>
      </form>
    </div>
  );
}
