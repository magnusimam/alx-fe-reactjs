import { useState } from 'react';
import './RegistrationForm.css';

export default function RegistrationForm() {
  // State for form fields - INDIVIDUAL CONTROLLED COMPONENTS
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for errors
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes (controlled components)
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        // Mock API call
        const formDataToSubmit = { username, email, password };
        console.log('Submitting form data:', formDataToSubmit);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSubmitted(true);
        setUsername('');
        setEmail('');
        setPassword('');
        
        // Reset success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration (Controlled Components)</h2>
      
      {submitted && (
        <div className="success-message">
          ✓ Registration successful!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
}