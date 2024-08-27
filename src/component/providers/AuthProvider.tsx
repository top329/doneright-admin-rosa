"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { Button, type MenuProps } from "antd";
import { UserResponse } from "@/types/auth";
import { logout } from "@/features/projects/auth";

type Context = {
  accessToken: string;
  expireDate: number;
  selectAccessToken: (token: string) => void;
  selectExpireDate: (time: number) => void;
};

const AuthContext = createContext<Context | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const initAccessToken =
    typeof window !== "undefined"
      ? (window.sessionStorage.getItem("accessToken") as string)
      : "";
  const initExpireDate =
    typeof window !== "undefined"
      ? parseInt(window.sessionStorage.getItem("expireDate") as string, 10)
      : 0;

  const [accessToken, setAccessToken] = useState<string>(initAccessToken);
  const [expireDate, setExpireDate] = useState<number>(initExpireDate);

  const selectAccessToken = (token: string) => {
    setAccessToken(token);
  };

  const selectExpireDate = (time: number) => {
    setExpireDate(time);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        expireDate,
        selectAccessToken,
        selectExpireDate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): Context {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
