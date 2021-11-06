import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";
import { Redirect } from "react-router";

const UserCreate = () => {
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
      const { data }: any = await axios.get("roles");

      setRoles(data);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
        await axios.post('users', {
            first_name,
            last_name,
            email,
            role_id
        })

        setRedirect(true);
    } catch(err) {
        console.log('err: ', err)
    }
  };

  return redirect ? <Redirect to='/users' /> : (
    <Wrapper>
      <form className="mt-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            required
            className="form-control"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            required
            className="form-control"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            required
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-control"
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.map((r) => (
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

export default UserCreate;
