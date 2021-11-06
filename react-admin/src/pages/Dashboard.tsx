import React, { useEffect } from "react";
import * as c3 from "c3";

import Wrapper from "../components/Wrapper";
import axios from "axios";

const Dashboard = () => {

  useEffect(() => {
    effect();
  }, []);

  const effect = async () => {
    const chart = c3.generate({
        bindto: "#chart",
        data: {
          x: "x",
          columns: [["x"], ["Sales"]],
          types: {
            Sales: "bar",
          },
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              format: "%Y-%m-%d",
            },
          },
        },
      });

    try {
      const { data }: any = await axios.get("chart");

      chart.load({
          columns: [
              ['x', ...data.map((r: any) => r.date)],
              ['Sales', ...data.map((r: any) => r.sum)]
          ]
      })
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <Wrapper>
      <h2>Daiy Sales</h2>

      <div id="chart" />
    </Wrapper>
  );
};

export default Dashboard;
