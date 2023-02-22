import React, { createContext, useState } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {}
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (user) => {
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider}