import React from 'react';

function Services() {
  const services = [
    {
      title: 'Technology Consulting',
      description: 'Expert advice on technology solutions and digital transformation.'
    },
    {
      title: 'Market Analysis',
      description: 'Comprehensive market research and competitive analysis.'
    },
    {
      title: 'Product Development',
      description: 'End-to-end product development from concept to launch.'
    }
  ];

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#2c3e50',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        Our Services
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginTop: '40px'
      }}>
        {services.map((service, index) => (
          <div key={index} style={{
            padding: '30px',
            backgroundColor: '#ffffff',
            border: '2px solid #ecf0f1',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s'
          }}>
            <h3 style={{
              color: '#2c3e50',
              fontSize: '1.5rem',
              marginBottom: '15px'
            }}>
              {service.title}
            </h3>
            <p style={{
              color: '#555',
              lineHeight: '1.6'
            }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
