import React from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";
import SizeService from "../../../../services/SizeService";
import SizesTable from "../../customComponents/Table";
import { Grid } from "@mui/material";
import UpdateSize from "./UpdateSize";
import AddSize from "./AddSize";

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
  const fetchSizes = async () => {
    try {
      const response = await SizeService.getSizes();
      return response;
    } catch (error) {
      throw new Error("Failed to fetch sizes");
    }
  };

  const { data, refetch } = useQuery(COLORS_QUERY_KEY, fetchSizes);
  // Transform rows
  const transformedRows = data?.map((size: any, index: number) => ({
    index: index + 1,
    size: size.size,
    actions: <UpdateSize size={size} reFetchSizes={refetch} />,
  }));


  return (
    <Grid container justifyContent="flex-start" spacing={3} direction="row">
      <Grid item container justifyContent="flex-start">
        <AddSize reFetchSizes={refetch} />
      </Grid>

      <Grid item container direction="row" justifyContent="center">
        <SizesTable rows={transformedRows || []} columns={columns} />
      </Grid>
    </Grid>
  );
}

const columns = [
  { id: "index", label: "#", align: "center" },
  { id: "size", label: "Color", align: "center" },
  { id: "actions", label: "Actions", align: "center" },
];
