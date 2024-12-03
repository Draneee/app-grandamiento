import React from "react";
import Hero from "./hero";
import Categories from "./categories";

// type user from supabase
const HomeContainer = () => {
  return (
    <>
      <Hero />
      <Categories />
    </>
  );
};

export default HomeContainer;
