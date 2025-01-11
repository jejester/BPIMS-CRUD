const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { Employees } = require('../models');

// get all employeess
router.get('/', async (req, res) => {
    try {
        const employees = await Employees.findAll();
        res.json(employees);
    } catch (err) {
        res.status(400).json(err);
    }
});


// Set up multer storage engine to specify the destination and file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Directory to store the uploaded file
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Add unique file name
    }
});

// Create an upload instance (single file with the fieldname 'image')
const upload = multer({ storage });

// Create a new employee and handle the image upload
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        // Prepare the data to create a new employee
        const employeeData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            country: req.body.country,
            accountType: req.body.accountType,
            imagePath: req.file ? `/uploads/${req.file.filename}` : null, // If there's an image, save the image path, otherwise null
        };

        // Create the employee in the database
        const employee = await Employees.create(employeeData);
        
        // Send the employee object as a response
        res.json(employee);
    } catch (err) {
        // Send error response if something goes wrong
        res.status(400).json(err);
    }
});

//get emplpyee by id
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employees.findByPk(req.params.id);
        res.json(employee);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const employee = await Employees.findByPk(req.params.id);
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Prepare update data
        const updateData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            country: req.body.country,
            accountType: req.body.accountType
        };

        // Handle image update
        if (req.file) {
            // Delete old image if it exists
            if (employee.imagePath) {
                try {
                    const oldImagePath = path.join(__dirname, '../public', employee.imagePath);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                } catch (fileError) {
                    console.error('Error deleting old image:', fileError);
                    // Continue with update even if old file deletion fails
                }
            }
            
            // Add new image path to update data
            updateData.imagePath = `/uploads/${req.file.filename}`;
        }

        // Update employee
        const updatedEmployee = await employee.update(updateData);

        // Send success response
        res.json(updatedEmployee);

    } catch (err) {
        console.error('Update error:', {
            message: err.message,
            stack: err.stack
        });
        
        res.status(400).json({
            error: {
                message: err.message,
                details: err.errors ? err.errors.map(e => e.message) : undefined
            }
        });
    }
});

// delete employee by id
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employees.findByPk(req.params.id);
        await employee.destroy();
        res.json(employee);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;