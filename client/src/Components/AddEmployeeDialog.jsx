import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import MenuItem from '@mui/material/MenuItem';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosClient from '../AxiosClient';

export default function AddEmployeeDialog() {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(null);

    //open dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    //close dialog
    const handleClose = () => {
        setOpen(false);
        //reset image preview
        setPreview(null); 
    };

    //form validation and submission
    const formik = useFormik({
        initialValues: {
            country: '',
            accountType: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
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
        //submit form data
        onSubmit: (values) => {
            const formData = new FormData();
            // Append form values to FormData
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });

            console.log('Form data:', formData);
            
            

            // Send the form data, including the image
            axiosClient.post('employees/create', formData)
                .then((response) => {
                    console.log('Employee added successfully:', response.data);
                })
                .catch((err) => {
                    console.error('Error adding employee:', err.message);
                });

            handleClose();
        },
    });

    //handle image change and preview it
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('image', file);
        //ste preview for the image
        setPreview(URL.createObjectURL(file)); 
    };

    return (
        <>
            <button
                className="font-workSans px-4 py-1 text-white rounded-md bg-blue-500 hover:bg-blue-700 transition-colors duration-150 ease-in"
                onClick={handleClickOpen}
            >
                <PersonAddAltIcon className="mr-1 mb-1" />
                Add Employee
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: formik.handleSubmit,
                }}
            >
                <h1 className="p-5 font-workSans text-2xl">
                    <PersonOutlineIcon className="mb-1" />
                    Add New Employee
                </h1>
                <DialogContent>
                    <DialogContentText>
                        Fill out the details below to add a new employee.
                    </DialogContentText>
                    <TextField
                        select
                        required
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
                        required
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
                    >
                        <MenuItem value="Team Member">Team Member</MenuItem>
                        <MenuItem value="Team Leader">Team Leader</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>

                    </TextField>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="username"
                        name="username"
                        label="Username"
                        className='font-workSans'
                        fullWidth
                        variant="standard"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        variant="standard"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="contactNumber"
                        name="contactNumber"
                        label="Contact Number"
                        fullWidth
                        variant="standard"
                        value={formik.values.contactNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                    />
                    <div className="my-4">
                        <label
                            htmlFor="image"
                            className="block text-gray-700 font-medium mb-2">
                            Profile Picture (Optional):
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2"
                            />
                            {preview && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg shadow-md border border-gray-300"
                                    />
                                </div>
                            )}
                        </div>
                        {preview && (
                            <button
                                type="button"
                                onClick={() => setPreview(null)}
                                className="mt-2 text-sm text-red-500 hover:underline"
                            >
                                Remove Preview
                            </button>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className='font-workSans mb-2 py-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out px-5' onClick={handleClose}>Cancel</button>
                    <button className='font-workSans mr-3 mb-2 py-3 cursor-pointer text-blue-500 hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out px-3' type="submit">Add</button>
                </DialogActions>
            </Dialog>
        </>
    );
}
