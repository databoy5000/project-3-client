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
              <Link to="/" className="navbar-item"> Home</Link>

            </a>
            <a className="navbar-item">
              <Link to="/memories" className="navbar-item"> Memory Index</Link>
            </a>
            <a className="navbar-item">
              <Link to="/memories/map" className="navbar-item"> Memory Map</Link>
            </a>
            <a className="navbar-item">
              <Link to="/about" className="navbar-item">About</Link> 

            </a>
            <a className="navbar-item">
              <Link to="/register" className="navbar-item">Register</Link> 

            </a>
            <a className="navbar-item">
              <Link to="/login" className="navbar-item">Login</Link> 

            </a>
          </div>
        </div>
      </div>
    </nav>

  )
}


export default Navbar
