function MainContent() {
    return (
        <main style={{
            padding: '30px',
            margin: '30px auto',
            maxWidth: '800px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
        }}>
            <p style={{
                fontSize: '1.4rem',
                color: 'white',
                lineHeight: '1.8',
                textAlign: 'center',
                margin: '0',
                fontWeight: '500',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
                I love to visit New York, Paris, and Tokyo.
            </p>
        </main>
    );
}

export default MainContent;