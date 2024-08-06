import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Button,
  IconButton,
  Checkbox, // Import Checkbox
  Dialog,
  DialogTitle, // Import DialogTitle
  DialogContent, // Import DialogContent
  DialogActions // Import DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUser from './AddUser';
import EditUserDialog from './EditUserDialog';
import DeleteUserDialog from './DeleteUserDialog';

// Define table columns
const columns = [
  { id: 'id', label: 'ID', width: 90 },
  { id: 'name', label: 'Name', width: 200 },
  { id: 'email', label: 'Email', width: 250 },
  { id: 'floor', label: 'Floor', width: 70 },
  { id: 'seatName', label: 'Seat Name', width: 150 },
  { id: 'roleName', label: 'Role Name', width: 150 },
  { id: 'roleFrequency', label: 'Role Frequency', width: 150 }
];

const EmployeesTable = () => {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/User/employeetable');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter rows based on search query
  const filteredRows = useMemo(() => {
    const query = search.toLowerCase();
    return rows.filter(row =>
      row.id.toString().includes(search) ||
      row.name.toLowerCase().includes(query)
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
    setOrderDirection((prevOrder) =>
      orderBy === property && prevOrder === 'asc' ? 'desc' : 'asc'
    );
    setOrderBy(property);
  };

  // Handle row selection
  const handleRowSelect = (event, row) => {
    const selectedIndex = selectedRows.indexOf(row.id);
    if (selectedIndex === -1) {
      setSelectedRows((prevSelected) => [...prevSelected, row.id]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((id) => id !== row.id)
      );
    }
  };

  // Handle Edit and Delete actions
  const handleEditUser = (row) => {
    setFormData(row);
    setEditDialogOpen(true);
  };

  const handleDeleteUser = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      if (selectedRow) {
        await axios.delete(`/api/User/${selectedRow.id}`);
        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRow.id));
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditConfirmed = async () => {
    try {
      await axios.put(`/api/User/${formData.id}`, formData);
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === formData.id ? formData : row))
      );
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) => axios.delete(`/api/User/${id}`))
      );
      setRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected users:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '100%' }}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Employee Table
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search by ID or Name..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddUserDialogOpen(true)}
          >
            Add User
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={selectedRows.length === 0}
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </Button>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer sx={{ maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.length === filteredRows.length}
                      onChange={(e) => {
                        setSelectedRows(e.target.checked ? filteredRows.map(row => row.id) : []);
                      }}
                    />
                  </TableCell>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      sortDirection={orderBy === column.id ? orderDirection : false}
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={(event) => handleRowSelect(event, row)}
                    selected={selectedRows.includes(row.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onChange={(event) => handleRowSelect(event, row)}
                      />
                    </TableCell>
                    {columns.map(column => (
                      <TableCell key={column.id} sx={{ width: column.width }}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton onClick={() => handleEditUser(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteUser(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 7, 10]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Edit User Dialog */}
      <EditUserDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onConfirm={handleEditConfirmed}
      />

      {/* Delete User Dialog */}
      <DeleteUserDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
      />

      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)} fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <AddUser onClose={() => setAddUserDialogOpen(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default EmployeesTable;
