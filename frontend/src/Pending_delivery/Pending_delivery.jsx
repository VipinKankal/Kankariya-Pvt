import React,{ useState, useEffect } from "react";
import '../src_css/style.css';
import axios from "axios";
import { NavLink } from "react-router-dom";

function Pending_delivery() {
    // Location
    const [locationName, setLocationName] = useState('');
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Reverse Geocoding with Nominatim API
            axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
              .then((response) => {
                const address = response.data.display_name;
                setLocationName(address);
              })
              .catch((error) => {
                console.error('Error fetching location name:', error);
              });
            },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);
    
    //modal
    const [show, setShow] = useState(false);
    const handleShow = (status) => {
        setShow(true); // Show the modal
    };
    const handleClose = () => {
        setShow(false); // Hide the modal
    };
    return (
        <>
            <div className="midde_cont">
                <div className="container-fluid">
                    <div className="row column_title">
                        <div className="col-md-12">
                            <div className="page_title">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h2>Pending Delivery</h2>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <i className="fas fa-location-dot" style={{ position: 'absolute', right: '200px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}></i>
                                        <input type="text" id="location" name="location" value={locationName} readOnly></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row column_title">
                        <div className="col-md-12">
                            <div className="page_title">
                                <h4>Pending</h4>
                                <div className="row">
                                    <div className="mt-2 col-md-4">
                                        <label>From Date</label>
                                        <input type="date" style={{ padding: '4px', fontSize: '13px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', maxWidth: '300px' }} className="form-control"></input>
                                    </div>
                                    <div className="mt-2 col-md-4">
                                        <label>To Date</label>
                                        <input type="date" style={{ padding: '4px', fontSize: '13px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', maxWidth: '300px' }} className="form-control"></input>
                                    </div>
                                    <div className="mt-2 col-md-4 mt-4">
                                        <button className="btn text-white" style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
                                            <i className="fa-solid fa-magnifying-glass"></i> Search
                                        </button>
                                    </div>
                                </div>

                                <table className="table table-info table-bordered table-striped table-hover mt-5">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Booking No</th>
                                            <th>Customer Details</th>
                                            <th>Customer Address</th>
                                            <th>Vehicle Details</th>
                                            <th>Executive Details</th>
                                            <th>Requested Delivery Date</th>
                                            <th>Preliminary Checklist</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="radio" name="click"/>
                                            </td>
                                            <td>99112</td>
                                            <td>Aashish Sharma</td>
                                            <td>Pune</td>
                                            <td>Swift ZDI</td>
                                            <td>Monali Sopan</td>
                                            <td>20-09-2024</td>
                                            <td>
                                                <NavLink onClick={() => handleShow()} className="text-info">
                                                    Check Status
                                                </NavLink>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                 <input type="radio" name="click"/>
                                            </td>
                                            <td>0987</td>
                                            <td>Ram Misal</td>
                                            <td>Shivaji Nagar</td>
                                            <td>Brezza</td>
                                            <td>Lalit</td>
                                            <td>20-09-2024</td>
                                            <td>
                                                <NavLink onClick={() => handleShow()} className="text-info">
                                                    Check Status
                                                </NavLink>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                 <input type="radio" name="click"/>
                                            </td>
                                            <td>0987</td>
                                            <td>Akshay Pawar</td>
                                            <td>Nagar</td>
                                            <td>Alto</td>
                                            <td>Vikas</td>
                                            <td>20-09-2024</td>
                                            <td>
                                                <NavLink onClick={() => handleShow()} className="text-info">
                                                    Check Status
                                                </NavLink>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-end">
                                <NavLink to='/schedul-calendar'><button className="btn text-white" style={{ backgroundColor: 'rgb(33, 65, 98)' }}>Schedule Delivery</button></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Modal */}
            {show && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document" style={{ maxWidth: '950px', width: '80%', height: '450px' }}>
                        <div className="modal-content" style={{ height: '100%' }}>
                            <div className="modal-header">
                                <h4 className="modal-title">Delivery Status</h4>
                                <button type="button" className="close" onClick={handleClose}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 120px)' }}>
                                {/* <p>{selectedStatus}</p> */}
                                {/* You can add more detailed content here */}
                                <table className="table table-bordered table-striped table-hover mt-3">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Fainance Manager</th>
                                            <th>Account Manager</th>
                                            <th>DC</th>
                                            <th>MGA</th>
                                            <th>RTO</th>
                                            <th>PDI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>status</td>
                                            <td>Submitted</td>
                                            <td>Submitted</td>
                                            <td>Submitted</td>
                                            <td>Submitted</td>
                                            <td>Submitted</td>
                                            <td>Submitted</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>Work Completion Date</td>
                                            <td>29-09-2024</td>
                                            <td>29-09-2024</td>
                                            <td>29-09-2024</td>
                                            <td>29-09-2024</td>
                                            <td>29-09-2024</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>Due Days</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>1</td>
                                            <td>93</td>
                                            <td>2</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>Comments</td>
                                            <td>Approved</td>
                                            <td>Everthing Is Fine</td>
                                            <td>ok</td>
                                            <td>Will Be Done</td>
                                            <td>ok</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Pending_delivery;