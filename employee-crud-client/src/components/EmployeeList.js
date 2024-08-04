import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => setEmployees(employees.filter(emp => emp._id !== id)))
      .catch(error => console.error(error));
  };

  if (employees.length === 0) {
    return <p>No Employees in the system.</p>;
  }

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            {employee.name} ({employee._id})
            <Link to={`/employees/${employee._id}`}>Details</Link>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add">Add Employee</Link>
    </div>
  );
};

export default EmployeeList;

