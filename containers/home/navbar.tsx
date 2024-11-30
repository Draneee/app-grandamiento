import { Button } from "@/components/ui/button";
import React from "react";

const Navbar = () => {
  return (
    <nav className="absolute w-full top-0 container flex justify-between py-4 mx-auto max-md:px-2">
      <section className="grid place-items-center">
        <p className="text-xl font-normal text-center">
          APP
          <span className="italic font-semibold font-mono">GRANDAMIENTO</span>
        </p>
      </section>
      <section className="flex gap-2">
        <Button className="rounded-full" variant={"outline"}>
          Login
        </Button>
        <Button className="rounded-full">Registro</Button>
      </section>
    </nav>
  );
};

export default Navbar;
