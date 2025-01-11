import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from '../AxiosClient';


export default function DeleteDialog({ id, onDeleteSuccess }) {
    const [open, setOpen] = useState(false);

    //open dialog
    const handleClickOpen = () => {
    setOpen(true);
    };

    // close dialog
    const handleClose = () => {
    setOpen(false);
    };

    // delete employee
    const handleDelete = () => {
        axiosClient.delete(`employees/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Employee deleted successfully');
                    onDeleteSuccess?.(id); // Notify parent on successful deletion
                } else {
                    console.error('Error deleting employee:', response);
                }
            })
            .catch((err) => {
                console.error('Error deleting employee:', err);
            })
            .finally(() => {
                setOpen(false); // Close dialog after deletion
            });
    };

    // render dialog
    return (
    <>
        <DeleteIcon
            className="text-red-600 dark:text-red-400 hover:underline hover:text-red-500 cursor-pointer hover:drop-shadow-md"
            onClick={handleClickOpen}
        />
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            {"Delete record?"}
        </DialogTitle>
        <DialogContent>
            <p id="alert-dialog-description" className='font-workSans'>
                Are you sure you want to delete this record? This action cannot be undone.
            </p>
        </DialogContent>
        <DialogActions>
            <p className='font-workSans mb-2 py-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out px-5' onClick={handleClose}>Cancel</p>
            <p className='font-workSans mb-2 mr-3 py-3 px-5 text-red-500 cursor-pointer hover:bg-gray-200 rounded-md transition-colors duration-200 ease-in-out' onClick={handleDelete} autoFocus>Delete</p>
        </DialogActions>
        </Dialog>
    </>
    );
}