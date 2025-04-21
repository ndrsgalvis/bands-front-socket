import { useContext, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { SocketContext } from "../context/SocketContext";

const BandChard = () => {
  const chartRef = useRef(null);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      createCharts(bands);
    });
  }, [socket]);

  const createCharts = (bands = []) => {
    const ctx = document.getElementById("myCharts");

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            axis: "y",
            label: "My First Dataset",
            data: bands.map((band) => band.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: "y",
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  };

  // useEffect(() => {

  //   // Cleanup function to destroy chart on unmount
  //   return () => {
  //     if (chartRef.current) {
  //       chartRef.current.destroy();
  //     }
  //   };
  // }, []);

  return <canvas id="myCharts"></canvas>;
};

export default BandChard;
