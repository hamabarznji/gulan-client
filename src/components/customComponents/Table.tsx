import React, { ChangeEvent } from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from '@mui/material';

interface TableProps {
  rows: any[];
  columns: any[];
  isPagination?: boolean;
}


const CustomeTable:React.FC<TableProps> = ({
    rows,
    columns,
    isPagination=true
}:TableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Example data
// 
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{
        maxHeight: 'calc(100vh - 200px)',
        '@media (max-width: 600px)': {
          maxHeight: 'calc(100vh - 300px)',
        },
      }}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: '#f5f5f5',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              '& th': {
                color: '#000000',
              },
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ fontSize: '1rem', padding: '8px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={row.id} align="center" sx={{ fontSize: "1rem",  color: "black" }}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination &&    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}
    </Paper>
  );
};

export default CustomeTable;
