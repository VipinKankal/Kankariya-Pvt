import React, { useState } from "react";
import '../src_css/style.css';

function Coating(){
    //modal
    const [show, setShow] = useState(false);
    const handleShow = (status) => {
        setShow(true); // Show the modal
    };
    const handleClose = () => {
        setShow(false); // Hide the modal
    };
    //Reject Resson 
    const [showInput, setShowInput] = useState(false);
    const [reason, setReason] = useState('');
    const handleRejectClick = () => {
      setShowInput(!showInput); // Toggle the input field
    };
    const handleInputChange = (event) => {
      setReason(event.target.value); // Update the reason state
    };
    return(
        <>
        <div className="midde_cont">
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                        <div className="row">
                          <div className="col-md-6">
                           <h2>Coating</h2> 
                          </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                           <h4>List</h4>
                           <div className=" d-flex justify-content-start mb-2">
                             <input type="text" placeholder="Search..."style={{padding: '4px',fontSize: '13px',borderRadius: '4px',border: '1px solid #ccc', width: '100%',maxWidth: '300px'}}></input>
                           </div>
                            <table className="table table-info table-bordered table-striped table-hover mt-5">
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
                                <tr>
                                    <td>1</td>
                                    <td>Ram sharma</td>
                                    <td>1234567890</td>
                                    <td>Business</td>
                                    <td>Swift Dzire</td>
                                    <td>Zxi</td>
                                    <td>White</td>
                                    <td>
                                        <button className="btn btn-warning ml-2" onClick={() => handleShow()}>Pending..</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Sham kumar</td>
                                    <td>0987654321</td>
                                    <td>Salaried</td>
                                    <td>Brezza</td>
                                    <td>Lxi</td>
                                    <td>Black</td>
                                    <td>
                                        <button className="btn btn-warning ml-2" onClick={() => handleShow()}>Pending..</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>



{/* Bootstrap Modal */}
{show && (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog" role="document" style={{ maxWidth: '500px', width: '80%', height: '300px' }}>
            <div className="modal-content" style={{ height: '100%' }}>
                <div className="modal-header">
                    <h4 className="modal-title">Ram Sharma</h4>
                    <button type="button" className="close" onClick={handleClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="modal-body text-center" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 120px)' }}>
                    {/* <p>{selectedStatus}</p> */}
                    {/* You can add more detailed content here */}
                    <p>Conform The Your Response</p>
                    <button className="btn btn-outline-success ml-2">Approve</button>
                    <button className="btn btn-outline-danger ml-2" onClick={handleRejectClick}>Reject</button>
                    {showInput && (
                        <div className="mt-2">
                            <textarea type="text" id="reasonInput" className="form-control" value={reason} onChange={handleInputChange} placeholder="Describe the reason" required></textarea>
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    </div>
)}
        </>
    )
}
export default Coating;