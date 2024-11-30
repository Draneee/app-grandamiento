import { InstagramIcon } from "lucide-react";
import Link from "next/link";
import React, { SVGProps } from "react";

const Footer = () => {
  return (
    <footer className="bg-primary py-10 text-white max-md:px-2">
      <section className="container mx-auto grid md:grid-cols-2 max-md:gap-2">
        <section className="grid max-md:text-center">
          <p className="text-2xl font-normal">
            APP
            <span className="italic font-semibold font-mono">GRANDAMIENTO</span>
          </p>
          <p className="text-xs font-mono">
            Aplicacion desarrollada por{" "}
            <Link className="underline" href={""}>
              SancochoLabs
            </Link>
          </p>
        </section>
        <section className="flex gap-2 justify-end items-center max-md:justify-center">
          {redes.map((red) => (
            <Link key={red.href} href={red.href}>
              <red.icon className="size-6 text-white" />
            </Link>
          ))}
        </section>
      </section>
    </footer>
  );
};

export default Footer;

const TiktokLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const redes = [
  //   {
  //     label: "Facebook",
  //     href: "https://facebook.com",
  //     icon: FacebookIcon,
  //   },
  //   {
  //     label: "Twitter",
  //     href: "https://twitter.com",
  //     icon: TwitterIcon,
  //   },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sancocholabs/",
    icon: InstagramIcon,
  },
  {
    label: "Tiktok",
    href: "https://www.tiktok.com/@sancocholabs",
    icon: TiktokLogo,
  },
];
