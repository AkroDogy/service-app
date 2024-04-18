import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/sidebar';

const Inspected = ({ user }) => {
    const [cars, setCars] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [inspectionDescription, setInspectionDescription] = useState({});
  
    useEffect(() => {
      fetch(`http://localhost:5000/dashboard/mechanic`)
        .then(response => response.json())
        .then(data => setCars(data));
    }, []);
  
    const handleStatusChange = (carId, newStatus) => {
      setSelectedStatus(prevStatus => ({ ...prevStatus, [carId]: newStatus }));
    };
  
    const handleDescriptionChange = (carId, newDescription) => {
      setInspectionDescription(prevDesc => ({ ...prevDesc, [carId]: newDescription }));
    };
  
    const addToService = (carId) => {
      handleStatusChange(carId, 'In Service');
    };
  
    const saveStatus = (carId) => {
      const newStatus = selectedStatus[carId];
      const newDescription = inspectionDescription[carId];
      fetch(`http://localhost:5000/dashboard/mechanic/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, inspectionDescription: newDescription }),
      })
      .then(response => response.json())
      .then(data => {
        setCars(cars.map(car => car._id === carId ? {...car, status: newStatus, inspectionDescription: newDescription} : car));
        alert('Status updated to ' + newStatus + '!');
      });
    };
  

  return (
      <>
        <Sidebar user={user} />
        <div className="bigbox">
          <h1>Inspected Cars</h1>
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
                {cars.filter(car => car.status === 'Approved').map(car => (
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
                  <div>
                    {selectedStatus[car._id] !== 'In Service' && (
                    <button className="car_modify_input" onClick={() => addToService(car._id)}>Add to service</button>
                    )}
                    {selectedStatus[car._id] === 'In Service' && (
                    <div>
                        <input
                        type="text"
                        value={inspectionDescription[car._id] || ''}
                        onChange={(e) => handleDescriptionChange(car._id, e.target.value)}
                        placeholder="Enter inspection description"
                        />
                        <button className="car_modify_input" onClick={() => saveStatus(car._id)}>Save</button>
                    </div>
                    )}
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
export default Inspected;