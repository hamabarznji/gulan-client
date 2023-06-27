import React, { createContext, useEffect, useState } from "react";
import UserServiceInstance from "../../services/UserService";

interface UserData {
  id: string;
  username: string;
  role: string;
}

interface UserContextProps {
  user: UserData | null;
  clearContext: () => void;
  fetchUserData: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  clearContext: () => {},
  fetchUserData: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const fetchUserData = async () => {
    try {
      const response: UserData = await UserServiceInstance.getSession();
      setUser(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const clearContext = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, clearContext, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
