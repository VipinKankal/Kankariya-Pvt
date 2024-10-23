import React, { useState } from "react";

function Status(){
    // Define state for toggling the status bar
  const [showStatus, setShowStatus] = useState(false);
  // Function to handle the "Check" button click
  const handleCheckClick = () => {
    setShowStatus((prevStatus) => !prevStatus); // Toggle status bar visibility
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
                      <h2>Status</h2> 
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page_title">
                    <h4>Check...</h4>
                    <div className=" d-flex justify-content-start mb-2">
                        <input type="text" placeholder="Search..."style={{padding: '4px',fontSize: '13px',borderRadius: '4px',border: '1px solid #ccc', width: '100%',maxWidth: '300px'}}></input>
                    </div>
                    <table className="table table-info table-bordered table-striped table-hover">
                        <thead>
                            <tr>
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
                                <td>Ram sharma</td>
                                <td>1234567890</td>
                                <td>Business</td>
                                <td>Swift Dzire</td>
                                <td>Zxi</td>
                                <td>White</td>
                                <td>
                                    <button className="btn btn-info mr-2" style={{ backgroundColor: 'rgb(33, 65, 98)' }}onClick={handleCheckClick}>Check</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Conditionally render the status bar */}
                    {showStatus && (
                        <div className="status-bar mt-5 p-3" style={{ border: '1px solid #ccc' }}>
                            <h4>Status for Ram Sharma</h4>
                            <p>Booking Confirmed. Delivery scheduled for 12th November 2024.</p>
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-4"></div>
                                <div className="col-md-4"></div>
                            </div>
                        </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
export default Status;