import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
    light: {
        // Google Material Design Light Theme colors
        '--primary-color': '#1976d2', // Blue 700
        '--primary-hover': '#1565c0', // Blue 800
        '--secondary-color': '#2196f3', // Blue 500
        '--secondary-hover': '#1976d2', // Blue 700
        '--danger-color': '#d32f2f', // Red 700
        '--danger-hover': '#c62828', // Red 800
        '--text-primary': '#1a237e', // Darker blue for better contrast
        '--text-secondary': '#455a64', // Darker grey for better readability
        '--bg-light': '#f5f5f5', // Grey 100
        '--bg-white': '#ffffff',
        '--card-bg': '#ffffff',
        '--card-shadow': '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
        '--card-text': '#1a237e',
        '--text-primary-rgb': '26, 35, 126',
    },
    dark: {
        // Google Material Design Dark Theme colors
        '--primary-color': '#2196f3', // Blue 500
        '--primary-hover': '#1976d2', // Blue 700
        '--secondary-color': '#90caf9', // Blue 200
        '--secondary-hover': '#64b5f6', // Blue 300
        '--danger-color': '#ef5350', // Red 400
        '--danger-hover': '#e53935', // Red 500
        '--text-primary': '#eceff1', // Lighter color for better contrast
        '--text-secondary': '#b0bec5',
        '--bg-light': '#303030',
        '--bg-white': '#212121',
        '--card-bg': '#2c3e50', // Slightly lighter than background
        '--card-shadow': '0 4px 6px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.3)',
        '--card-text': '#eceff1',
        '--text-primary-rgb': '236, 239, 241',
    }
};

const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Update localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Apply theme variables to root element
        const theme = isDarkMode ? themes.dark : themes.light;
        Object.entries(theme).forEach(([property, value]) => {
            document.documentElement.style.setProperty(property, value);
        });
    }, [isDarkMode]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider; 