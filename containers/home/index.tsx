import React from "react";
import Hero from "./hero";
import Categories from "./categories";
import Footer from "./footer";

// type user from supabase
const HomeContainer = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Footer />
    </>
  );
};

export default HomeContainer;
