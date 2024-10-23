import React, { useState, useEffect } from "react";
import './src_css/style.css';
import axios from "axios";



function Dashboard(){
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
    return(
        <>
        <div className="midde_cont">
          <div className="container-fluid">
            <div className="row column_title">
              <div className="col-md-12">
                <div className="page_title">
                  <div className="row">
                    <div className="col-md-6">
                      <h2>Dashboard</h2> 
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                      <i class="fas fa-location-dot" style={{position:'absolute',right:'200px',top:'50%',transform:'translateY(-50%)',fontsize:'18px'}}></i>
                      <input type="text" id="location" name="location" value={locationName} readOnly></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page_title">
                  <div className="row">
                      <div class="col-md-6 col-lg-3">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-info">
                            <h1 className="text-white">RFC Not Initiated</h1>
                            <p className="text-white">For Deliveries in next 7 days</p>
                          </div>
                          <div class="social_cont">
                            <h4 style={{fontSize:"30px"}} className="text-info">54</h4>
                            <h5 className="text-info">RFC Not Initiated</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-9">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-success">
                            <h1 className="text-white">RFC Pending</h1>
                            <p className="text-white">For Deliveries in next 7 days</p>
                          </div>
                          <div class="social_cont">
                          <div className="row no-gutters justify-content-center">
                              <div className="col-md-2 border border-secondary p-2 mx-3">
                                 <h4 style={{fontSize:"30px"}} className="text-success">06</h4>
                                 <h5 className="text-success">FM Approval</h5>
                              </div>
                              <div className="col-md-2 border border-success p-2 mx-3">
                                 <h4 style={{fontSize:"30px"}} className="text-success">13</h4>
                                 <h5 className="text-success">TVM Approval</h5>
                              </div>
                              <div className="col-md-2 border border-success p-2 mx-3">
                                 <h4 style={{fontSize:"30px"}} className="text-success">08</h4>
                                 <h5 className="text-success">ACM Approval</h5>
                              </div>
                              <div className="col-md-2 border border-success p-2 mx-3">
                                 <h4 style={{fontSize:"30px"}} className="text-success">07</h4>
                                 <h5 className="text-success">SM Approval</h5>
                              </div>
                              <div className="col-md-2 border border-success p-2 mx-3">
                                 <h4 style={{fontSize:"30px"}} className="text-success">04</h4>
                                 <h5 className="text-success">SM Approved</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-3">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-warning">
                            <h1 className="text-white">Pending DMS Allotment</h1>
                            <p className="text-white"></p>
                          </div>
                          <div class="social_cont">
                            <h4 style={{fontSize:"30px"}} className="text-warning">12</h4>
                            <h5 className="text-warning">Allotment Manager</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-4">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-danger">
                            <h1 className="text-white">Deliveries to Schedule</h1>
                            <p className="text-white"></p>
                          </div>
                          <div class="social_cont">
                            <div className="row no-gutters justify-content-center">
                              <div className="col-md-5 border border-danger p-2 mx-3" style={{  }}>
                                 <h4 style={{fontSize:"30px"}} className="text-danger">00</h4>
                                 <h5 className="text-danger">Primery Checklist Pending</h5>
                              </div>
                              <div className="col-md-5 border border-danger p-2 mx-3">
                                 <h4 style={{fontSize:"30px"}} className="text-danger">07</h4>
                                 <h5 className="text-danger">Schedule</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-5">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-secondary">
                            <h1 className="text-white">Scheduled Deliveries</h1>
                            <p className="text-white"></p>
                          </div>
                          <div class="social_cont">
                            <div className="row no-gutters justify-content-center">
                              <div className="col-md-3 border border-secondary p-2 mx-3">
                                 <h4 style={{fontSize:"30px"}} className="text-secondary">22</h4>
                                 <h5 className="text-secondary">Total Delivery</h5>
                              </div>
                              <div className="col-md-3 border border-secondary p-2 mx-3">
                                 <h4 style={{fontSize:"30px"}} className="text-secondary">10</h4>
                                 <h5 className="text-secondary">Preparation Pending</h5>
                              </div>
                              <div className="col-md-3 border border-secondary p-2 mx-3">
                                 <h4 style={{fontSize:"30px"}} className="text-secondary">12</h4>
                                 <h5 className="text-secondary">Preparation Submitted</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-3">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-primary">
                            <h1 className="text-white">Delivery Checklist</h1>
                            <p className="text-white">Deliveries </p>
                          </div>
                          <div class="social_cont">
                            <h4 style={{fontSize:"30px"}} className="text-primary">17</h4>
                            <h5 className="text-primary">Pending</h5>
                          </div>
                        </div>
                      </div>
                    <div className="col-md-6 d-flex justify-content-end">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
       
    


    
        
        </>
    )
}
export default Dashboard;