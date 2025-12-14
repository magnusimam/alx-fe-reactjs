import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | {" "}
          <Link to="/profile">Profile</Link> | {" "}
          <Link to="/blog/123">Blog Post</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/blog/:postId" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
