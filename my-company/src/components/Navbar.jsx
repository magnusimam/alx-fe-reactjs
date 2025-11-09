import React from 'react';
import { Link } from 'react-router-dom';
 
function Navbar() {
  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '15px 30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s'
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
        MyCompany
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/services" style={linkStyle}>Services</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
