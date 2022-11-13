import Input from "./Reusable/Input";
import Button from "./Reusable/Button";
import "./Styles/global.css";
import Title from "./Reusable/Title";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useForm from "./useForm";

export default function Register() {
  const initialState = { username: "", email: "", password: "" };
  const validations = [
    ({ username }) =>
      isRequired(username) || { username: "Username is required" },
    ({ email }) => checkEmail(email) || { email: "E-mail is not valid" },
    ({ email }) => isRequired(email) || { email: "E-mail is required" },
    ({ password }) =>
      checkPassword(password) || { password: "Password must have at least 8 letters" },
    ({ password }) =>
      isRequired(password) || { password: "Password is required" },
  ];
  const { values, isValid, errors, changeHandler, submitHandler, touched } =
    useForm(initialState, validations, registerUser);

  function isRequired(value) {
    return value !== null && value.trim().length > 0;
  }

  function checkEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function checkPassword(value) {
    return value.length > 7;
  }

  const navigate = useNavigate();

  async function registerUser(event) {
    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/login");
    }else{
      alert("There is already account with this email")
    }
  }

  return (
    <div className="container-vertical">
      <Title title={"Create an account"} />
      <form className="form" onSubmit={submitHandler}>
        <Input
          placeholder="Username"
          onChange={changeHandler}
          name="username"
        />
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}
        <Input
          placeholder="Email address"
          onChange={changeHandler}
          name="email"
        />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Input
          placeholder="Password"
          onChange={changeHandler}
          type="password"
          name="password"
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <Button text="Register" className="button-default" />
        <p className="question">
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
