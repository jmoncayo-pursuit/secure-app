import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <p>© {new Date().getFullYear()} Secure Banking. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <button 
                        className="theme-toggle-small"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    >
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 