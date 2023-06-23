import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import { useQuery,QueryKey } from '@tanstack/react-query'
import UserServiceInstance from '../../../services/user';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue[500],
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(username: string, role: string) {
  return { username, role };
}

const rows = [
  
  createData('Hama', 'admin'),
  createData('Gulan', 'admin'),
  createData('Sara', 'user'),
];
const queryKey: QueryKey = ['users']; 

export default function CustomizedTables() {

  const fetchUsers = async () => {
    try {
     return await UserServiceInstance.getUsers();
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  };
  
    const {  data:users } = useQuery(queryKey, fetchUsers);
  //     const rows = users?.map((user: any) => createData(user.username, user.role));

  console.log(users)
  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Username</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.username}>
              <StyledTableCell component="th" scope="row">
                {row.username}
              </StyledTableCell>
              <StyledTableCell align="right">{row.role}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
