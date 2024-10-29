import React,{ useState }from "react";
import '../src_css/style.css';
import { NavLink } from "react-router-dom";
import axios from 'axios';
 
const Customer = () => {
 
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
        rto_tax:null,
        fast_tag:null,
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

      const [filePreviews, setFilePreviews] = useState({
            aadhar: null,
            pan: null,
            voterId: null,
          });
      
      const [show, setShow] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      
   
      const handleFileChange = (e) => {
            const { name, files: selectedFiles } = e.target;
            const file = selectedFiles[0];
        
            if (file && file.type === 'application/pdf') {
              // Create a URL for the selected PDF file
              const fileURL = URL.createObjectURL(file);
              setFilePreviews({ ...filePreviews, [name]: fileURL });
            } else {
              alert('Please upload a PDF file.');
            }
        
            setFiles({ ...files, [name]: file });
          };
        
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
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
          const response = await axios.post('http://localhost:5000/customers', formDataToSubmit, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          alert(response.data);
          // Optionally, reset the form
          setFormData({
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
            rto_tax:null,
            fast_tag:null,
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
          setFiles({
            aadhar: null,
            pan: null,
            voterId: null,
          });
          setFilePreviews({ aadhar: null, pan: null, voterId: null });
          setShow(false); // Close modal after submission
        } catch (error) {
          console.error('Error uploading data:', error);
          alert('Error uploading data. Please try again.');
        }
      };


      const handleShow = () => setShow(true);
      const handleClose = () => setShow(false);


    return(
        <>
        <div className="midde_cont">
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <div className="row">
                                <div className="col-md-">
                                   <NavLink to='/customer_list'><button className="btn text-white"style={{ backgroundColor: 'rgb(33, 65, 98)',height:'30px',width:'40px' }}><i class="fa-sharp fa-solid fa-arrow-left"></i></button></NavLink>
                                </div>
                                <div className="col-md-5 mt-1">
                                    <h2>Customer Information</h2>
                                </div>
                            </div>
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
                                       <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Mobile/Whatsapp No :</label>
                                       <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Email :</label>
                                       <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Address :</label>
                                       <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Date Of Birth :</label>
                                       <input type="date" name="date_birth" className="form-control" value={formData.date_birth} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Customer Type :</label>
                                       <select name="customer_type" className="form-control" value={formData.customer_type} onChange={handleChange} required >
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
                                       <select name="model" className="form-control" value={formData.model} onChange={handleChange} required >
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
                                       <select name="variant" className="form-control" value={formData.variant} onChange={handleChange} required >
                                          <option>Select</option>
                                          <option>Lxi</option>
                                          <option>Vxi</option>
                                          <option>Zxi</option>
                                       </select>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Color :</label>
                                       <select name="color" className="form-control" value={formData.color} onChange={handleChange} required >
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
                                       <input type="date" name="tentative_date" className="form-control" value={formData.tentative_date} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Preferred Delivery Date :</label>
                                       <input type="date" name="preferred_date" className="form-control" value={formData.preferred_date} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Delivery Request Date :</label>
                                       <input type="date" name="request_date" className="form-control" value={formData.request_date} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-5 col-md-6">
                                       <label>Ex-Showroom Price :</label>
                                       <input type="text" name="ex_showroom_price" className="form-control" defaultValue="₹" value={formData.ex_showroom_price} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-5 col-md-6">
                                       <label>Booking Amount :</label>
                                       <input type="text" name="booking_amount" className="form-control" defaultValue="₹" value={formData.booking_amount} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-3 col-md-12">
                                       <h5>Office Use</h5>
                                 </div>
                                 <div className="mt-2 col-md-6">
                                       <label>RM [DSC] :</label>
                                       <input type="text" name="rm_name" className="form-control" value={formData.rm_name} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-2 col-md-6">
                                       <label>SRM [Team Leader] :</label>
                                       <input type="text" name="srm_name" className="form-control" value={formData.srm_name} onChange={handleChange} required />
                                 </div>
                                 <div className="mt-3 col-md-12">
                                       <h4 className="mt-3">Additional Details</h4>
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Exchange :</label>
                                       <input type="radio" name="exchange" className="ml-2" value="yes" checked={formData.exchange === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="exchange" className="ml-2" value="no" checked={formData.exchange === "no"}onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Finance :</label>
                                       <input type="radio" name="finance" value="yes" className="ml-2"  checked={formData.finance === "yes"} onChange={(e) => { handleChange(e); handleShow(); }}/>Yes
                                       <input type="radio" name="finance" className="ml-2" value="no" checked={formData.finance === "no"} onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-2 col-md-4">
                                       <label>Accessories :</label>
                                       <input type="radio" name="accessories" className="ml-2" value="yes" checked={formData.accessories === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="accessories" className="ml-2" value="no" checked={formData.accessories === "no"}onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Coating :</label>
                                       <input type="radio" name="coating" className="ml-2" value="yes" checked={formData.coating === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="coating" className="ml-2" value="no" checked={formData.coating === "no"}onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>RTO Tax :</label>
                                       <input type="radio" name="rto_tax" className="ml-2" value="yes" checked={formData.rto_tax  === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="rto_tax" className="ml-2" value="no" checked={formData.rto_tax  === "no"}onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Fast Tag :</label>
                                       <input type="radio" name="fast_tag" className="ml-2" value="yes" checked={formData.fast_tag === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="fast_tag" className="ml-2" value="no" checked={formData.fast_tag === "no"}onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>NEXA/ARENA Auto card :</label>
                                       <input type="radio" name="auto_card" className="ml-2" value="yes" checked={formData.auto_card === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="auto_card" className="ml-2" value="no" checked={formData.auto_card === "no"}onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Extended Warranty :</label>
                                       <input type="radio" name="extended_warranty" className="ml-2" value="yes" checked={formData.extended_warranty === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="extended_warranty" className="ml-2" value="no" checked={formData.extended_warranty === "no"}onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Registration Fees:</label>
                                       <input type="radio" name="registration_fees" className="ml-2" value="yes" checked={formData.registration_fees === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="registration_fees" className="ml-2" value="no" checked={formData.registration_fees === "no"}onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>CCP:</label>
                                       <input type="radio" name="ccp" className="ml-2" value="yes" checked={formData.ccp === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="ccp" className="ml-2" value="no" checked={formData.ccp === "no"}onChange={handleChange}/>No
                                 </div>
                                 <div className="mt-4 col-md-4">
                                       <label>Insurance 0 DEP:</label>
                                       <input type="radio" name="insurance" className="ml-2" value="yes" checked={formData.insurance === "yes"}onChange={handleChange}/>Yes
                                       <input type="radio" name="insurance" className="ml-2" value="no" checked={formData.insurance === "no"}onChange={handleChange}/>No
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


        {show && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document" style={{ maxWidth: '1000px', width: '900px', height: '600px' }}>
            <div className="modal-content" style={{ height: '100%' }}>
              <div className="modal-header">
                <h4 className="modal-title">Upload Documents</h4>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 120px)' }}>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <p>Aadhar Card</p>
                      <input type="file" name="aadhar" className="form-control" onChange={handleFileChange} />
                      {filePreviews.aadhar && <iframe src={filePreviews.aadhar} style={{ width: '100%', height: '200px' }} title="Aadhar Preview" />}
                    </div>
                    <div className="col-md-6">
                      <p className="mt-2">Pan Card</p>
                      <input type="file" name="pan" className="form-control" onChange={handleFileChange} />
                      {filePreviews.pan && <iframe src={filePreviews.pan} style={{ width: '100%', height: '200px' }} title="Pan Preview" />}
                    </div>
                    <div className="col-md-6">
                      <p className="mt-2">Voter Card</p>
                      <input type="file" name="voterId" className="form-control" onChange={handleFileChange} />
                      {filePreviews.voterId && <iframe src={filePreviews.voterId} style={{ width: '100%', height: '200px' }} title="Voter ID Preview" />}
                    </div>
                  </div>
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