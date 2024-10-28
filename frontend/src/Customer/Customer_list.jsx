import React from "react";
import '../src_css/style.css';
import { NavLink } from "react-router-dom";

function Customer_list(){
    return(
        <>
        <div className="midde_cont">
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                        <div className="row">
                          <div className="col-md-6">
                           <h2>Customer</h2> 
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
                           <div className=" d-flex justify-content-end mb-2">
                              <NavLink to='/customer'><button className="btn text-white"style={{ backgroundColor: 'rgb(33, 65, 98)' }}>Add Customer</button></NavLink>
                           </div>
                            <table className="table table-info table-bordered table-striped table-hover">
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
                                        <NavLink to='/update_customer'><button className="btn btn-info mr-2">Edit</button></NavLink>
                                        <button className="btn btn-danger">Delete</button>
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
                                        <button className="btn btn-info mr-2">Edit</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}
export default Customer_list;