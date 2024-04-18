import React, { useState, useEffect } from 'react';
import './cars.css';
import Sidebar from '../Sidebar/sidebar';

const Cars = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [updatedCar, setUpdatedCar] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/dashboard/cars/${user.googleId}`)
      .then(response => response.json())
      .then(data => {
        setCars(data);
      })
      .catch(error => console.error(error));
  }, [user.googleId]);

  const handleInputChange = (event) => {
    setUpdatedCar({ ...updatedCar, [event.target.name]: event.target.value });
  }

  const handleUpdate = () => {
    fetch(`http://localhost:5000/dashboard/cars/${editingCar._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCar),
    })
    .then(response => response.json())
    .then(data => {
      setCars(cars.map(car => car._id === data._id ? data : car));
      setEditingCar(null);
      setUpdatedCar({});
      alert(`Car updated successfully! (Car ${data.carRegiNr})`)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleDelete = (car) => {
    fetch(`http://localhost:5000/dashboard/cars/${car._id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then((data) => {
      setCars(cars.filter(c => c._id !== car._id));
      alert(`Car deleted successfully! (Car ${data.carRegiNr})`)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  return (
    <>
      <Sidebar user={user} />
      <div className="bigbox">
        <h1>YOUR CARS</h1>
        <table className="users-table">
          <thead>
            <tr>
              <th>Car Number</th>
              <th>Registration Number</th>
              <th>Brand and Model</th>
              <th>Year</th>
              <th>HP</th>
              <th>VIN</th>
              <th>CIV</th>
              <th>Telephone</th>
              <th>Description</th>
              <th>Status</th>
              <th>Inspection Description</th>
              <th>Appointment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (cars.map((car, index) => (
              <tr key={car._id}>
                {editingCar === car ? (
                  <>
                    <td>{index + 1}</td>
                    <td><input className="car_modify_input" type="text" name="carRegiNr" defaultValue={car.carRegiNr} onChange={handleInputChange} /></td>
                    <td>
                      <div style={{display: "flex"}}>
                        <input className="car_modify_input" type="text" name="carBrand" defaultValue={car.carBrand} onChange={handleInputChange} />
                        <input className="car_modify_input" type="text" name="carModel" defaultValue={car.carModel} onChange={handleInputChange} />
                      </div>
                    </td>  
                    <td><input className="car_modify_input" type="text" name="carYear" defaultValue={car.carYear} onChange={handleInputChange} /></td>
                    <td><input className="car_modify_input" type="text" name="carHP" defaultValue={car.carHP} onChange={handleInputChange} /></td>
                    <td><input className="car_modify_input" type="text" name="carVIN" defaultValue={car.carVIN} onChange={handleInputChange} /></td>
                    <td><input className="car_modify_input" type="text" name="carCIV" defaultValue={car.carCIV} onChange={handleInputChange} /></td>
                    <td><input className="car_modify_input" type="text" name="telephone" defaultValue={car.telephone} onChange={handleInputChange} /></td>
                    <td><input className="car_modify_input" type="text" name="description" defaultValue={car.description} onChange={handleInputChange} /></td>
                    <td><input className="car_modify_input" type="text" name="status" defaultValue={car.status} disabled /></td>
                    <td><input className="car_modify_input" type="text" name="descriptionInspecton" defaultValue={car.inspectionDescription} disabled /></td>
                    <td><input className="car_modify_input" type="text" name="appointment" defaultValue={car.appointmentDateTime} disabled /></td>
                    <td><button className="car_modify_input" type="button" onClick={handleUpdate}>Save</button></td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>{car.carRegiNr}</td>
                    <td>{car.carBrand} {car.carModel}</td>
                    <td>{car.carYear}</td>
                    <td>{car.carHP} hp</td>
                    <td>{car.carVIN}</td>
                    <td>{car.carCIV}</td>
                    <td>{car.telephone}</td>
                    <td>{car.description}</td>
                    <td>{car.status === 'TBApproved' ? 'To Be Approved' : (car.status)}</td>
                    <td>
                      {car.status === 'Declined' ? 'The vehicle has been declined.' : 
                      (car.inspectionDescription ? car.inspectionDescription : 'The mechanic has not yet approved the appointment.')}
                    </td>
                    <td>{car.appointmentDateTime}</td>
                    <td className="user-controls">
                      <button className="car_modify_input" type="button" onClick={() => setEditingCar(car)} disabled={car.status !== 'TBApproved'}>Edit</button>
                      <button className="car_modify_input" type="button" onClick={() => handleDelete(car)} disabled={car.status !== 'TBApproved'}>Delete</button>
                    </td>
      
                  </>
                )}
              </tr>
            ))) : (
              <tr>
                <td colSpan={13}>You don't have any cars in the service, make an appointment to have one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Cars;