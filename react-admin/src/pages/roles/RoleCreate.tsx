import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import Wrapper from "../../components/Wrapper";
import { Permission } from "../../models/permission";

const RoleCreate = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    effect();
  }, []);

  const effect = async () => {
    try {
      const { data }: any = await axios.get("permissions");

      setPermissions(data);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onCheck = (id: number) => {
    if (selected.find((e) => e === id)) {
      setSelected(selected.filter((e) => e !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("roles", {
        name,
        permissions: selected,
      });

      setRedirect(true);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return redirect ? (
    <Redirect to="/roles" />
  ) : (
    <Wrapper>
      <form className="mt-3" onSubmit={onSubmit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              required
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Permissions</label>
          <div className="col-sm-10">
            {permissions.map((p) => (
              <div className="form-check form-check-inline col-3" key={p.id}>
                <input
                  value={p.id}
                  type="checkbox"
                  className="form-check-input"
                  onChange={() => onCheck(p.id)}
                />
                <label className="form-check-label">{p.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default RoleCreate;
