import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { signup, signIn } from "./firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
      alert("user signed up");
    } catch (e) {
      alert(`error: ${e.message}`);
    }
  };
  const logIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(email, password);
      if (response?.user) {
        console.log("response", response?.user);
        navigate("/");
      }
    } catch (e) {
      alert(`error: ${e.message}`);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login_table">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={logIn} className="login_Signin">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login-registration">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
