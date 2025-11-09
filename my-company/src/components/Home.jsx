import React from 'react';

function Home() {
  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '3rem',
        color: '#2c3e50',
        marginBottom: '20px'
      }}>
        Welcome to Our Company
      </h1>
      <p style={{
        fontSize: '1.3rem',
        color: '#555',
        lineHeight: '1.8',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        We are dedicated to delivering excellence in all our services. 
        With over 30 years of experience, we provide innovative solutions 
        tailored to your needs.
      </p>
      <div style={{
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <div style={{
          padding: '30px',
          backgroundColor: '#ecf0f1',
          borderRadius: '10px',
          flex: '1',
          maxWidth: '300px'
        }}>
          <h3 style={{ color: '#2c3e50' }}>Quality</h3>
          <p style={{ color: '#555' }}>Top-notch service quality</p>
        </div>
        <div style={{
          padding: '30px',
          backgroundColor: '#ecf0f1',
          borderRadius: '10px',
          flex: '1',
          maxWidth: '300px'
        }}>
          <h3 style={{ color: '#2c3e50' }}>Experience</h3>
          <p style={{ color: '#555' }}>Over 30 years in business</p>
        </div>
        <div style={{
          padding: '30px',
          backgroundColor: '#ecf0f1',
          borderRadius: '10px',
          flex: '1',
          maxWidth: '300px'
        }}>
          <h3 style={{ color: '#2c3e50' }}>Innovation</h3>
          <p style={{ color: '#555' }}>Cutting-edge solutions</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
