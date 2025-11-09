import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      marginTop: '50px',
      position: 'relative',
      bottom: 0,
      width: '100%'
    }}>
      <p style={{ margin: '5px 0' }}>© 2024 MyCompany. All rights reserved.</p>
      <p style={{ margin: '5px 0', fontSize: '14px', color: '#bdc3c7' }}>
        Contact us: info@mycompany.com | Phone: (123) 456-7890
      </p>
    </footer>
  );
}

export default Footer;
