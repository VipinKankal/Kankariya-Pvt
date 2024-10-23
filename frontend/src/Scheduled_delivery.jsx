import React,{ useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Scheduled_delivery(){
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
                              <h2>Scheduled Deliveries</h2>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end">
                              <i class="fas fa-location-dot" style={{position:'absolute',right:'200px',top:'50%',transform:'translateY(-50%)',fontsize:'18px'}}></i>
                              <input type="text" id="location" name="location" value={locationName} readOnly></input>
                            </div>
                          </div>
                        </div>
                        <div className="page_title">
                          <div className="row">
                            <div className="col-md-6 mb-2">
                                <div className="row">
                                    <div className="col-md-6">
                                    <lable>Date :-</lable>
                                    <input type="date" className="form-control"/>
                                    </div>
                                    <div className="col-md-6">
                                      <lable>Executive Name</lable>
                                      <select className="form-control">
                                        <option>All</option>
                                        <option>Monali</option>
                                      </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end mt-3">
                                <button className="btn text-white" style={{ backgroundColor: 'rgb(33, 65, 98)', height:'35px' }}>
                                    <i className="fa-solid fa-magnifying-glass"></i> Search
                                </button>
                            </div>
                            <table className="table mt-5">
                                <thead>
                                    <tr style={{fontWeight:'bold'}}>
                                        <th ></th>
                                        <th >Booking Number</th>
                                        <th>Customer Details</th>
                                        <th>Place Of Delivery</th>
                                        <th>Vehicle Details</th>
                                        <th>VIN Number</th>
                                        <th>Executive Details</th>
                                        <th>Delivery Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="radio" name='click'/>
                                        </td>
                                        <td>SOB18001944</td>
                                        <td>Vivek 9962626262</td>
                                        <td>Showroom</td>
                                        <td>Swift</td>
                                        <td>MA3EUA6</td>
                                        <td>Monali 12345678</td>
                                        <td>30-09-2024</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="col-md-6 mt-5"></div>
                                <div className="col-md-6 mt-5">
                                    <div className="row">
                                        <div className="col-md-3">
                                           <NavLink to='/schedul-calendar'><button className="btn text-white" style={{ backgroundColor: 'rgb(33, 65, 98)', height:'35px' }}>
                                             Reschedule
                                           </button></NavLink> 
                                        </div>
                                        <div className="col-md-3">
                                          <button className="btn text-white"  style={{ backgroundColor: 'rgb(33, 65, 98)', height:'35px' }}>
                                             Send Reminder
                                          </button>
                                        </div>
                                        <div className="col-md-3 ml-4">
                                          <button className="btn text-white" style={{ backgroundColor: 'rgb(33, 65, 98)', height:'35px' }}>
                                             Submit Report
                                          </button>
                                        </div>
                                    </div>
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
export default Scheduled_delivery;