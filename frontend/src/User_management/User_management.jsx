import React,{ useState, useEffect } from "react";
import axios from "axios";
import '../src_css/style.css';
import { NavLink } from "react-router-dom";



function User_management(){
    //modal
    const [show, setShow] = useState(false);
    const handleShow = (status) => {
        setShow(true); // Show the modal
    };
    const handleClose = () => {
        setShow(false); // Hide the modal
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
                                    <h2>User Management</h2>
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
                               <NavLink onClick={() => handleShow()}><button className="btn text-white mr-2"style={{ backgroundColor: 'rgb(33, 65, 98)' }}><i class="fa-sharp fa-solid fa-envelope"></i> Dealership CEO Email</button></NavLink>
                               <NavLink to='/add-user'><button className="btn text-white"style={{ backgroundColor: 'rgb(33, 65, 98)' }}><i class="fa-solid fa-plus"></i> Add New User</button></NavLink>
                           </div>
                            <table className="table table-info table-bordered table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Dealer EmpId</th>
                                    <th>Email</th>
                                    <th>Roles</th>
                                    <th>Active</th>
                                    <th>Start Date</th>
                                    <th>Last Working Date</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Aashish Kumar Mishra</td>
                                    <td>9911223344</td>
                                    <td>782</td>
                                    <td>aashish@gmail.com</td>
                                    <td>ACM,FM,TVM</td>
                                    <td className="text-success">Active</td>
                                    <td>20-09-2024</td>
                                    <td></td>
                                    <td>
                                        <NavLink to='/edit-user'><button className="btn btn-info">Edit</button></NavLink>
                                        <button className="btn btn-danger ml-2">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ram Missal</td>
                                    <td>0987654321</td>
                                    <td>1111</td>
                                    <td>Ram@gmail.com</td>
                                    <td>ACM,FM,TVM</td>
                                    <td className="text-danger">Inactive</td>
                                    <td>20-09-2024</td>
                                    <td>11-11-2024</td>
                                    <td>
                                        <NavLink to='/edit-user'><button className="btn btn-info">Edit</button></NavLink>
                                        <button className="btn btn-danger ml-2">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Akshay Mishra</td>
                                    <td>0987654321</td>
                                    <td>2345</td>
                                    <td>akshay@gmail.com</td>
                                    <td>ACM,FM,TVM</td>
                                    <td className="text-success">Active</td>
                                    <td>20-09-2024</td>
                                    <td></td>
                                    <td>
                                        <NavLink to='/edit-user'><button className="btn btn-info">Edit</button></NavLink>
                                        <button className="btn btn-danger ml-2">Delete</button>
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
        <div className="modal-dialog" role="document" style={{ maxWidth: '500px', width: '80%', height: '250px' }}>
            <div className="modal-content" style={{ height: '100%' }}>
                <div className="modal-header">
                    <h4 className="modal-title">Dealership CEO Email</h4>
                    <button type="button" className="close" onClick={handleClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 120px)' }}>
                    {/* <p>{selectedStatus}</p> */}
                    {/* You can add more detailed content here */}
                    <p>File Email ID in format "example@gmail.com"</p>
                    <input type="mail" className="form-control" placeholder="@gmail.com"></input>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
                        Close
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
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
export default User_management;