"use client";
import { GetUserById } from "@/helpers/auth.helper";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface userPayload {
  name: ReactNode;
  id: number;
  sub: number;
  email: string;
}
export interface AuthContextType {
  user: userPayload; // Cambia 'any' al tipo específico si lo tienes
  setUser: (user: userPayload) => void;
  userData: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserID = async () => {
        const res = await GetUserById(user.id);
        setUserData(res);
      };
      fetchUserID();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
