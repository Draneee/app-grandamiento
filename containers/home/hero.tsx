"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { MousePointerClick, Telescope } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="h-dvh grid place-items-center w-full relative">
      <div className="relative mt-40">
        <div className="absolute -top-72 md:-top-80 inset-x-0 object-cover h-80 w-full">
          <Image
            src="https://res.cloudinary.com/dfi9lz3xh/image/upload/v1732927207/i_ldjcz5.svg"
            alt="Imagen decorativa del hero"
            fill
            priority
          />
        </div>

        <div className="text-center">
          <h1 className="text-6xl max-md:text-4xl font-normal">
            APP
            <span className="italic font-semibold font-mono">GRANDAMIENTO</span>
          </h1>
          <p className="text-2xl max-md:text-xs">
            ¡Si lo tienes chiquito es porque quieres!
          </p>
        </div>

        <nav className="flex max-md:grid justify-center gap-2 mt-6">
          <Button size={"lg"} className="rounded-full border-gray-300 hover:border-primary/50 hover:text-primary" variant={"outline"}>
            <Telescope className="group-hover:text-primary" /> <p>Recibe todas nuestras noticias</p>
          </Button>
          <Link href={"/category/reto-30-dias"}>
            <Button size={"lg"} className="rounded-full w-full">
              <MousePointerClick />
              <p>
                Click aqui para <span className="font-bold">agrandar</span>
              </p>
            </Button>
          </Link>
        </nav>

      <figure 
        className="w-full absolute bottom-[-7rem] inset-x-0 h-20 object-cover"
        role="presentation"
      >
        {/* <Image
          src="https://res.cloudinary.com/dfi9lz3xh/image/upload/v1732927976/Doodle_Arrow_Icon_gtmfsn.png"
          fill
          className="object-contain rotate-180"
          alt="doodle arrow"
        /> */}
        <svg
          className="size-20 mx-auto animate-bounce"
          width="513"
          height="483"
          viewBox="0 0 513 483"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.957"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.500006 415.635C0.500006 412.302 0.500006 408.969 0.500007 405.635C5.69401 397.432 12.694 395.598 21.5 400.135C34.333 412.969 47.167 425.802 60 438.635C60.285 389.915 69.285 342.915 87 297.635C114.54 232.086 162.54 190.087 231 171.636C249.915 121.07 280.081 78.5695 321.5 44.1355C377.315 3.04053 438.981 -8.95946 506.5 8.13554C508.734 10.1985 510.734 12.3645 512.5 14.6355C512.5 17.9685 512.5 21.3025 512.5 24.6355C509.72 29.7355 505.386 32.4025 499.5 32.6355C421.892 15.8945 357.059 37.2275 305 96.6355C287.103 117.908 272.603 141.408 261.5 167.136C305.638 164.411 345.305 176.078 380.5 202.136C419.714 236.162 430.88 277.662 414 326.636C390.924 373.096 353.424 394.596 301.5 391.136C264.38 383.017 237.547 361.85 221 327.636C210.792 296.196 208.792 264.196 215 231.636C216.623 221.978 218.79 212.478 221.5 203.136C206.107 207.33 191.773 213.997 178.5 223.136C139.937 252.04 114.103 289.872 101 336.635C91.743 370.028 87.076 404.029 87 438.635C100.471 426.165 113.638 413.332 126.5 400.135C135.603 395.288 142.436 397.456 147 406.635C147.738 410.397 147.405 414.063 146 417.635C125.167 438.469 104.333 459.302 83.5 480.135C76.336 483.637 69.336 483.303 62.5 479.135C41.241 458.378 20.574 437.212 0.500006 415.635ZM325.5 365.636C289.463 366.099 262.963 350.432 246 318.636C238.867 297.194 236.534 275.194 239 252.636C241.042 233.759 244.875 215.259 250.5 197.136C286.048 190.125 319.715 195.791 351.5 214.136C378.322 230.649 393.322 254.649 396.5 286.136C391.602 329.528 367.935 356.028 325.5 365.636Z"
            fill="black"
          />
        </svg>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
