import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        setAuthState(null);
        // Additional logout logic here
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="nav-bar">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link to="/">Secure Banking</Link>
                </div>
                
                <button 
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    {authState ? (
                        <>
                            <Link to="/chat" onClick={() => setIsMenuOpen(false)}>Chat</Link>
                            <button onClick={() => {
                                handleLogout();
                                setIsMenuOpen(false);
                            }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 