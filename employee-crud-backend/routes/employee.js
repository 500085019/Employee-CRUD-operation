const express = require('express');
const axios = require('axios');
const Employee = require('../models/employee.model');
const router = express.Router();

const COSMOCLOUD_BASE_URL = 'https://free-ap-south-1.cosmocloud.io/development/api';
const UPLOAD_ENDPOINT = `${COSMOCLOUD_BASE_URL}/storage-accounts/employee-crud-operation/upload`;
const DOWNLOAD_ENDPOINT = `${COSMOCLOUD_BASE_URL}/storage-accounts/employee-crud-operation/download`;
const DELETE_ENDPOINT = `${COSMOCLOUD_BASE_URL}/storage-accounts/employee-crud-operation/delete`;

const PROJECT_ID = process.env.PROJECT_ID; // Set in your .env file
const ENVIRONMENT_ID = process.env.ENVIRONMENT_ID; // Set in your .env file

// Create a new employee (Upload)
router.post('/', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        const savedEmployee = await newEmployee.save();

        const response = await axios.post(UPLOAD_ENDPOINT, req.body, {
            headers: {
                'projectId': PROJECT_ID,
                'environmentId': ENVIRONMENT_ID
            }
        });

        res.status(201).json({ local: savedEmployee, cosmocloud: response.data });
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        res.status(400).json({ message: err.message });
    }
});

// List all employees (Download)
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();

        const response = await axios.get(DOWNLOAD_ENDPOINT, {
            headers: {
                'projectId': PROJECT_ID,
                'environmentId': ENVIRONMENT_ID
            }
        });

        res.json({ local: employees, cosmocloud: response.data });
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        res.status(500).json({ message: err.message });
    }
});

// Get a single employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const response = await axios.get(`${DOWNLOAD_ENDPOINT}/${req.params.id}`, {
            headers: {
                'projectId': PROJECT_ID,
                'environmentId': ENVIRONMENT_ID
            }
        });

        res.json({ local: employee, cosmocloud: response.data });
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        res.status(500).json({ message: err.message });
    }
});

// Update an employee by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const response = await axios.patch(`${UPLOAD_ENDPOINT}/${req.params.id}`, req.body, {
            headers: {
                'projectId': PROJECT_ID,
                'environmentId': ENVIRONMENT_ID
            }
        });

        res.json({ local: updatedEmployee, cosmocloud: response.data });
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        res.status(400).json({ message: err.message });
    }
});

// Delete an employee by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await axios.delete(`${DELETE_ENDPOINT}/${req.params.id}`, {
            headers: {
                'projectId': PROJECT_ID,
                'environmentId': ENVIRONMENT_ID
            }
        });

        res.json({ message: 'Employee deleted' });
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
