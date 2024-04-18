import logo from './img/logo_service.jpg'
import React from 'react'
import './navbar.css'

const Navbar = ({ user}) => {
  //Redirecturi 
   const logout = () => {
     localStorage.removeItem('token');
     window.open("http://localhost:5000/auth/logout", "_self");
   };
   const dashboard = () => {
     window.open(`http://localhost:3000/dashboard/${user.googleId}`, "_self");
   }
   const home = () => {
      window.open("http://localhost:3000/", "_self");
    }
   const aboutUs = () => {
     window.open("http://localhost:3000/aboutus", "_self");
   }
   const contact = () => {
     window.open("http://localhost:3000/contact", "_self");
   }
   const login = () => {
      window.open("http://localhost:3000/login", "_self");
    }
   const user_name = () => {
     return user.displayName;
   }
   const user_image = () => {
     return user.profileImage;
   }
  return (
    <>
      <div className='nav_container'>
      <div className='Logo'>
        <img src={logo} alt="Logo" className="logo-image" />
        <h1>GAB AUTO SERVICE</h1>
      </div>
        <div className='nav_links'>
          {/* Dezactivez warningurile deoarece folosesc tag a in loc de button. Se modifica stilul butonului daca l modific in button. */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className='nav_link' onClick={home}>Home</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className='nav_link' onClick={aboutUs}>About Us</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className='nav_link' onClick={contact}>Contact</a>
        </div>
        {/* Verific daca e user logat */}
        { user ? (
          <>
            <div className='nav_connect_buttons'>
              <button className='nav_signup' onClick={logout}><p>Logout</p></button>
              <button className='nav_login' onClick={dashboard}>
                <p>Dashboard</p>
              </button>
              <img

                    src={user_image()}
                    alt=""
                    className="avatar"
                  />
                  <p>{user_name()}</p>
            </div>
          </>
        ) : (
          <>
            <div className='nav_connect_buttons'>
              <button className='nav_signup'>
                <p className='signup_p' onClick={login}>SignUp</p>
              </button>
              <button className='nav_login' onClick={login}>
                <p>Log In</p>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Navbar
