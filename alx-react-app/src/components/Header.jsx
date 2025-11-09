function Header() {
    return (
        <header style={{ 
            backgroundColor: 'navy', 
            color: 'white', 
            textAlign: 'center',
            padding: '20px 0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px'
        }}>
            <h1 style={{
                margin: '0',
                fontSize: '2.5rem',
                fontWeight: 'bold'
            }}>My Favorite Cities</h1>
        </header>
    );
}

export default Header;