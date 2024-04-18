import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/sidebar';

const Mechanic = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/dashboard/mechanic`)
      .then(response => response.json())
      .then(data => setCars(data));
  }, []);

  const handleStatusChange = (carId, newStatus) => {
    setSelectedStatus(prevStatus => ({ ...prevStatus, [carId]: newStatus }));
  };

  const saveStatus = (carId) => {
    const newStatus = selectedStatus[carId];
    fetch(`http://localhost:5000/dashboard/mechanic/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
    .then(response => response.json())
    .then(data => {
      setCars(cars.map(car => car._id === carId ? {...car, status: newStatus} : car));
      alert('Status updated to ' + newStatus + '!');
    });
  };

  return (
      <>
        <Sidebar user={user} />
        <div className="bigbox">
          <h1>Cars data</h1>
          <table className="users-table">
            <thead>
              <tr>
                <th>Registration Number</th>
                <th>Brand and Model</th>
                <th>Year</th>
                <th>HP</th>
                <th>VIN</th>
                <th>CIV</th>
                <th>Telephone</th>
                <th>Description</th>
                <th>Status</th>
                <th>Appointment Date (Y-M-D:H-M)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car._id}>
                  <td>{car.carRegiNr}</td>
                  <td>{car.carBrand} {car.carModel}</td>
                  <td>{car.carYear}</td>
                  <td>{car.carHP}</td>
                  <td>{car.carVIN}</td>
                  <td>{car.carCIV}</td>
                  <td>{car.telephone}</td>
                  <td>{car.description}</td>
                  <td>{car.status}</td>
                  <td>{car.appointmentDateTime}</td>
                  <td>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <select className="car_modify_input" value={selectedStatus[car._id] || car.status} onChange={(e) => handleStatusChange(car._id, e.target.value)}>
                      <option value="TBApproved">To Be Approved</option>
                      <option value="Approved">Approved</option>
                      <option value="Declined">Declined</option>
                      <option value="In Service">In Service</option>
                      <option value="Done">Done</option>
                    </select>
                      <button className="car_modify_input" onClick={() => saveStatus(car._id)}>Save</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
export default Mechanic;