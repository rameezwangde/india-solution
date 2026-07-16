import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentAdmin, loginAdmin, logoutAdmin as logoutAdminApi } from '../api/authService';

const AdminAuthContext = createContext(null);

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('indiaSolutionsAdminToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentAdmin();
        if (response.success) {
          setAdmin(response.admin || response.data); // Support both formats
          setIsAuthenticated(true);
        } else {
          handleLogoutLocal();
        }
      } catch (error) {
        handleLogoutLocal();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleLogoutLocal = () => {
    localStorage.removeItem('indiaSolutionsAdminToken');
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const login = async (email, password) => {
    try {
      const data = await loginAdmin(email, password);
      if (data.success && data.token) {
        localStorage.setItem('indiaSolutionsAdminToken', data.token);
        setToken(data.token);
        setAdmin(data.admin);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const logout = async () => {
    try {
      await logoutAdminApi();
    } catch (error) {
      console.error('Logout API failed, continuing local logout');
    } finally {
      handleLogoutLocal();
      window.location.href = '/admin/login';
    }
  };

  return (
    <AdminAuthContext.Provider value={{
      admin,
      token,
      isAuthenticated,
      loading,
      login,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
