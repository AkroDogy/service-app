import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  const handlebutton = () => {
    navigate(`/dashboard/${user?.googleId}`);
  };

  return (
    <div className="container">
      <div className="content">
        <h1>GAB AUTO SERVICE</h1>
        <p>Repair your cars at us!</p>
        <button onClick={handlebutton}>Book Us</button>
      </div>
    </div>
  )
}

export default Home