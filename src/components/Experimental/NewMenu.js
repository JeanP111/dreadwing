import React, { useEffect, useState } from 'react';

const CustomersComponent = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error("There was an error!", error));
  }, []);

  return (
    <div>
      <h2>Klienci</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>{customer.name} - {customer.industry}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersComponent;