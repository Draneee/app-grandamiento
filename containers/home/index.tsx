"use client";
import React from "react";
import Hero from "./hero";
import Categories from "./categories";
import Footer from "./footer";
import dynamic from "next/dynamic";
const AdBanner = dynamic(() => import("@/components/ads/ads-banner"), {
  ssr: false,
});

const HomeContainer = () => {
  return (
    <>
      <AdBanner
        data-ad-slot="slotnumber"
        data-full-width-responsive="true"
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
      <Hero />
      <Categories />
      <Footer />
    </>
  );
};

export default HomeContainer;
