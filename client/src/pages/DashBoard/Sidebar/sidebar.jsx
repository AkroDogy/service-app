// Sidebar.jsx
import React from 'react';

const Sidebar = ({ user }) => (
  <div className="box">
    <div className="minibox">
      <a href={`/dashboard/${user.googleId}`}>OVERVIEW</a>
      <a href={`/dashboard/appointment/${user.googleId}`}>APPOINTMENT</a>
      <a href={`/dashboard/cars/${user.googleId}`}>YOUR CARS</a>
    </div>
    <div className="minibox_2">
      {user && (
        user.rank === 'Client' ? (
          <>
          </>
        ) :
        user.rank === 'Admin' ? (
          <>
          <a href={`/dashboard/admin/users`}>ADMIN PANEL</a>
          <a href={`/dashboard/mechanic/${user.googleId}`}>MECHANIC PANEL</a>
          <a href="/archive">ARCHIVE</a>
          </>
        ) :
        user.rank === 'Mecanic' ? (
          <>
          <a href={`/dashboard/mechanic/${user.googleId}`}>MECHANIC PANEL</a>
          <a href={`/dashboard/tbacars/${user.googleId}`}>TB APPROVED CARS</a>
          <a href={`/dashboard/inspected/${user.googleId}`}>INSPECTED CARS</a>
          <a href={`/dashboard/in_service/${user.googleId}`}>IN SERVCICE CARS</a>
          <a href="/archive">ARCHIVE</a>
          </>
        ) :
        <p>Error</p>
      )}
    </div>
  </div>
);

export default Sidebar;