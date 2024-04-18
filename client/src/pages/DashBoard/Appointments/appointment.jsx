import React, { useState } from 'react';
import axios from 'axios';
import '../Main/dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import './appointment.css';
import Sidebar from '../Sidebar/sidebar';

const Appointment = ({ user }) => {
  const [data, setData] = useState({
    fullName: "",
    telephone: "+40",
    email: "",
    description: "",
    carModel: "",
    carBrand: "",
    carYear: "",
    carType: "",
    carCapacity: "",
    carHP: "",
    carKW: "",
    carWeight: "",
    carCIV: "",
    carVIN: "",
    carTraction: "",
    carRegiNr: ""
  });
  
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handlePhone = (event) => {
    const { value } = event.target;
    if (value.length < 3) {
      setData(prevData => ({ ...prevData, telephone: '+40' }));
      return;}
    if (!value.startsWith('+40')) {return;}
    if (value.length > 12) {return;}
    if (!/^(\+40)\d*$/.test(value)) {return;}
    setData(prevData => ({ ...prevData, telephone: value }));
  };

  const handleKWChange = (event) => {
    const kw = event.target.value;
    const hp = Math.round(kw * 1.34102);
    setData(prevData => ({ ...prevData, carKW: kw, carHP: hp.toString() }));
  };
  
  const handleHPChange = (event) => {
    const hp = event.target.value;
    const kw = Math.round(hp / 1.34102);
    setData(prevData => ({ ...prevData, carHP: hp, carKW: kw.toString() }));
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue))
      event.preventDefault();
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:5000/dashboard/appointment";
      const dateTime = `${data.appointmentDate}-${data.appointmentTime}`;
      const dataWithDateTime = { ...data, appointmentDateTime: dateTime };
      const dataWithUserEmail = { ...dataWithDateTime, email: user?.email };
      const {data: res} = await axios.post(url, JSON.stringify(dataWithUserEmail), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.message);
      }
    }
    alert('Datele au fost trimise.');
    navigate(`/dashboard/${user?.googleId}`);
  };
  function getMinDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
  
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
    return date;
  }
  function generateTimeOptions() {
    const options = [];
    for(let i = 8; i < 17; i++) {
      options.push(<option key={`${i}:00`} value={`${i}:00`}>{`${i}:00`}</option>);
      options.push(<option key={`${i}:30`} value={`${i}:30`}>{`${i}:30`}</option>);
    }
    return options;
  }
  return (
    <>
      <Sidebar user={user} />
      <div className="bigbox">
        <h1>APPOINTMENT</h1>
        <p> | Need repair? |</p>
        <div className="info_data">ADD YOUR INFORMATIONS</div>
        <div className="appointment">
          <form onSubmit={handleSubmit}>
            <div className="appointment_box">
              <input className="text_input" type="text" name="fullName" value={data.fullName} onChange={handleChange} placeholder="Full Name" required />
              <input className="text_input" type="tel" name="telephone" value={data.telephone} onChange={handlePhone} placeholder="Telephone" required pattern="\+40\d{9}" />
              <input className="text_input" type="email" name="email" value={user?.email} readOnly />
              <input className="text_input_2" name="description" value={data.description} onChange={handleChange} placeholder="Description of problem" required />
              <select className="text_input_3" name="appointmentTime" value={data.appointmentTime} onChange={handleChange} required>
                <option value="">Select Time (8-17)</option>
                {generateTimeOptions()}
              </select>
              <input className="text_input_3" type="date" name="appointmentDate" value={data.appointmentDate} onChange={handleChange} min={getMinDate()} required />
            </div>
            <h2><span>YOUR CAR DETAILS</span></h2>
            <div className="appointment_box_2">
              <input className="text_input" type="text" name="carModel" value={data.carModel} onChange={handleChange} placeholder="Car Model" required />
              <input className="text_input" type="text" name="carBrand" value={data.carBrand} onChange={handleChange} placeholder="Car Brand" required />
              <input className="text_input" type="number" name="carYear" value={data.carYear} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Year" required min="1900" max="2024" />
              <select className="text_input" name="carType" value={data.carType} onChange={handleChange} required>
                <option value="">Select Engine Type</option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
              <input className="text_input" type="number" name="carCapacity" onKeyPress={handleKeyPress} value={data.carCapacity} onChange={handleChange} placeholder="Engine Capacity" required min="0"/>
              <input className="text_input" type="number" name="carHP" onKeyPress={handleKeyPress} value={data.carHP} onChange={handleHPChange} placeholder="HP" required min="0"/>
              <input className="text_input" type="number" name="carKW" onKeyPress={handleKeyPress} value={data.carKW} onChange={handleKWChange} placeholder="KW" required min="0"/>
              <input className="text_input" type="number" name="carWeight" onKeyPress={handleKeyPress} value={data.carWeight} onChange={handleChange} placeholder="Max Weight" required min="0"/>
              <input className="text_input" type="text" name="carCIV" maxLength="13" value={data.carCIV} onChange={handleChange} placeholder="CIV" required />
              <input className="text_input" type="text" name="carVIN" maxLength="17" value={data.carVIN} onChange={handleChange} placeholder="VIN" required />
              <select className="text_input" name="carTraction" value={data.carTraction} onChange={handleChange} required>
                <option value="">Select Traction Type</option>
                <option value="Front-Wheel Drive">Front-Wheel Drive</option>
                <option value="Rear-Wheel Drive">Rear-Wheel Drive</option>
                <option value="All-Wheel Drive">All-Wheel Drive</option>
              </select>
              <input className="text_input" type="text" name="carRegiNr" value={data.carRegiNr} onChange={handleChange} placeholder="Registration Number" required />
            </div>
            <button className="submit_2" type="submit">Submit</button>
          </form>
        </div>
      </div>    
    </>
  );
}
export default Appointment;