"use client";
import { User } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import React from "react";
import Navbar from "./home/navbar";
import { UserProvider } from "@/context/user-provider";
import Footer from "./home/footer";
import {
  ConfetiProvider,
  LoginStateProvider,
  useConfetiState,
} from "@/context/login-state-provider";
import useWindowSize from "@/hooks/use-window-size";
import { default as ConfettiComponent } from "react-confetti";

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
    <UserProvider user={user}>
      <LoginStateProvider>
        <ConfetiProvider>
          <Confetti />
          <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 w-full z-30 bg-background">
              <Navbar user={user} />
            </header>
            <main className="mt-[68px]">
              {children}
            </main>
            <div id="ad-container" className="w-full mt-5">
              <AdBanner
                data-ad-slot="slotnumber"
                data-full-width-responsive="true"
                data-ad-layout="in-article"
                data-ad-format="fluid"
              />
            </div>
            <Footer />
          </div>
        </ConfetiProvider>
      </LoginStateProvider>
    </UserProvider>
  );
};

export default LayoutProvider;

const Confetti = () => {
  const { width, height } = useWindowSize();
  const { value: showConfetti } = useConfetiState();
  return (
    showConfetti && (
      <div className="confetti-fade-out">
        <ConfettiComponent width={width} height={height} />
      </div>
    )
  );
};
