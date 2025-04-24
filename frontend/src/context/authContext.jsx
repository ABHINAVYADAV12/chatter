import Cookies from "js-cookie";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    console.log("Checking authentication...");
    setIsLoading(true);

    // Check for token in cookie first
    const cookieToken = Cookies.get("authToken");

    // If not in cookie, check localStorage
    const localToken = localStorage.getItem("authToken");

    if (cookieToken || localToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  };

  const setAuthenticated = (value) => {
    console.log("Setting isAuthenticated to:", value);
    setIsAuthenticated(value);
  };

  const logout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const login = (token) => {
    // Try to set cookie first
    Cookies.set("authToken", token, { expires: 7, path: "/" });

    // Also store in localStorage as fallback
    localStorage.setItem("authToken", token);

    setIsAuthenticated(true);
  };

  // Debug log when auth state changes
  useEffect(() => {
    console.log("Auth state changed:", { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        checkAuth,
        logout,
        isLoading,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
