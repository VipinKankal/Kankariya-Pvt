import React, { useState, useEffect } from "react";
import './src_css/style.css';
import axios from "axios";



function Dashboard(){
 
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
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page_title">
                  <div className="row">
                      <div class="col-md-6 col-lg-4">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-info">
                            <h1 className="text-white">Cashier</h1>
                            <p className="text-white">Not Initiated</p>
                          </div>
                          <div class="social_cont">
                            <h4 style={{fontSize:"30px"}} className="text-info">54</h4>
                            <h5 className="text-info">Pending</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-4">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-success">
                            <h1 className="text-white">Accessories</h1>
                            <p className="text-white">Not Initiated</p>
                          </div>
                          <div class="social_cont">
                              <h4 style={{fontSize:"30px"}} className="text-success">00</h4>
                              <h5 className="text-success">Pending</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-4">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon "style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
                            <h1 className="text-white">FM</h1>
                            <p className="text-white">Not Initiated</p>
                          </div>
                          <div class="social_cont">
                              <h4 style={{fontSize:"30px"}} className="text-success">19</h4>
                              <h5 className="text-success">Pending</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-4">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-warning">
                            <h1 className="text-white">ACM</h1>
                            <p className="text-white">Not Initiated</p>
                          </div>
                          <div class="social_cont">
                              <h4 style={{fontSize:"30px"}} className="text-warning">15</h4>
                              <h5 className="text-warning">Pending</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-4">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-danger">
                            <h1 className="text-white">RTO</h1>
                            <p className="text-white">Not Initiated</p>
                          </div>
                          <div class="social_cont">
                              <h4 style={{fontSize:"30px"}} className="text-danger">05</h4>
                              <h5 className="text-danger">Pending</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-4">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-secondary">
                            <h1 className="text-white">PDI</h1>
                            <p className="text-white">Not Initiated</p>
                          </div>
                          <div class="social_cont">
                              <h4 style={{fontSize:"30px"}} className="text-secondary">14</h4>
                              <h5 className="text-secondary">Pending</h5>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-4">
                        <div class="full socile_icons fb margin_bottom_30">
                          <div class="social_icon bg-primary">
                            <h1 className="text-white">Coating</h1>
                            <p className="text-white">Not Initiated</p>
                          </div>
                          <div class="social_cont">
                              <h4 style={{fontSize:"30px"}} className="text-primary">10</h4>
                              <h5 className="text-primary">Pending</h5>
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
export default Dashboard;