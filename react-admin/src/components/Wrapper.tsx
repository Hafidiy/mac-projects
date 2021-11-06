import React, { Component, Dispatch, useEffect, useState } from "react";

import axios from "axios";

import Nav from "./Nav";
import Menu from "./Menu";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { User } from "../models/user";
import { setUser } from "../store/actions/setUserAction";

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser),
});

const Wrapper = ({ children, setUser }: any) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    effect();
  }, []);

  const effect = async () => {
    try {
      const { data }: any = await axios.get("user");

      const user = new User(
        data.id,
        data.first_name,
        data.last_name,
        data.email,
        data.role
      );

      console.log("user: ", user);

      setUser({...user});
    } catch (err: any) {
      console.log("err: ", err);
      // console.log("err: ", err.toJSON());
      // if (err.toJSON().status) {
      //   setRedirect(true);
      // } else {
      // }
    }
  };

  return redirect ? (
    <Redirect to="/login" />
  ) : (
    <>
      <Nav />

      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Wrapper);
