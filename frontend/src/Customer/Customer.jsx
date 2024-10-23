import React,{ useEffect, useState }from "react";
import '../src_css/style.css';
// import { NavLink } from "react-router-dom";

function Customer() {
   // Modal state
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   // State to hold customer data
   const [customers, setCustomers] = useState([]);
   
   // State to hold finance document files
   const [financeDocuments, setFinanceDocuments] = useState({
       aadhar: null,
       pan: null,
       voterId: null,
   });

   // Function to handle file input changes
   const handleFileChange = (event) => {
       const { name, files } = event.target;
       setFinanceDocuments((prevDocs) => ({
           ...prevDocs,
           [name]: files[0], // Store the first file
       }));
   };

   // Function to fetch customer data from the backend
   const fetchCustomers = async () => {
       try {
           const response = await fetch('http://localhost:5000/customers');
           if (response.ok) {
               const data = await response.json();
               setCustomers(data);
           } else {
               console.error('Failed to fetch customers:', response.statusText);
           }
       } catch (error) {
           console.error('Error fetching customers:', error);
       }
   };

   // Fetch customers when the component mounts
   useEffect(() => {
       fetchCustomers();
   }, []);

   // Function to handle form submission
   const handleSubmit = async (event) => {
       event.preventDefault(); // Prevent the default form submission
       const formData = new FormData(event.target); // Get the form data

       // Convert FormData to a plain object
       const customerData = Object.fromEntries(formData);
       
       // Add finance documents if finance is selected
       if (customerData.finance === "yes") {
           customerData.financedocuments = {
               aadhar: financeDocuments.aadhar ? financeDocuments.aadhar.name : null,
               pan: financeDocuments.pan ? financeDocuments.pan.name : null,
               voterId: financeDocuments.voterId ? financeDocuments.voterId.name : null,
           };
       }

       try {
           const response = await fetch('http://localhost:5000/customers', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(customerData),
           });

           if (response.ok) {
               const savedCustomer = await response.json();
               setCustomers([...customers, savedCustomer]);
               // Reset form and finance documents state
               event.target.reset();
               setFinanceDocuments({ aadhar: null, pan: null, voterId: null });
           } else {
               console.error('Failed to save customer data:', response.statusText);
           }
       } catch (error) {
           console.error('Error:', error);
       }
   };

    return(
        <>
        <div className="midde_cont">
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                           <h2>Customer Information</h2>
                        </div>
                    </div>
                  </div>
                  <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                           <h4>Personal Information</h4>
                           <form onSubmit={handleSubmit}>
                              <div className="row">
                                 <div className="mt-2 col-md-4">
                                       <label>Name :</label>
                                       <input type="text" name="name" className="form-control" required/>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Mobile/Whatsapp No :</label>
                                       <input type="text" name="mobile" className="form-control" required/>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Email :</label>
                                       <input type="email" name="email" className="form-control" required/>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Address :</label>
                                       <input type="text" name="address" className="form-control" required/>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Date Of Birth :</label>
                                       <input type="date" name="date_birth" className="form-control" required/>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Customer Type :</label>
                                       <select name="customer_type" className="form-control" required>
                                          <option>Select</option>
                                          <option>Business</option>
                                          <option>Salaried</option>
                                          <option>Farmer</option>
                                       </select>
                                 </div>
                                 <div className="mt-2 col-md-12">
                                       <h4 className="mt-3">Car Details</h4>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Model :</label>
                                       <select name="model" className="form-control" required>
                                          <option>Select</option>
                                          <option>Wagon R</option>
                                          <option>Swift</option>
                                          <option>Swift Dzire</option>
                                          <option>Baleno</option>
                                          <option>Fronx</option>
                                          <option>Brezza</option>
                                          <option>Ertiga</option>
                                          <option>XL6</option>
                                          <option>Eeco</option>
                                          <option>Grand Vitara</option>
                                          <option>Alto</option>
                                       </select>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Variant :</label>
                                       <select name="variant" className="form-control" required>
                                          <option>Select</option>
                                          <option>Lxi</option>
                                          <option>Vxi</option>
                                          <option>Zxi</option>
                                       </select>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Color :</label>
                                       <select name="color" className="form-control" required>
                                          <option>Select</option>
                                          <option>Blue</option>
                                          <option>Arctic White</option>
                                          <option>Splendid Silver</option>
                                          <option>Grandeur Grey</option>
                                          <option>Earthen Brown</option>
                                          <option>Opulent Red</option>
                                       </select>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Tentative Delivery Date :</label>
                                       <input type="date" name="tentative_date" className="form-control" required/>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Preferred Delivery Date :</label>
                                       <input type="date" name="preferred_date" className="form-control" required/>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Delivery Request Date :</label>
                                       <input type="date" name="request_date" className="form-control" required/>
                                 </div>
                                 <div className="mt-5 col-md-6">
                                       <label>Ex-Showroom Price :</label>
                                       <input type="text" name="ex_showroom_price" className="form-control" defaultValue="₹" required/>
                                 </div>
                                 <div className="mt-5 col-md-6">
                                       <label>Booking Amount :</label>
                                       <input type="text" name="booking_amount" className="form-control" defaultValue="₹" required/>
                                 </div>
                                 <div className="mt-3 col-md-12">
                                       <h5>Office Use</h5>
                                 </div>
                                 <div className="mt-2 col-md-6">
                                       <label>RM [DSC] :</label>
                                       <input type="text" name="rm_name" className="form-control" required/>
                                 </div>
                                 <div className="mt-2 col-md-6">
                                       <label>SRM [Team Leader] :</label>
                                       <input type="text" name="srm_name" className="form-control" required/>
                                 </div>
                                 <div className="mt-3 col-md-12">
                                       <h4 className="mt-3">Additional Details</h4>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Exchange :</label>
                                       <input type="radio" name="exchange" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="exchange" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Finance :</label>
                                       <input type="radio" name="finance" value="yes" className="ml-2" onClick={() => handleShow()}/>Yes                                       <input type="radio" name="finance" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Accessories :</label>
                                       <input type="radio" name="accessories" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="accessories" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Coating :</label>
                                       <input type="radio" name="coating" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="coating" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>RTO Tax :</label>
                                       <input type="radio" name="rto_tax" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="rto_tax" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Fast Tag :</label>
                                       <input type="radio" name="fast_tag" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="fast_tag" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>NEXA/ARENA Auto card :</label>
                                       <input type="radio" name="auto_card" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="auto_card" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Extended Warranty :</label>
                                       <input type="radio" name="extended_warranty" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="extended_warranty" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Registration Fees:</label>
                                       <input type="radio" name="registration_fees" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="registration_fees" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>CCP:</label>
                                       <input type="radio" name="ccp" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="ccp" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Insurance 0 DEP:</label>
                                       <input type="radio" name="insurance" className="ml-2" value="yes"/>Yes
                                       <input type="radio" name="insurance" className="ml-2" value="no"/>No
                                 </div>
                                 <div className="mt-5 col-md-12 text-center">
                                       <button type="submit" className="btn btn-secondary" style={{ backgroundColor: 'rgb(33, 65, 98)' }}>Save</button>
                                 </div>
                              </div>
                           </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


{/* Bootstrap Modal */}
{show && (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog" role="document" style={{ maxWidth: '500px', width: '600px', height: '500px' }}>
            <div className="modal-content" style={{ height: '100%' }}>
                <div className="modal-header">
                    <h4 className="modal-title">Dealership CEO Email</h4>
                    <button type="button" className="close" onClick={handleClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 120px)' }}>
                  <form>
      	            <p>Aadhar Card</p>
                     <input type="file" className="form-control" required onChange={handleFileChange}></input>
                     <p className="mt-2">Pan Card</p>
                     <input type="file" className="form-control" required onChange={handleFileChange}></input>
                     <p className="mt-2">Voter Card</p>
                     <input type="file" className="form-control" required onChange={handleFileChange}></input>
                  </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
                        Close
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

        </>
    )
}
export default Customer;