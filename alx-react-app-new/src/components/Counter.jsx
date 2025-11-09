import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{
            textAlign: 'center',
            padding: '40px',
            maxWidth: '400px',
            margin: '50px auto',
            backgroundColor: '#f0f0f0',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{
                color: '#333',
                marginBottom: '20px'
            }}>
                Counter App
            </h2>
            
            <p style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: count > 0 ? 'green' : count < 0 ? 'red' : 'black',
                margin: '30px 0'
            }}>
                {count}
            </p>
            
            <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center'
            }}>
                <button 
                    onClick={() => setCount(count + 1)}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Increment
                </button>
                
                <button 
                    onClick={() => setCount(count - 1)}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Decrement
                </button>
                
                <button 
                    onClick={() => setCount(0)}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Counter;
