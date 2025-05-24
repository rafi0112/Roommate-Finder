import { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('hobbyhub-theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('hobbyhub-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};

// ✅ Add this function to allow easy access to ThemeContext
export const useTheme = () => useContext(ThemeContext);
