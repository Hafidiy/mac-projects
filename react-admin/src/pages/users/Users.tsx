import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";

import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);

  useEffect(() => {
    effect();
  }, [page]);

  const effect = async () => {
    try {
      const { data }: any = await axios.get(`users?page=${page}`);

      setUsers(data.data);
      setLastPage(data.meta.last_page);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`users/${id}`);

        setUsers(users.filter((e) => e.id !== id));
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/users/create" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>
                  {e.first_name} {e.last_name}
                </td>
                <td>{e.email}</td>
                <td>{e.role.name}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/users/${e.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      onClick={() => onDelete(e.id)}
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

      <Paginator page={page} lastPage={lastPage} setPage={setPage} />
    </Wrapper>
  );
};

export default Users;
