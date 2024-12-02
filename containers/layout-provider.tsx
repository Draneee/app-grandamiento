"use client";
import { User } from "@supabase/supabase-js";
import React from "react";
import Navbar from "./home/navbar";

const LayoutProvider = ({
  children,
  user,
}: {
  children?: React.ReactNode;
  user: User | null;
}) => {
  return (
    <>
      <div className="mt-[68px]">
        <Navbar user={user} />

        {children}
      </div>
    </>
  );
};

export default LayoutProvider;
