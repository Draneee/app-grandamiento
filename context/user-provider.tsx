"use client";
import React, { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";

interface UserContextProps {
  user: User | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
