import { useContext } from 'react';
import UserContext from './UserContext';

function UserDetails() {
  const userData = useContext(UserContext);

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;

const UserProfile = (props) => {
    return (
        <div style={{ 
            border: '1px solid gray', 
            borderRadius: '8px',
            padding: '20px', 
            margin: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            backgroundColor: '#f9f9f9',
            maxWidth: '400px'
        }}>
            <h2 style={{ 
                color: 'blue',
                margin: '0 0 10px 0',
                fontSize: '1.8rem'
            }}>
                {props.name}
            </h2>
            <p style={{ 
                margin: '8px 0',
                fontSize: '1rem',
                color: '#555'
            }}>
                Age: <span style={{ 
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                    {props.age}
                </span>
            </p>
            <p style={{ 
                margin: '8px 0',
                fontSize: '0.95rem',
                fontStyle: 'italic',
                color: '#666',
                lineHeight: '1.5'
            }}>
                Bio: {props.bio}
            </p>
        </div>
    );
};

export default UserProfile;