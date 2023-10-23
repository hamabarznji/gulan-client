import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";
import AddInvoiceModal from "./AddInvoiceModal";
import Header from "./Header";
import useBarcodeScanner from "../../../../hook/useBarcodeScanner";
import DeleteIcon from "@mui/icons-material/Delete";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import TextField from "../../../customComponents/TextField";
import Button from "../../../customComponents/Button"; // Make sure this import is correct
import ItemsServiceInstance from "../../../../../services/ItemService";
import { useQuery, QueryKey } from "@tanstack/react-query";
import columns from "./columns";
import * as yup from "yup";
import { title } from "process";
const DeleteButton = ({ onClick }) => (
  <Button
    variant="contained"
    color="error"
    style={{ justifyContent: "center", alignItems: "center" }}
    onClick={onClick}
  >
    <DeleteIcon style={{ justifyContent: "center", alignItems: "center" }} />
  </Button>
);
const schema = yup.object().shape({
  rows: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      // price: yup.number().required('Price is required for every rows'),
      // qty: yup.number().required('QTY is required for every rows'),
      price: yup.number(),
      qty: yup.number(),
  
    })
  ),
});
const currentDate = moment().format("DD/MM/YYYY");

const CustomeTable: React.FC<{
  rows: any[];
  onAddItem: (data: any) => void;
  onSumitInvoice: (data: any) => void;
  itemsLength: number;
}> = () => {
  const scannedItem = useBarcodeScanner();


  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [newRows, setNewRows] = useState([]);

  const submitHandler = (data: any) => {
    const { rows } = data;
    console.log(rows);
  };
console.log(errors)
  useEffect(() => {
    if (scannedItem) {
      const newRow = {
        index: newRows.length + 1,
        item_id: scannedItem[0]?.itemId,
        name: (
          <Grid item xs={12} key={scannedItem[0]?.itemId}>
            <Controller
              defaultValue={scannedItem[0]?.itemName}
              name={`rows[${newRows.length + 1}].input1`}
              control={control}
              rules={{ validate: (value) => schema.isValidSync(value) }}
              render={({ field: inputField }) => {
                let CommonProps = {
                  ...inputField,
                  label: "Name",
                  //  error: !!errors[field.name],
                  //  helperText: errors[field.name]?.message?.toString(),
                };

                return (
                  <TextField
                    {...CommonProps}
                    type={"string"}
                    fullWidth
                    disabled={true}
                  />
                );
              }}
            />
          </Grid>
        ),
        price: (
          <Grid item xs={12} key={scannedItem[0]?.itemId}>
            <Controller
              name={`rows[${newRows.length + 1}].input2`}
              control={control}
              rules={{ validate: (value) => schema.isValidSync(value) }}
              render={({ field: inputField }) => {
                let CommonProps = {
                  ...inputField,
                  label: "Price",
                  //  error: !!errors[field.name],
                  //  helperText: errors[field.name]?.message?.toString(),
                  //defaultValue:defaultValue,
                };

                return <TextField {...CommonProps} type={"number"} fullWidth
                
                
                />;
              }}
            />
          </Grid>
        ),

        qty: (
          <Grid item xs={12} key={scannedItem[0]?.itemId}>
            <Controller
              name={`rows[${newRows.length + 1}].input3`}
              control={control}
              rules={{ validate: (value) => schema.isValidSync(value) }}
              render={({ field: inputField }) => {
                let CommonProps = {
                  ...inputField,
                  label: "Qty",
                  //  error: !!errors[field.name],
                  //  helperText: errors[field.name]?.message?.toString(),
                  //defaultValue:defaultValue,
                };

                return <TextField {...CommonProps} type={"number"} fullWidth />;
              }}
            />
          </Grid>
        ),

        actions: (
          <Button
          title="Delete"

            onClick={() => {
              setNewRows(newRows.filter((item) => item.index !== newRow.index));
            }}
          />
        ),
      };

      setNewRows((prevRows) => [...prevRows, newRow]);
    }
  }, [scannedItem]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "16px",
        boxSizing: "border-box",
        display: "contents",
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Header id={"truncatedUuid"} date={currentDate} />
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 200px)",
            "@media (max-width: 600px)": {
              maxHeight: "calc(100vh - 300px)",
            },
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#d3d3d3",
                color: "#ff7f50",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "& th": {
                  color: "black",
                  fontWeight: "bold",
                },
              }}
            >
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ fontSize: "1rem", padding: "20px" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {newRows?.map((row, index) => (
                <TableRow hover tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center">
                      {row[column?.name]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {newRows.length > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{
                      fontSize: "1rem",
                      padding: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <Button type="submit" title="ADD" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </form>
  );
};

export default CustomeTable;
