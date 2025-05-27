
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Mock admin credentials - in a real app, this would be handled by your backend
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      const sessionData = JSON.parse(adminSession);
      if (sessionData.expires > Date.now()) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminSession');
      }
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const sessionData = {
        username,
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      localStorage.setItem('adminSession', JSON.stringify(sessionData));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
