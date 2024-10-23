import React, { useState } from "react";
import { NavLink, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './src_css/style.css';
import Customer_list from "./Customer/Customer_list";
import Dashboard from "./Dashboard";
import Status from "./Status";
import Customer from "./Customer/Customer";
import User_management from "./User_management/User_management";
import Add_new_user from "./User_management/Add_new_user";
import Edit_user from "./User_management/Edit_user";
import Cashier from "./Forms/Cashier";
import Accessories from "./Forms/Accessories";
import Fainance from "./Forms/Fainance";
import Account from "./Forms/Account";
import Rto from "./Forms/Rto";
import Pdi from "./Forms/Pdi";
import Coating from "./Forms/Coating";
import LoginUser from "./Login/LoginUser";
import Cashier_login from "./Login/Cashier_login";
import Accessories_login from "./Login/Accessories_login";
import Finance_login from "./Login/Finance_login";
import Account_login from "./Login/Account_login";
import Rto_login from "./Login/Rto_login";
import Pdi_login from "./Login/Pdi_login";
import Coating_login from "./Login/Coating_login";

 
function Navbar() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   return (
      <Router>
         <div className="full_container">
            <div className="inner_container">
               {/* <!-- Sidebar  --> */}
               <nav id="sidebar">
                  <div className="sidebar_blog_1">
                     <div className="sidebar-header">
                        <div className="logo_section">
                           <a href=""><img className="logo_icon img-responsive" src="images/logo_icon1.png" alt="#" /></a>
                        </div>
                     </div>
                     <div className="sidebar_user_info">
                        <div className="icon_setting"></div>
                        <div className="user_profle_side">
                           <div className="user_img"><img className="img-responsive" src="images/logo_icon1.png" alt="#" /></div>
                           <div className="user_info">
                              <h6>Kankariya</h6>
                              <p><span className="online_animation"></span> Online</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="sidebar_blog_2">
                     <h4>General</h4>
                     <ul className="list-unstyled components">
                        <li><NavLink to='/'><i className="fa fa-dashboard yellow_color"></i> <span>Dashboard</span></NavLink></li>
                        <li><NavLink to='/status'><i className="fa-solid fa-person-circle-check"></i> <span>Status</span></NavLink></li>
                        <li><NavLink to='/customer'><i className="fa fa-user orange_color"></i> <span>Customer</span></NavLink></li>
                        <li><NavLink to='/customer_list'><i className="fa fa-users blue2_color"></i> <span>Customer List</span></NavLink></li>
                        <li><NavLink to="/user-management"><i className="fa fa-users orange_color"></i><span>User Management</span></NavLink></li>
                        <li><NavLink to="/cashier-list"><i className="fa fa-briefcase purple_color2"></i><span>Cashier</span></NavLink></li>
                        <li><NavLink to="/accessories-list"><i className="fa fa-wrench green_color"></i><span>Accessories</span></NavLink></li>
                        <li><NavLink to="/fainance-list"><i className="fa fa-star blue2_color"></i><span>FM</span></NavLink></li>
                        <li><NavLink to="/acm-list"><i className="fa fa-suitcase purple_color2"></i><span>ACM</span></NavLink></li>
                        <li><NavLink to="/rto-list"><i className="fa fa-line-chart red_color"></i><span>RTO</span></NavLink></li>
                        <li><NavLink to="/pdi-list"><i className="fa fa-cubes purple_color2"></i><span>PDI</span></NavLink></li>
                        <li><NavLink to="/coating-list"><i className="fa fa-pie-chart red_color"></i><span>Coating</span></NavLink></li>
                        <li><NavLink to="/log-in"><i className="fa fa-pie-chart red_color"></i><span>Log In Page</span></NavLink></li>
                     </ul>
                  </div>
               </nav>
               {/* <!-- end sidebar --> */}
               {/* <!-- right content --> */}
               <div id="content">
                  {/* <!-- topbar --> */}
                  <div className="topbar">
                     <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="full">
                           <button type="button" id="sidebarCollapse" className="sidebar_toggle"><i className="fa fa-bars"></i></button>
                           <div className="logo_section">
                              <a href=""><img className="img-responsive" src="images/logo1.png" alt="#" /></a>
                           </div>
                           <div className="right_topbar">
                              <div className="icon_info">
                                 <ul className="user_profile_dd">
                                    <li>
                                       <a className="dropdown-toggle" data-toggle="dropdown"><img className="img-responsive rounded-circle" src="images/logo_icon1.png" alt="#" /><span className="name_user">Kankariya</span></a>
                                       <div className="dropdown-menu">
                                          <a className="dropdown-item" href="">My Profile</a>
                                          <a className="dropdown-item" href="#"><span>Log Out</span> <i className="fa fa-sign-out"></i></a>
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </nav>
                  </div>
                  <Routes>
                     <Route path="/" element={<Dashboard />} />
                     <Route path="/status" element={<Status />} />
                     <Route path="/add-user" element={<Add_new_user />} />
                     <Route path="/edit-user" element={<Edit_user />} />
                     <Route path="/customer" element={<Customer />} />
                     <Route path="/customer_list" element={<Customer_list />} />
                     <Route path="/user-management"  element={isLoggedIn ? <User_management /> : <LoginUser onLogin={setIsLoggedIn} />} />
                     <Route path="/cashier-list" element={<Cashier/>}/>
                     <Route path="/accessories-list" element={<Accessories/>}/>
                     <Route path="/fainance-list" element={<Fainance/>}/>
                     <Route path="/acm-list" element={<Account/>}/>
                     <Route path="/rto-list" element={<Rto/>}/>
                     <Route path="/pdi-list" element={<Pdi/>}/>
                     <Route path="/coating-list" element={<Coating/>}/>
                     <Route path="/log-in" element={<Coating_login/>}/>
                  </Routes>
               </div>
            </div>
         </div>
      </Router>
   )
}

export default Navbar;