import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosClient from '../AxiosClient';

export default function EditEmployeeDialog({ open, employee, onClose, onEmployeeUpdated }) {
    //state variables
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(employee?.imagePath ? `http://localhost:5000${employee.imagePath}` : null);

    //formik form handling
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            country: employee?.country || '',
            accountType: employee?.accountType || '',
            username: employee?.username || '',
            firstName: employee?.firstName || '',
            lastName: employee?.lastName || '',
            email: employee?.email || '',
            contactNumber: employee?.contactNumber || '',
            image: null,
        },
        validationSchema: Yup.object({
            country: Yup.string().required('Country is required'),
            accountType: Yup.string().required('Account type is required'),
            username: Yup.string().required('Username is required'),
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            contactNumber: Yup.string()
                .matches(/^[0-9]+$/, 'Contact number must be numeric')
                .required('Contact number is required'),
            image: Yup.mixed().nullable(),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
    
            //append all values to form data
            Object.keys(values).forEach((key) => {
                // append image file only if it's a file
                if (key === 'image') {
                    if (values[key] instanceof File) {
                        formData.append(key, values[key]);
                    }
                } else {
                    formData.append(key, values[key]);
                }
            });
        
            //send update request
            axiosClient.put(`employees/update/${employee.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                // notify parent component
                if (onEmployeeUpdated) {
                    onEmployeeUpdated(response.data);
                }
                // close dialo
                setIsEditing(false);
                onClose();
            })
            .catch((err) => {
                console.error('Error updating employee:', err.response?.data || err.message);
            });
        },
    });

    //handle image change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('image', file);
        setPreview(URL.createObjectURL(file));
    };

    //close dialog
    const handleClose = () => {
        setIsEditing(false);
        formik.resetForm();
        onClose();
    };

    //render dialog
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                component: 'form',
                onSubmit: formik.handleSubmit,
            }}
        >
            <h1 className="p-5 font-workSans text-2xl flex items-center justify-between">
                <div>
                    <PersonOutlineIcon className="mb-1 mr-2" />
                    {isEditing ? 'Edit Employee' : 'Employee Details'}
                </div>
                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="text-sm text-blue-500 hover:text-blue-700"
                    >
                        Edit
                    </button>
                )}
            </h1>
            <DialogContent>
                <DialogContentText className="text-center">
                    {isEditing ? 'Edit the employee details below.' : 'Employee information'}
                </DialogContentText>

                {/* Profile Image */}
                <div className="flex justify-center mb-6 mt-3">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Employee"
                            className="w-32 h-32 rounded-full object-cover shadow-lg"
                        />
                    ) : (
                        <img
                            src="/uploads/default_user.png"
                            alt="Default User"
                            className="w-32 h-32 rounded-full object-cover shadow-lg"
                        />
                    )}
                </div>

                {isEditing && (
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                            Update Profile Picture:
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer p-2"
                        />
                    </div>
                )}

                <TextField
                    select
                    margin="dense"
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.country && Boolean(formik.errors.country)}
                    helperText={formik.touched.country && formik.errors.country}
                    disabled={!isEditing}
                >
                    <MenuItem value="Philippines">Philippines</MenuItem>
                    <MenuItem value="Thailand">Thailand</MenuItem>
                    <MenuItem value="Korea">Korea</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                </TextField>

                <TextField
                    select
                    margin="dense"
                    id="accountType"
                    name="accountType"
                    label="Account Type"
                    fullWidth
                    value={formik.values.accountType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.accountType && Boolean(formik.errors.accountType)}
                    helperText={formik.touched.accountType && formik.errors.accountType}
                    disabled={!isEditing}
                >
                    <MenuItem value="Team Member">Team Member</MenuItem>
                    <MenuItem value="Team Leader">Team Leader</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </TextField>

                {['username', 'lastName', 'firstName', 'email', 'contactNumber'].map((field) => (
                    <TextField
                        key={field}
                        margin="dense"
                        id={field}
                        name={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                        type={field === 'email' ? 'email' : 'text'}
                        fullWidth
                        variant="standard"
                        value={formik.values[field]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field] && Boolean(formik.errors[field])}
                        helperText={formik.touched[field] && formik.errors[field]}
                        disabled={!isEditing}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <button
                    type="button"
                    className="font-workSans mb-2 py-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out px-5"
                    onClick={handleClose}
                >
                    {isEditing ? 'Cancel' : 'Close'}
                </button>
                {isEditing && (
                    <button
                        type="submit"
                        className="font-workSans mr-3 mb-2 py-3 cursor-pointer text-blue-500 hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out px-3"
                    >
                        Save Changes
                    </button>
                )}
            </DialogActions>
        </Dialog>
    );
}