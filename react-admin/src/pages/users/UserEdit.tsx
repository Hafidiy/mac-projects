import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";
import { Redirect } from "react-router";

const UserEdit = ({
  match: {
    params: { id: userId },
  },
}: any) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRoleId] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    effect();
  }, []);

  const effect = async () => {
    try {
      const { data: dataUser }: any = await axios.get(`users/${userId}`);
      const { data: dataRoles }: any = await axios.get("roles");

      setFirstName(dataUser.first_name);
      setLastName(dataUser.last_name);
      setEmail(dataUser.email);
      setRoleId(dataUser.role.id);
      setRoles(dataRoles);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.put(`users/${userId}`, {
        first_name,
        last_name,
        email,
        role_id,
      });

      setRedirect(true);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return redirect ? (
    <Redirect to="/users" />
  ) : (
    <Wrapper>
      <form className="mt-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            required
            value={first_name}
            className="form-control"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            required
            value={last_name}
            className="form-control"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            required
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select
            value={role_id}
            className="form-control"
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.length &&
              roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
          </select>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default UserEdit;
