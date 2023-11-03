import React, { useEffect, useState } from "react";
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
import ExpenseServiceInstance from "../../../services/ExpenseService";

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
  const [chartData, setChartData] = useState(null);
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await ExpenseServiceInstance.getTopExpenses();

        setChartData(res.data.slice(0, 3).map((item: any) => item.sum));
        setLabels(res.labels.slice(0, 3));
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchChartData();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Top Three Expenses",
        data: chartData,
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
          formatter: (value:any) => {
            return (
              value +
              " (" +
              Math.round(
                // @ts-ignore
                (value / data?.datasets[0]?.data?.reduce((a:any, b:any) => a + b, 0)) * 100
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
     {/* @ts-ignore */}
      <Doughnut {...config} />
    </div>
  );
};

export default PieChartPage;
