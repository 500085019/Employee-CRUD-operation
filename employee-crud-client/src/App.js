import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL_BASE =  'https://free-ap-south-1.cosmocloud.io/development/api';
; // Change to your backend URL if different

const App = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  // Function to create a new employee
  const createEmployee = async () => {
    try {
      const response = await axios.post(API_URL_BASE, { name: employeeName });
      setEmployees([...employees, response.data.local]);
      setEmployeeName('');
    } catch (err) {
      setError('Error creating employee: ' + err.message);
    }
  };

  // Function to delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL_BASE}/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (err) {
      setError('Error deleting employee: ' + err.message);
    }
  };

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(API_URL_BASE);
        setEmployees(response.data.local);
      } catch (err) {
        setError('Error fetching employees: ' + err.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <header>
        <h1>Employee Management</h1>
      </header>
      <main>
        <div style={{ padding: '20px' }}>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Enter employee name"
            style={{ padding: '10px', width: '300px', marginRight: '10px' }}
          />
          <button onClick={createEmployee} style={{ padding: '10px 20px' }}>Add Employee</button>
        </div>

        {error && <p style={{ color: 'red', padding: '20px' }}>{error}</p>}

        <ul style={{ listStyle: 'none', padding: '20px' }}>
          {employees.map(employee => (
            <li key={employee._id} style={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
              <span style={{ flex: 1 }}>{employee.name}</span>
              <button onClick={() => deleteEmployee(employee._id)} style={{ padding: '5px 10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <p>&copy; 2024 NAMAN. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
