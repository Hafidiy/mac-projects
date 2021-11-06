import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);

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

  const onDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`roles/${id}`);

        setRoles(roles.filter((e) => e.id !== id));
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/roles/${r.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      onClick={() => onDelete(r.id)}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Roles;
