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

interface userdata {
  admin: any;
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
  companyId: number;
  Empresa: string;
  imgProfile: string | null;
}

export interface AuthContextType {
  user: userPayload;
  setUser: (user: userPayload) => void;
  userData: userdata;
  setUserData: (userData: userdata) => void;
  blocked: boolean;
  setBlocked: (blocked: boolean) => void;
  deliverableData: any;
  setDeliverableData: (deliverableData: any) => void;
  allUsers: userdata[];
  setAllUsers: (allUser: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchAgain: boolean;
  setFetchAgain: (fetchAgain: any) => void;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchAgain, setFetchAgain] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setLoading(false);
        setAllUsers(data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
  }, []);
  /*   console.log(user); */

  useEffect(() => {
    const fetchUserID = async () => {
      setLoading(true);
      const res = await GetUserById(user?.id);
      setUserData(res);
      setLoading(false);
    };
    if (user) {
      fetchUserID();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        blocked,
        setBlocked,
        deliverableData,
        setDeliverableData,
        allUsers,
        setAllUsers,
        loading,
        setLoading,
        fetchAgain,
        setFetchAgain,
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
