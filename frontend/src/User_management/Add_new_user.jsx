import React ,{ useState, useEffect } from "react";
import '../src_css/style.css';
import axios from "axios";
import { NavLink } from "react-router-dom";


function Add_new_user(){
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
                                <div className="col-md-">
                                   <NavLink to='/user-management'><button className="btn text-white"style={{ backgroundColor: 'rgb(33, 65, 98)',height:'30px',width:'40px' }}><i class="fa-sharp fa-solid fa-arrow-left"></i></button></NavLink>
                                </div>
                                <div className="col-md-2 mt-1">
                                    <h2>Add User</h2>
                                </div>
                                <div className="col-md-9 d-flex justify-content-end">
                                    <i class="fas fa-location-dot" style={{position:'absolute',right:'200px',top:'50%',transform:'translateY(-50%)',fontsize:'18px'}}></i>
                                    <input type="text" id="location" name="location" value={locationName} readOnly></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <from action="" method="POST">
                                <div className="row">
                                    <div className="mt-2 col-md-4">
                                       <label>First Name :</label>
                                       <input type="text" name="f_name" class="form-control" required></input>
                                    </div>
                                    <div className="mt-2 col-md-4">
                                       <label>Middle Name :</label>
                                       <input type="text" name="m_name" class="form-control" required></input>
                                    </div>
                                    <div className="mt-2 col-md-4">
                                       <label>Last Name :</label>
                                       <input type="text" name="l_name" class="form-control" required></input>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Dealer Employee ID :</label>
                                       <input type="text" name="d_employee_id" class="form-control" required></input>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Mobile :</label>
                                       <input type="number" name="mobile" class="form-control" required></input>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Email :</label>
                                       <input type="email" name="email" class="form-control" required></input>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Dealer Code :</label>
                                       <input type="text" name="dealer_code" class="form-control" value="1908" required></input>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Dealer Name :</label>
                                       <input type="text" name="dealer_name" class="form-control" value="Choughule PVT.LTD" required></input>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Dealer City :</label>
                                       <input type="text" name="dealer_city" class="form-control" value="Pune" required></input>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Role :</label>
                                       <select type="text" name="model" class="form-control" required>
                                          <option>Select...</option>
                                          <option>Finance Manager</option>
                                          <option>RTO Manager</option>
                                          <option>Insurance Manager</option>
                                       </select>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Start Date:</label>
                                       <input type="date" name="start_date" class="form-control" value="Pune" required></input>
                                    </div>
                                    <div class="col-md-12 text-center mt-5">
                                        <div className="row">
                                            <div className="col-md-6 d-flex justify-content-end">
                                              <NavLink to='/user-management'><button class="btn btn-outline-primary">Cancel</button></NavLink>
                                            </div>
                                            <div className="col-md-6 d-flex justify-content-start">
                                                <button class="btn text-white" style={{backgroundColor:'rgb(33, 65, 98)'}}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </from>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Add_new_user;