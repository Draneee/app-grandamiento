"use client";
import { User } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import React from "react";
import Navbar from "./home/navbar";
const AdBanner = dynamic(() => import("@/components/ads/ads-banner"), {
  ssr: false,
});

const LayoutProvider = ({
  children,
  user,
}: {
  children?: React.ReactNode;
  user: User | null;
}) => {
  return (
    <>
      <AdBanner
        data-ad-slot="slotnumber"
        data-full-width-responsive="true"
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
      <div className="mt-[68px]">
        <Navbar user={user} />

        {children}
      </div>
    </>
  );
};

export default LayoutProvider;
