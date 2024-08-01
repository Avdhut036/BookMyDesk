import React, { useState, useMemo } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper } from '@mui/material';


const columns = [
  { id: 'id', label: 'ID', width: 90 },
  { id: 'name', label: 'Name', width: 150 },
  { id: 'email', label: 'Email', width: 250 },
  { id: 'floor', label: 'Floor', width: 70 },
  { id: 'seatName', label: 'Seat Name', width: 150 },
  { id: 'role', label: 'Role', width: 120 },
  { id: 'type', label: 'Type', width: 100 },
  { id: 'credits', label: 'Cr', width: 70 },
  { id: 'absentStart', label: 'Absent Start Date', width: 180 },
  { id: 'absentEnd', label: 'Absent End Date', width: 180 },
];

// Sample rows data
const initialRows = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', floor: '1', seatName: 'A1', role: 'Manager', type: 'Full-time', credits: 5, absentStart: '2024-01-01', absentEnd: '2024-01-10' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', floor: '2', seatName: 'B2', role: 'Developer', type: 'Contract', credits: 3, absentStart: '2024-02-01', absentEnd: '2024-02-05' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com', floor: '3', seatName: 'C3', role: 'Designer', type: 'Part-time', credits: 2, absentStart: '2024-03-01', absentEnd: '2024-03-10' },

];

const EmployeesTable = () => {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(initialRows);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter rows based on search query (by id and name)
  const filteredRows = useMemo(() => {
    return rows.filter(row =>
      row.id.toString().includes(search) || row.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, rows]);

  // Sorting function
  const sortedRows = useMemo(() => {
    return filteredRows.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return orderDirection === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return orderDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredRows, orderBy, orderDirection]);

  // Handle request for a new page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Employee Table
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Search by ID or Name..."
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? orderDirection : false}
                    style={{ width: column.width }}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? orderDirection : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  {columns.map(column => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
};

export default EmployeesTable;
