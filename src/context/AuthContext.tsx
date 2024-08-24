'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface userPayload{
    id: number;
    sub: number;
    email: string;
}
export interface AuthContextType {
  user: userPayload; // Cambia 'any' al tipo específico si lo tienes
  setUser: (user: userPayload) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
    
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
