import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem("refreshToken") || null;
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedUser && storedToken && storedRefreshToken) {
      setUser(storedUser);
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  const login = (userData, token, refreshToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    console.log("REFRESH TOKEN: ", refreshToken);
    localStorage.setItem("refreshToken", refreshToken);
    console.log("USER DATA: ", userData);
    setUser(userData);
    setToken(token);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setToken(null);
    setRefreshToken(null);
  };

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <UserContext.Provider value={{ user, token, refreshToken, login, logout, updateToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
