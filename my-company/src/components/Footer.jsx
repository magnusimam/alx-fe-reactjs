function Footer() {
  const footerStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center'
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 Our Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;