import React, { useState } from "react";
import '../src_css/style.css';
import { NavLink } from "react-router-dom";


function Accessories_login(){
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
        <div className="full_container">
            <div className="container">
                <div className="center verticle_center full_height">
                    <div className="login_section">
                        <div className="logo_login" style={{ backgroundImage: "url('../images/layout_img/login_image.jpg')" }}>
                            <div className="center">
                                <img width="210" src="images/logo1.png" alt="Logo" />
                            </div>
                        </div>
                        <h4 className="mt-4 text-center">Accessories Manager Log In</h4>
                        <div className="login_form">
                            <form>
                                <fieldset>
                                    <div className="field">
                                        <label className="label_field">Role</label>
                                        <input type="text" defaultValue="Accessories Manager" required readOnly />
                                    </div>
                                    <div className="field">
                                        <label className="label_field">Email / Mobile</label>
                                        <input type="text" required />
                                    </div>
                                    <div className="field">
                                        <label className="label_field">Password</label>
                                        <input type="password"required/>
                                    </div>
                                    { <p style={{ color: 'red' }}></p>}
                                    <div className="field">
                                        <label className="form-check-label">
                                            <input type="checkbox" className="form-check-input" /> Remember Me
                                        </label>
                                        <NavLink onClick={() => handleShow()} className="forgot">Forgotten Password?</NavLink>
                                    </div>
                                    <div className="field margin_0">
                                        <button type="submit" className="main_bt">Sign In</button>
                                    </div>
                                </fieldset>
                            </form>
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
                    <button type="button" className="close" onClick={handleClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 120px)' }}>
                    <h4 className="modal-title text-center">Pls Contact The Your HR</h4>
                    <h1 className="text-center">
                        <i className="fa-sharp-duotone fa-solid fa-user-ninja red_color"></i>
                    </h1>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    </div>
)}        
        </>
    )
}
export default Accessories_login;