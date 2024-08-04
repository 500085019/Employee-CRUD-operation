import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/employees/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>Address: {employee.address.line1}, {employee.address.city}, {employee.address.country} - {employee.address.zip}</p>
      <h2>Contact Methods</h2>
      <ul>
        {employee.contacts.map((contact, index) => (
          <li key={index}>{contact.contact_method}: {contact.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDetails;
