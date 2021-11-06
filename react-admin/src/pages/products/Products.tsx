import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    effect();
  }, [page]);

  const effect = async () => {
    try {
      const { data }: any = await axios.get(`products?page=${page}`);

      setProducts(data.data);
      setLastPage(data.meta.last_page);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`products/${id}`);

        setProducts(products.filter((e) => e.id !== id));
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link
          to="/products/create"
          className="btn btn-sm btn-outline-secondary"
        >
          Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <div style={{ width: 80, height: 80 }}>
                    <img
                      alt="img"
                      src={p.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/products/${p.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      onClick={() => onDelete(p.id)}
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

export default Products;
