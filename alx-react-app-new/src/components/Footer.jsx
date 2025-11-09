function Footer() {
    return (
        <footer style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            textAlign: 'center',
            padding: '20px 0',
            marginTop: '50px',
            boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
        }}>
            <p style={{
                margin: '0 0 10px 0',
                fontSize: '1rem',
                fontWeight: '500'
            }}>
                © 2023 City Lovers
            </p>
            <p style={{
                margin: '0',
                fontSize: '0.85rem',
                color: '#bdc3c7'
            }}>
                Follow us on social media
            </p>
        </footer>
    );
}

export default Footer;
