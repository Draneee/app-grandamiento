import React from "react";
import Hero from "./hero";
import Categories from "./categories";
import Footer from "./footer";
import { User } from "@supabase/supabase-js"; // Adjust the import path as necessary

// type user from supabase
const HomeContainer = ({ user }: { user: User | null }) => {
  return (
    <>
      <Hero user={user} />
      <Categories />
      <Footer />
    </>
  );
};

export default HomeContainer;
