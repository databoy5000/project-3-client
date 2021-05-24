import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (

    <nav className="navbar is-info">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src="https://i.pinimg.com/originals/33/e6/3d/33e63d5adb0da6b303a83901c8e8463a.png" alt="logo"></img>
          </a>
          <span className="navbar-burger" data-target="navbarMenuHeroB">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroB" className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item is-active">
              <Link to="/" > Home</Link>
              {/* Home */}
            </a>
            <a className="navbar-item">
              <Link to="/memories" > Memory Index</Link>
            </a>
            <a className="navbar-item">
              <Link to="/about" >About</Link> 
              {/* About */}
            </a>
            <a className="navbar-item">
              <Link to="/register" >Register</Link> 
              {/* Register */}
            </a>
            <a className="navbar-item">
              <Link to="/login" >Login</Link> 
              {/* Login */}
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
