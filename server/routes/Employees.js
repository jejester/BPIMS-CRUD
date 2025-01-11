const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');
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

//set up multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //path to store the uploaded file
        cb(null, 'public/uploads'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Add unique file name
    }
});

//upload instance
const upload = multer({ storage });

//add a new employee and handle the image upload
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        //prepare data to create a new employee
        const employeeData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            country: req.body.country,
            accountType: req.body.accountType,
            // if there's an image, save the image path, otherwise null
            imagePath: req.file ? `/uploads/${req.file.filename}` : null, 
        };

        //create the employee in the database
        const employee = await Employees.create(employeeData);
        
        res.json(employee);
    } catch (err) {
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

        //prepare update data
        const updateData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            country: req.body.country,
            accountType: req.body.accountType
        };

        //handles image update
        if (req.file) {
            //delete old image if it exists
            if (employee.imagePath) {
                try {
                    const oldImagePath = path.join(__dirname, '../public', employee.imagePath);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                } catch (fileError) {
                    console.error('Error deleting old image:', fileError);
                }
            }
            
            //add new image path to update data
            updateData.imagePath = `/uploads/${req.file.filename}`;
        }

        //updates employee
        const updatedEmployee = await employee.update(updateData);

        // success response
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

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        //checks if the employee has an image
        if (employee.image) {
            
            const imagePath = path.join(__dirname, '/public/uploads/', employee.image); 
            
            //deletes the image if it exists
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                    //still delete the data even there;s image error
                    return res.status(500).json({ message: "Error deleting image, but employee deleted" });
                }
                console.log("Image deleted successfully");
            });
        }

        //delete the employee record
        await employee.destroy();
        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;