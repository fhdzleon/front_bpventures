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

interface userdata{
  id: number;
  email: string;
  Names: string;
  LastName: string;
  Position: string;
  empresa: string | null;
  cuit: number | null;
  domicilio: string | null;
  verifiedEmail: boolean;
  mfaEnabled: boolean;
  mfaBackupCodes: string;
  mfaSecret: string;
  mfaVerified: null | boolean;
  createdAt: string;
  modifiedAt: string;
  statusId: number;
  isAdmin: boolean;
}

export interface AuthContextType {
  user: userPayload;
  setUser: (user: userPayload) => void;
  userData: userdata;
  blocked: boolean;
  setBlocked: (blocked: boolean) => void;
  deliverableData: any;
  setDeliverableData: (deliverableData: any) => void;
  allUsers: userdata[];
  setAllUsers: (allUser: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [blocked, setBlocked] = useState<boolean>(false);
  const [deliverableData, setDeliverableData] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any>(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`
        );
        const data = await response.json();

        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const session = sessionStorage.getItem("user");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  useEffect(() => {
      const fetchUserID = async () => {
        const res = await GetUserById(user?.id);
        setUserData(res);
      };  
      fetchUserID();
  }, [user]);

  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        blocked,
        setBlocked,
        deliverableData,
        setDeliverableData,
        allUsers,
        setAllUsers: setAllUsers,
      }}
    >
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
