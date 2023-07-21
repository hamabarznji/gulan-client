import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  CategoryScale,
  LinearScale,
  Title,
  Decimation,
} from "chart.js";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  CategoryScale,
  LinearScale,
  Title,
  Decimation
);

const PieChartPage = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [500, 300, 50],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
        datalabels: {
          display: true,
          color: "#fff",
          formatter: (value) => {
            return (
              value +
              " (" +
              Math.round(
                (value / data.datasets[0].data.reduce((a, b) => a + b, 0)) * 100
              ) +
              "%)"
            );
          },
        },
      },
    },
  };

  return (
    <div>
      <Doughnut {...config} />
    </div>
  );
};

export default PieChartPage;
