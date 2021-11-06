import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("login", {
        email,
        password,
      });

      setRedirect(true);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <main className="form-signin">
      <form onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <input
          required
          type="email"
          className="form-control"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="w-100 btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Login;
