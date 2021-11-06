import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";

const Profile = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    effect();
  }, []);

  const effect = async () => {
    try {
      const { data }: any = await axios.get("user");

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onInfoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
        await axios.put('users/info', {
            first_name,
            last_name,
            email
        })
    } catch(err) {
        console.log('err: ', err)
    }
  };

  const onPasswordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
        await axios.put('users/password', {
            password,
            password_confirm
        })
    } catch(err) {
        console.log('err: ', err)
    }
  };

  return (
    <Wrapper>
      <h3>Account Information</h3>
      <form onSubmit={onInfoSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            value={first_name}
            className="form-control"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            value={last_name}
            className="form-control"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={onPasswordSubmit}>
        <div className="mb-3">
          <label>Password</label>
          <input
            value={password}
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password Confirm</label>
          <input
            type="password"
            className="form-control"
            value={password_confirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default Profile;
