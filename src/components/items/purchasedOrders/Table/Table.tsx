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
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import TextField from "../../../customComponents/TextField";
import { Button } from "@mui/material";
import ItemsServiceInstance from "../../../../../services/ItemService";
import { useQuery, QueryKey } from "@tanstack/react-query";
import columns from "./columns";
import * as yup from "yup";
import DeleteButton from "./DeleteBtn";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const CustomeTable: React.FC<{
  rows: any[];
  onAddItem: (data: any) => void;
  onSumitInvoice: (data: any) => void;
  itemsLength: number;
}> = () => {
  const scannedItem = useBarcodeScanner();
  const { enqueueSnackbar } = useSnackbar();
  const router= useRouter()

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [newRows, setNewRows] = useState([]);

  const submitHandler = async ({ rows }: any) => {
    try {
      const newData = rows.map((row) => ({
        item_id: row.input4,
        price: row.input2,
        qty: row.input3,
      }));
  
      const response = await ItemsServiceInstance.addPurchaseOrderInvoice(newData);
  
      if (response.status === 200) {
        enqueueSnackbar("New Purchase Invoice Added Successfully!", {
          variant: "success",
        });
       router.push("/items/orders/purchased")  
       return
      }
  
      enqueueSnackbar("Error: " + response.message, {
        variant: "error",
      });
  
      throw new Error(`Failed to add item: ${response.message}`);
    } catch (error) {
      enqueueSnackbar("Error: " + error.message, {
        variant: "error",
      });
    }
  };
  
  useEffect(() => {
    let index = newRows.length;
    let rowIndex = newRows.length + 1;

    if (scannedItem) {
      const newRow = {
        index: index,
        rowIndex: rowIndex,
        item_id: scannedItem?.id,

        id: (
          <Grid item xs={12} key={scannedItem?.id}>
            <Controller
              defaultValue={scannedItem?.name}
              name={`rows[${index}].input1`}
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
        name: (
          <Grid item xs={12} key={scannedItem?.id}>
            <Controller
              defaultValue={scannedItem?.id}
              name={`rows[${index}].input4`}
              control={control}
              rules={{ validate: (value) => schema.isValidSync(value) }}
              render={({ field: inputField }) => {
                let CommonProps = {
                  ...inputField,
                  label: "Id",
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
          <Grid item xs={12} key={scannedItem?.id}>
            <Controller
              name={`rows[${index}].input2`}
              control={control}
              // rules={{ validate: (value) => schema.isValidSync(value) }}
              render={({ field: inputField }) => {
                let CommonProps = {
                  ...inputField,
                  label: "Price",
                  //  error: !!errors[field.name],
                  //  helperText: errors[field.name]?.message?.toString(),
                  //defaultValue:defaultValue,
                };

                return <TextField {...CommonProps} type={"number"} fullWidth />;
              }}
            />
          </Grid>
        ),

        qty: (
          <Grid item xs={12} key={scannedItem?.id}>
            <Controller
              name={`rows[${index}].input3`}
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
          <DeleteButton
            onClick={() => {
              console.log("Deleting row with index:", newRow.index); // Debug statement
              return;
              newRows.filter((item) => {
                const i = item.index;
                const x = newRow.index;
                console.log(item.item_id, newRow.item_id);
              });
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
        <Header id={"truncatedUuid"} date={moment().format("DD/MM/YYYY")} />
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
                    <Button type="submit" title="ADD">
                      ADD
                    </Button>
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
const schema = yup.object().shape({
  rows: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      price: yup.number(),
      qty: yup.number(),
      id: yup.string(),
    })
  ),
});
