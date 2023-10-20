import React from "react";
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
import Header from "./Header";
import Inputs from "./Inputs";

const currentDate = moment().format("DD/MM/YYYY");

const CustomeTable: React.FC<{ rows: any[]; onAddItem: (data: any) => void }> = ({ rows, onAddItem }) => {
  return (
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Inputs onAddItem={onAddItem} />
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
              {rows.map((row, index) => (
                <TableRow hover tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center">
                      {row[column?.name]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
  );
};

export default CustomeTable;

const columns = [
  {
    id: 10,
    label: "#",
    name: "id",
    align: "center",
    minWidth: 300,
  },
  {
    id: 1,
    label: "Item Name",
    name: "name",
    align: "center",
    minWidth: 300,
  },
  {
    id: 2,
    label: "Price",
    name: "price",
    align: "center",
    minWidth: 170,
  },
  {
    id: 3,
    label: "Qty",
    name: "qty",
    align: "center",
    minWidth: 170,
  },
  {
    id: 4,
    label: "Action",
    name: "actions",
    align: "center",
    minWidth: 170,
  },
];
