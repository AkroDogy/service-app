import Sidebar from '../Sidebar/sidebar';
import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = ({ user }) => {
  const [inServiceCars, setInServiceCars] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/dashboard/cars/${user.googleId}`)
      .then(response => response.json())
      .then(data => {
        setInServiceCars(data.filter(car => car.status === 'In Service').length);
      })
      .catch(error => console.error(error));
  }, [user.googleId]);

  return (
    <>
    <Sidebar user={user} />
    <div className="bigbox">
      <h1>OVERVIEW</h1>
      {user && (
          user.rank === 'Client' ? <p>You are a client</p> :
          user.rank === 'Admin' ? <p>You are an admin</p> :
          user.rank === 'Mecanic' ? <p>You are a mechanic</p> :
          <p>Unknown rank</p>
        )}
      <p>
        Select your option from the sidebar. Your cars will be displayed in 'Your cars'.
      </p>
      <p>
        If you don't have any cars, you can add them by clicking on 'Appointment'.
      </p>
      <p>
        You can see the status at your cars in 'Your cars'.
      </p>
      <p>
        You have {inServiceCars} car(s) with the status 'In Service'.
      </p>
    </div>
    </>
  );
};

export default Dashboard;