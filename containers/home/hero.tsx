import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Navbar from "./navbar";
import { MousePointerClick, Telescope } from "lucide-react";

const Hero = () => {
  return (
    <section className="h-dvh grid place-items-center w-full relative">
      <Navbar />
      <section className="relative mt-24">
        <section className="absolute -top-60 inset-x-0 object-cover h-60 w-full">
          <Image
            className=""
            src="https://res.cloudinary.com/dfi9lz3xh/image/upload/v1732927207/i_ldjcz5.svg"
            alt=""
            fill
          />
        </section>
        <p className="text-6xl max-md:text-4xl font-normal text-center">
          APP
          <span className="italic font-semibold font-mono">GRANDAMIENTO</span>
        </p>
        <p className="text-center text-2xl max-md:text-xs">
          ¡Si lo tienes chiquito es porque quieres!
        </p>
        <section className="flex max-md:grid justify-center gap-2 mt-4">
          <Button size={"lg"} className="rounded-full" variant={"outline"}>
            <Telescope /> <p>Recibe todas nuestras noticias</p>
          </Button>
          <Button size={"lg"} className="rounded-full">
            <MousePointerClick />
            <p>
              Click aqui para <span className="font-bold">agrandar</span>
            </p>
          </Button>
        </section>
      </section>
      <section className="w-full absolute bottom-0 inset-x-0 h-20 object-cover">
        <Image
          src="https://res.cloudinary.com/dfi9lz3xh/image/upload/v1732927976/Doodle_Arrow_Icon_gtmfsn.png"
          fill
          className="object-contain rotate-180"
          alt="doodle arrow"
        />
      </section>
    </section>
  );
};

export default Hero;
