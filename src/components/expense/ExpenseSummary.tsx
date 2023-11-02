import React, { } from "react";
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
import { useQuery, QueryKey } from "@tanstack/react-query";

const EXPENSES_QUERY_KEY: QueryKey = ["expensesSummary"];

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

const ExpenseSummary = () => {

  const fetchChartData = async () => {
    try {
      const res = await ExpenseServiceInstance.getExpensesSummary();
      const resLabels = res.map((exp: any) => exp.categoryName);
      const dataSum = res.map((exp: any) => exp.sum);

      return [resLabels, dataSum];
    } catch (err) {
      console.error("Error fetching chart data:", err);
    }
  };
  const { data: expenseSummary } = useQuery(EXPENSES_QUERY_KEY, fetchChartData);

  const data = {
    labels:expenseSummary? expenseSummary[0]:[],
    datasets: [
      {
        label: "Top Three Expenses",
        data: expenseSummary ? expenseSummary[1] : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
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
                (value / data.datasets[0].data.reduce((a:any, b:any) => a + b, 0)) * 100
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

export default ExpenseSummary;
