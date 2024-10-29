import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        date_birth: '',
        tentative_date: '',
        preferred_date: '',
        request_date: '',
        customer_type: '',
        model: '',
        variant: '',
        color: '',
        ex_showroom_price: '',
        booking_amount: '',
        rm_name: '',
        srm_name: '',
        exchange: null,
        finance: null,
        accessories: null,
        coating: null,
        auto_card: null,
        extended_warranty: null,
        registration_fees: null,
        ccp: null,
        insurance: null,
    });

    const [files, setFiles] = useState({
        aadhar: null,
        pan: null,
        voterId: null,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/customers/${id}`);
                const data = response.data;

                // Convert ISO dates to YYYY-MM-DD format
                const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '';
                setFormData({
                    ...data,
                    date_birth: formatDate(data.date_birth),
                    tentative_date: formatDate(data.tentative_date),
                    preferred_date: formatDate(data.preferred_date),
                    request_date: formatDate(data.request_date),
                });
            } catch (error) {
                console.error('Error fetching customer data:', error);
                setErrorMessage('Error fetching customer data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        const file = selectedFiles[0];
        if (file && file.type === 'application/pdf') {
            setFiles({ ...files, [name]: file });
        } else {
            alert('Only PDF files are allowed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }
        for (const key in files) {
            if (files[key]) {
                formDataToSubmit.append(key, files[key]);
            }
        }

        try {
            const response = await axios.put(`http://localhost:5000/customers/${id}`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Customer updated successfully.');
            navigate('/');
        } catch (error) {
            console.error('Error updating customer:', error);
            setErrorMessage('Error updating customer. Please try again.');
        }
    };

    if (loading) return <p>Loading customer data...</p>;

    return (
        <div>
            <h2>Edit Customer</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="date" name="date_birth" value={formData.date_birth} onChange={handleChange} required />
                <input type="date" name="tentative_date" value={formData.tentative_date} onChange={handleChange} required />
                <input type="date" name="preferred_date" value={formData.preferred_date} onChange={handleChange} required />
                <input type="date" name="request_date" value={formData.request_date} onChange={handleChange} required />
                
                <select name="customer_type" value={formData.customer_type} onChange={handleChange} required>
                    <option value="">Select Customer Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                </select>
                
                <input type="text" name="model" placeholder="Car Model" value={formData.model} onChange={handleChange} required />
                <input type="text" name="variant" placeholder="Car Variant" value={formData.variant} onChange={handleChange} required />
                <input type="text" name="color" placeholder="Car Color" value={formData.color} onChange={handleChange} required />
                <input type="number" name="ex_showroom_price" placeholder="Ex-Showroom Price" value={formData.ex_showroom_price} onChange={handleChange} required />
                <input type="number" name="booking_amount" placeholder="Booking Amount" value={formData.booking_amount} onChange={handleChange} required />
                <input type="text" name="rm_name" placeholder="RM Name" value={formData.rm_name} onChange={handleChange} required />
                <input type="text" name="srm_name" placeholder="SRM Name" value={formData.srm_name} onChange={handleChange} required />

                <h3>Additional Options</h3>
                {['exchange', 'finance', 'accessories', 'coating', 'auto_card', 'extended_warranty', 'registration_fees', 'ccp', 'insurance'].map(option => (
                    <label key={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1).replace(/_/g, ' ')}:
                        <select name={option} value={formData[option] || ''} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </label>
                ))}

                <h3>Upload Documents</h3>
                <input type="file" name="aadhar" accept="application/pdf" onChange={handleFileChange} />
                <input type="file" name="pan" accept="application/pdf" onChange={handleFileChange} />
                <input type="file" name="voterId" accept="application/pdf" onChange={handleFileChange} />

                <button type="submit">Update Customer</button>
            </form>
        </div>
    );
};

export default EditCustomer;






   