"use client";

import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
  token: string;
  setToken: Function;
  user: any;
  loginAction: (data: LoginData, str: string) => Promise<void>;
  logOut: () => void;
  fetchUser: (userId: number) => Promise<void>;
}

interface LoginData {
  userName: string;
  password: string;
  email: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<string>(typeof window !== 'undefined' ? localStorage.getItem("token") || "" : "");
  const [role, setRole] = useState<string>(typeof window !== 'undefined' ? localStorage.getItem("role") || "" : "");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded && decoded.id) {
          fetchUser(decoded.id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const fetchUser = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/Client/get/${userId}`);
      setUser(response.data);
      setRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user information", error);
    }
  };

  const loginAction = async (data: LoginData, str: string) => {
    try {
      const response = await axios.post(`http://localhost:5000/${data.role}/${str}`, data);
      const userData = response.data.data;
      console.log(response.data);

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setRole(userData.role);
      localStorage.setItem("role", userData.role);

      if (userData.role === "admin") {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        console.error(err.response.data.message);
      } else {
        console.error("An error occurred during login.");
      }
    }
  };

  const logOut = () => {
    setUser({});
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token,setToken, user, loginAction, fetchUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
