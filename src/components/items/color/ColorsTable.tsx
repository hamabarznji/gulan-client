import React from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";
import ColorService from "../../../../services/ColorService";
import ColorsTable from "../../customComponents/Table";
import { Grid } from "@mui/material";
import UpdateColor from "./UpdateColor";
import AddColor from "./AddColor";


const COLORS_QUERY_KEY: QueryKey = ["colors"];

// Interfaces
interface ExpenseData {
  id: string;
  name: string;
  role: string;
  password: string;
  themeColor: boolean;
}

interface ExpenseResponse {
  data: ExpenseData[];
}

export default function CustomizedTables() {
  const fetchColors = async () => {
    try {
      const response = await ColorService.getColors();
      return response;
    } catch (error) {
      throw new Error("Failed to fetch expenses");
    }
  };

  const { data, refetch } = useQuery(COLORS_QUERY_KEY, fetchColors);
  // Transform rows
  const transformedRows = data?.map((color: any, index: number) => ({
    index: index + 1,
    color: color.color,
    actions: <UpdateColor color={color} reFetchColors={refetch} />,
    
  }));

  // Update inputs

  return (
    <Grid container justifyContent="flex-start" spacing={3} direction="row">
      <Grid item container justifyContent="flex-start">
        <AddColor reFetchColors={refetch} />
      </Grid>

      <Grid item container direction="row" justifyContent="center">
        <ColorsTable rows={transformedRows || []} columns={columns} />
      </Grid>
    </Grid>
  );
}

const columns = [
  { id: "index", label: "#", align: "center" },
  { id: "color", label: "Color", align: "center" },
  { id: "actions", label: "Actions", align: "center" },
];
