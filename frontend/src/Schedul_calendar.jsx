import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Schedul_calendar() {
    const [show, setShow] = useState(false);
    const [events, setEvents] = useState([
        {
            title: 'VIVEK U |  MARUTI Swift ZDI SUPERIOR WHITE',
            start: new Date(2024, 9, 30, 10, 0), // Oct 27, 2024 10:00 AM
            end: new Date(2024, 9, 30, 10, 30),  // Oct 27, 2024 10:30 AM
        },
    ]);

    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

    const handleSelectSlot = ({ start, end }) => {
        setNewEvent({ ...newEvent, start, end }); // Set selected start and end dates
        setShow(true); // Show the modal when a slot is selected
    };

    const handleAddEvent = () => {
        setEvents([...events, { ...newEvent, title: `New Event: ${newEvent.title}` }]);
        setShow(false); // Hide the modal after adding an event
    };

    const handleEventInputChange = (e) => {
        setNewEvent({ ...newEvent, title: e.target.value });
    };

    const handleClose = () => {
        setShow(false); // Hide the modal
    };

    return (
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
                                        <i className="fas fa-location-dot" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}></i>
                                        <input type="text" id="location" name="location" value="savedi,Ahmednagar" readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="page_title">
                                <div className="row">
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th>Customer Details</th>
                                                <th>Customer Address</th>
                                                <th>Vehical Details</th>
                                                <th>VIN Number</th>
                                                <th>Executive Details</th>
                                                <th>Request Delivery Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Vivek U</td>
                                                <td>Pune</td>
                                                <td>Swift</td>
                                                <td>MA3EUA61S</td>
                                                <td>Monali</td>
                                                <td>30-09-2024</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: '100vh' }} className="full">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    defaultView="month"
                    style={{ height: 500 }}
                />
            </div>

            {/* Bootstrap Modal */}
            {show && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" id="eventModal" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document" style={{ maxWidth: '800px', width: '80%', height: '500px' }}>
                        <div className="modal-content" style={{ height: '100%' }}>
                            <div className="modal-header">
                                <h4 className="modal-title">Delivery Status</h4>
                                <button type="button" className="close" onClick={handleClose}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 120px)' }}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Delivery Details</label>
                                        <input type="text" className="form-control" value={newEvent.title} onChange={handleEventInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Assigned To</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label>Delivery Date</label>
                                        <input type="date" className="form-control" value={newEvent.start ? moment(newEvent.start).format('YYYY-MM-DD') : ''} onChange={(e) =>setNewEvent({ ...newEvent, start: new Date(e.target.value) })} />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label>Delivery Time</label>
                                        <input type="time" className="form-control" />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label>Place Of Delivery</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ backgroundColor: 'rgb(33, 65, 98)' }}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleAddEvent}>
                                    Save Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Schedul_calendar;
