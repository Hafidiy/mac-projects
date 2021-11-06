import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { Redirect } from "react-router";

import "../Login.css";

class Register extends Component {
  first_name = "";
  last_name = "";
  email = "";
  password = "";
  password_confirm = "";

  state = {
    redirect: false,
  };

  onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const result = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm,
    };

    try {
      await axios.post("register", result);

      this.setState({ redirect: true });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <main className="form-signin">
        <form onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <input
            required
            className="form-control"
            placeholder="First Name"
            onChange={(e) => (this.first_name = e.target.value)}
          />

          <input
            required
            className="form-control"
            placeholder="Last Name"
            onChange={(e) => (this.last_name = e.target.value)}
          />

          <input
            required
            type="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={(e) => (this.email = e.target.value)}
          />

          <input
            required
            type="password"
            placeholder="Password"
            className="form-control"
            onChange={(e) => (this.password = e.target.value)}
          />

          <input
            required
            type="password"
            placeholder="Password Confirm"
            className="form-control"
            onChange={(e) => (this.password_confirm = e.target.value)}
          />

          <button type="submit" className="w-100 btn btn-lg btn-primary">
            Submit
          </button>
        </form>
      </main>
    );
  }
}

export default Register;
