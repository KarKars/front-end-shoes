import React, { useState, useEffect } from "react";
import axiosClient from "../baseUrl/root";
import "chart.js/auto";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";

const Dashboard = () => {
  //
  const [list, setList] = useState([]);
  const fetchData = async () => {
    const response = await axiosClient.get("/");
    const data = response.data.tasks;

    // sum sales for each day
    const res = Array.from(
      data.reduce((m, { date, price }) => m.set(date, (m.get(date) || 0) + price), new Map()),
      ([date, price]) => ({ date, price })
    );

    setList(res);
    console.log(list);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    aspectRatio: 3,
    // make the monthly review of charts
    // scales: {
    //   x: {
    //     type: "time",
    //     time: { unit: "day" },
    //   },
    // },
  };

  const data = {
    labels: list.map((item) => item.date),
    datasets: [
      {
        label: "sells",
        data: list.map((item) => item.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="App ">
      <Line className="max-w-lg h-1/2" options={options} data={data} />
    </div>
  );
};

export default Dashboard;
