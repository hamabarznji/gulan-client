import React, { useState } from "react";
import Table from "../customComponents/Table";
import ItemsServiceInstance from "../../../services/ItemService";
import { useQuery, QueryKey } from "@tanstack/react-query";
import AddItem from "./item/AddItem";
import { Chip, Grid } from "@mui/material";
import SizeChip from "../customComponents/SizeChip";
import UpdateItem from "./item/UpdateItem";
import BarcodeGenerator from "./BarcodeGenerator";
const queryKey: QueryKey = ["items"];
const columns = [
  { id: "index", label: "#", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "price", label: "Pruchased Price", align: "center" },
  { id: "selling_price", label: "Selling Price", align: "center" },
  { id: "qty", label: "Quantity", align: "center" },
  { id: "color", label: "Color", align: "center" },
  { id: "size", label: "Size", align: "center" },
  { id: "categoryName", label: "Category", align: "center" },
  { id: "actions", label: "Action", align: "center" },
  { id: "barcode", label: "Barcode", align: "center" },
];

const ItemsTable: React.FC = () => {
  const fetchItems = async () => {
    try {
      const response = await ItemsServiceInstance.getItems();
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
      barcodePrice:item.selling_price,
      price: (
        <Chip
          key={`price-${item.id}`}
          variant="outlined"
          color="default"
          label={`$${item.price} `}
        />
      ),

      sellingPrice: (
        <Chip
          key={`sellingPrice-${item.id}`}
          variant="outlined"
          color="secondary"
          label={`$${item.sellingPrice} `}
        />
      ),
      code: item.itemCode,
      color: item.itemColor,
      size: <SizeChip label={item.itemSize} />,
      categoryName: item.categoryName,

      actions: (
        <>
          <UpdateItem item={item} reFetchItems={refetch} />
        </>
      ),
      barcode: <BarcodeGenerator price={item.selling_price} id={item.itemId} />,
    };
  })
  return (
    <>
      <Grid container justifyContent="flex-start" spacing={2} direction="row">
        <Grid item container justifyContent="flex-start">
          <AddItem reFetchItems={refetch} />
        </Grid>

        <Grid item container direction="row" justifyContent="center">
          <Table rows={rows || []} columns={columns} />{" "}
        </Grid>
      </Grid>
    </>
  );
};

export default ItemsTable;
