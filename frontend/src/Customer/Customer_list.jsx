import React, { useEffect, useState } from "react";
import '../src_css/style.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Customer_list() {
  const navigate = useNavigate();
    
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
      } catch (err) {
        setError('Error fetching customer data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Handle delete customer
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`http://localhost:5000/customers/${id}`);
        alert('Customer deleted successfully.');
        setCustomers(customers.filter(customer => customer.id !== id));
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Error deleting customer. Please try again.');
      }
    }
  };

  // Handle edit customer
  const handleEdit = (id) => {
    navigate(`/update_customer/${id}`); // Navigate to EditCustomer component with customer ID
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.customer_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="midde_cont">
        <div className="container-fluid">
          <div className="row column_title">
            <div className="col-md-12">
              <div className="page_title">
                <div className="row">
                  <div className="col-md-6">
                    <h2>Customer</h2> 
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row column_title">
            <div className="col-md-12">
              <div className="page_title">
                <h4>List</h4>
                <div className="d-flex justify-content-start mb-2">
                  <input 
                    type="text" 
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ padding: '4px', fontSize: '13px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', maxWidth: '300px' }}
                  />
                </div>
                <div className="d-flex justify-content-end mb-2">
                  <NavLink to='/customer'>
                    <button className="btn text-white" style={{ backgroundColor: 'rgb(33, 65, 98)' }}>Add Customer</button>
                  </NavLink>
                </div>
                <table className="table table-info table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Customer Type</th>
                      <th>Car Model</th>
                      <th>Car Variant</th>
                      <th>Car Color</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer, index) => (
                      <tr key={customer.id}>
                        <td>{index + 1}</td>
                        <td>{customer.name}</td>
                        <td>{customer.mobile}</td>
                        <td>{customer.customer_type}</td>
                        <td>{customer.model}</td>
                        <td>{customer.variant}</td>
                        <td>{customer.color}</td>
                        <td>
                          <button className="btn btn-info mr-2" onClick={() => handleEdit(customer.id)}>Edit</button>
                          <button className="btn btn-danger" onClick={() => handleDelete(customer.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer_list;
