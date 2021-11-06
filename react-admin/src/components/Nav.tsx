import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "../models/user";

const mapStateToProps = ({ user }: { user: User }) => ({
  user,
});

const Nav = ({ user }: any) => {
  console.log('user: ', user)

  const onLogout = async () => {
    try {
      await axios.post("logout", {});
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Company name</a>

      <ul className="my-2 my-md-0 mr-md-3">
        <Link to="/profile" className="p-2 text-white text-decoration-none">
          {user.name}
        </Link>
        <Link
          to="/login"
          onClick={onLogout}
          className="p-2 text-white text-decoration-none"
        >
          Sign out
        </Link>
      </ul>
    </header>
  );
};

export default connect(mapStateToProps, null)(Nav);
