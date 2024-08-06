import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditUserDialog = ({ open, onClose, formData, onInputChange, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="ID"
          name="id"
          value={formData.id || ''}
          onChange={onInputChange}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name || ''}
          onChange={onInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email || ''}
          onChange={onInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Floor"
          name="floor"
          value={formData.floor || ''}
          onChange={onInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Seat Name"
          name="seatName"
          value={formData.seatName || ''}
          onChange={onInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Role Name"
          name="roleName"
          value={formData.roleName || ''}
          onChange={onInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Role Frequency"
          name="roleFrequency"
          value={formData.roleFrequency || ''}
          onChange={onInputChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
