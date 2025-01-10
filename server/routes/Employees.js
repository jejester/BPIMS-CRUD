const express = require('express');
const router = express.Router();
const { Employees } = require('../models');

// create new employee
router.post('/create', async (req, res) => {
    try {
        const employee = await Employees.create(req.body);
        res.json(employee);
    } catch (err) {
        res.status(400).json(err);
    }
});