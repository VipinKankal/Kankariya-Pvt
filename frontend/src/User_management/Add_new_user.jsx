import React ,{ useState, useEffect } from "react";
import '../src_css/style.css';
import axios from "axios";
import { NavLink } from "react-router-dom";


function Add_new_user(){
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
                                       <label>Employee ID :</label>
                                       <input type="text" name="employee_id" class="form-control" required></input>
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
                                       <label>Employee City :</label>
                                       <input type="text" name="employee_city" class="form-control" required></input>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Role :</label>
                                       <select type="text" name="model" class="form-control" required>
                                          <option>Select...</option>
                                          <option>Accessories Manager</option>
                                          <option>Account Manager</option>
                                          <option>Cashier</option>
                                          <option>Finance Manager</option>
                                          <option>PDI Manager</option>
                                          <option>RTO Manager</option>
                                          <option>Coating Manager</option>
                                       </select>
                                    </div>
                                    <div className="mt-4 col-md-4">
                                       <label>Start Date:</label>
                                       <input type="date" name="start_date" class="form-control" required></input>
                                    </div>
                                    <div className="mt-4 col-md-6">
                                       <label>Password:</label>
                                       <input type="text" name="password" class="form-control" required></input>
                                    </div>
                                    <div className="mt-4 col-md-6">
                                       <label>Confirm Password:</label>
                                       <input type="text" name="confirm_password" class="form-control" required></input>
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