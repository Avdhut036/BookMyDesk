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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUser from './AddUser'; // Import AddUser component

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

  const navigate = useNavigate();

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
    return rows.filter(row =>
      row.id.toString().includes(search) ||
      row.name.toLowerCase().includes(search.toLowerCase())
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

  // Handle row selection
  const handleRowSelect = (event, row) => {
    const selectedIndex = selectedRows.indexOf(row.id);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, row.id]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== row.id));
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
        await axios.delete(`http://localhost:5000/api/User/${selectedRow.id}`);
        setRows(rows.filter(row => row.id !== selectedRow.id));
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditConfirmed = async () => {
    try {
      await axios.put(`http://localhost:5000/api/User/${formData.id}`, formData);
      setRows(rows.map(row => (row.id === formData.id ? formData : row)));
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedRows.map(id => axios.delete(`http://localhost:5000/api/User/${id}`)));
      setRows(rows.filter(row => !selectedRows.includes(row.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected users:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '100%' }}>
      <Box sx={{ padding: 1 }}>
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
            onClick={() => setAddUserDialogOpen(true)} // Open Add User Dialog
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
                        if (e.target.checked) {
                          setSelectedRows(filteredRows.map(row => row.id));
                        } else {
                          setSelectedRows([]);
                        }
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
          // Ensure page size remains consistent even with fewer rows
          backIconButtonProps={{ disabled: page === 0 }}
          nextIconButtonProps={{ disabled: page >= Math.ceil(filteredRows.length / rowsPerPage) - 1 }}
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="ID"
            name="id"
            value={formData.id || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            disabled
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Floor"
            name="floor"
            value={formData.floor || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Seat Name"
            name="seatName"
            value={formData.seatName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Role Name"
            name="roleName"
            value={formData.roleName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Role Frequency"
            name="roleFrequency"
            value={formData.roleFrequency || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditConfirmed} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

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
