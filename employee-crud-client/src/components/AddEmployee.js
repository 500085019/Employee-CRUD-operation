import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [contacts, setContacts] = useState([{ contact_method: '', value: '' }]);
  const history = useHistory();

  const handleContactChange = (index, e) => {
    const newContacts = contacts.slice();
    newContacts[index][e.target.name] = e.target.value;
    setContacts(newContacts);
  };

  const handleAddContact = () => {
    setContacts([...contacts, { contact_method: '', value: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { name, address: { line1, city, country, zip }, contacts };
    axios.post('http://localhost:5000/employees', newEmployee)
      .then(() => history.push('/'))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Employee</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Address Line 1:</label>
        <input type="text" value={line1} onChange={(e) => setLine1(e.target.value)} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <div>
        <label>Country:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </div>
      <div>
        <label>ZIP Code:</label>
        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} required />
      </div>
      <div>
        <h2>Contact Methods</h2>
        {contacts.map((contact, index) => (
          <div key={index}>
            <label>Contact Method:</label>
            <select name="contact_method" value={contact.contact_method} onChange={(e) => handleContactChange(index, e)} required>
              <option value="">Select</option>
              <option value="EMAIL">EMAIL</option>
              <option value="PHONE">PHONE</option>
            </select>
            <label>Value:</label>
            <input type="text" name="value" value={contact.value} onChange={(e) => handleContactChange(index, e)} required />
          </div>
        ))}
        <button type="button" onClick={handleAddContact}>Add Another Contact</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddEmployee;

