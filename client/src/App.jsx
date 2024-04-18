//Pages

import Navbar from "./components/Navbar";
import Home from "./pages/HomePage/Home";
import Dashboard from "./pages/DashBoard/Main/dashboard";
import Appointment from "./pages/DashBoard/Appointments/appointment";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/contact";
import Cars from "./pages/DashBoard/Cars/cars";
import NotFound from "./pages/NotFound/404";
import Users from "./pages/DashBoard/Users/users";
import Mechanic from "./pages/DashBoard/Mechanic/mechanic";
import TBApproved from "./pages/DashBoard/TBApproved/tbapproved";
import INService from "./pages/DashBoard/INService/inservice";
import Archive from "./pages/DashBoard/Archive/archive";
import Inspected from "./pages/DashBoard/InspectedCars/inspected";

//CSS
import "./app.css";

//Route variables
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = () => {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        console.log('Request timed out');
      }, 2000);
  
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          clearTimeout(timeoutId);
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    getUser();
  }, []);;
  if (isLoading) {
    return <div></div>;
  }
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/contact" element={<Contact/>} />
          <Route
            path={`/dashboard/${user?.googleId}`}
            element={user ? <Dashboard  user={user} /> : <Login />}
          />
          <Route
            path={`/dashboard/appointment/${user?.googleId}`}
            element={user ? <Appointment user={user} /> : <Login />}
          />
          <Route
            path={`/dashboard/cars/${user?.googleId}`}
            element={user ? <Cars user={user}/> : <Login />}
          />
          <Route
            path={`/dashboard/admin/users`}
            element={
              user 
                ? (user.rank === 'Admin' 
                    ? <Users user={user}/> 
                    : <NotFound />) 
                : <Login />
            }
          />
          <Route
            path={`/archive`}
            element={
              user 
                ? (user.rank === 'Admin' || user.rank === 'Mecanic' 
                    ? <Archive user={user}/> 
                    : <NotFound />) 
                : <Login />
            }
          />
          <Route
            path={`/dashboard/mechanic/${user?.googleId}`}
            element={
              user 
                ? (user.rank === 'Admin' || user.rank === 'Mecanic' 
                    ? <Mechanic user={user}/> 
                    : <NotFound />) 
                : <Login />
            }
          />
          <Route
            path={`/dashboard/tbacars/${user?.googleId}`}
            element={
              user 
                ? (user.rank === 'Admin' || user.rank === 'Mecanic' 
                    ? <TBApproved user={user}/> 
                    : <NotFound />) 
                : <Login />
            }
          />
          <Route
            path={`/dashboard/in_service/${user?.googleId}`}
            element={
              user 
                ? (user.rank === 'Admin' || user.rank === 'Mecanic' 
                    ? <INService user={user}/> 
                    : <NotFound />) 
                : <Login />
            }
          />
          <Route
            path={`/dashboard/inspected/${user?.googleId}`}
            element={
              user 
                ? (user.rank === 'Admin' || user.rank === 'Mecanic' 
                    ? <Inspected user={user}/> 
                    : <NotFound />) 
                : <Login />
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
