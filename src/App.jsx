import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Navigation from './components/Navigation';
import ThemeProvider from './context/ThemeContext';
import Footer from './components/Footer';
import './App.css';

const Home = () => {
    const { authState } = useContext(AuthContext);
    
    return (
        <div className="home-container">
            <h1>Welcome to Secure Banking</h1>
            <div className="features-grid">
                <div className="feature-card">
                    <h3>Secure Authentication</h3>
                    <p>State-of-the-art security for your banking needs</p>
                </div>
                <div className="feature-card">
                    <h3>Real-time Chat Support</h3>
                    <p>Get help instantly through our chat system</p>
                </div>
                <div className="feature-card">
                    <h3>Easy Account Management</h3>
                    <p>Manage your account with just a few clicks</p>
                </div>
            </div>
            {!authState && (
                <div className="cta-buttons">
                    <Link to="/register" className="btn btn-primary">Get Started</Link>
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                </div>
            )}
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <div className="app-container">
                        <Navigation />
                        <main className="main-content">
                            <Routes>
                                <Route path="/chat" element={
                                    <ProtectedRoute>
                                        <Chat />
                                    </ProtectedRoute>
                                } />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/reset-password" element={<PasswordReset />} />
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
};

// Protected Route component to handle authentication
const ProtectedRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);
    
    if (!authState) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default App; 