import React, { useState } from "react";
import Table from "../../customComponents/Table";
import VendorService from "../../../../services/VendorService";
import { useQuery, QueryKey } from "@tanstack/react-query";
import AddVendor from "./AddVendor";
import UpdateVendor from "./UpdateVendor";
import { Grid } from "@mui/material";
const queryKey: QueryKey = ["items"];
const columns = [
  { id: "index", label: "#", align: "center" },
  { id: "name", label: "Vendor Name", align: "center" },
  { id: "actions", label: "Actions", align: "center" },
];

const VendorsTable: React.FC = () => {
  const fetchItems = async () => {
    try {
      const response = await VendorService.getVendors();
      return response;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };
  const { data, refetch } = useQuery(queryKey, fetchItems);
  const rows = data?.map((item: any, index: any) => {
    return {
      ...item,
      index: index + 1,
      name: item.name,
      actions: <UpdateVendor vendor={item} reFetchVendors={refetch} />,
    };
  });
  return (
    <>
      <Grid container justifyContent="flex-start" spacing={2} direction="row">
        <Grid item container justifyContent="flex-start">
          <AddVendor reFetchCategories={refetch} />
        </Grid>

        <Grid item container direction="row" justifyContent="center">
          <Table rows={rows || []} columns={columns} />
        </Grid>
      </Grid>
    </>
  );
};

export default VendorsTable;
