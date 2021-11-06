import axios from "axios";
import React, { useEffect, useState } from "react";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { Order } from "../../models/order";

const hide = {
  maxHeight: 0,
  transition: "500ms ease-in",
};

const show = {
  maxHeight: "150px",
  transition: "500ms ease-out",
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    effect();
  }, [page]);

  const effect = async () => {
    try {
      const { data }: any = await axios.get(`orders?page=${page}`);

      setOrders(data.data);
      setLastPage(data.meta.last_page);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onSelect = (id: number) => {
    setSelected(selected === id ? 0 : id);
  };

  const onExport = async () => {
    try {
      const { data }: any = axios.post("export", {}, { responseType: "blob" });

      const blob = new Blob([data], {type: 'text/csv'});
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'orders.csv';
      link.click();

      console.log("data: ", data);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <Wrapper>
      {/* <div className="pt-3 pb-2 mb-3 border-bottom">
        <a
          onClick={onExport}
          href="#"
          className="btn btn-sm btn-outline-secondary"
        >
          Export
        </a>
      </div> */}

      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <>
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.name}</td>
                  <td>{o.email}</td>
                  <td>{o.total}</td>
                  <td>
                    <a
                      href="#"
                      onClick={() => onSelect(o.id)}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5}>
                    <div
                      className="overflow-hidden"
                      style={selected === o.id ? show : hide}
                    >
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {o.order_items.map((i) => (
                            <tr>
                              <td>{i.id}</td>
                              <td>{i.product_title}</td>
                              <td>{i.quantity}</td>
                              <td>{i.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <Paginator page={page} lastPage={lastPage} setPage={setPage} />
    </Wrapper>
  );
};

export default Orders;
