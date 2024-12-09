import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = () => {
  const categoriesFlated = data.flatMap((category) => category.value);

  return (
    <article className="container mx-auto my-10 max-md:px-6">
      <header className="text-center mb-16">
        <h2 className="text-6xl max-md:text-4xl font-semibold mb-4 font-mono">
          ¡Métodos que sí funcionan! 🍆
        </h2>
        {/* <p className="text-2xl max-md:text-xs max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod, voluptate, quae voluptatem quas
        </p> */}
      </header>

      <ul className="flex justify-center items-center gap-4 h-max max-md:max-w-lg max-md:mx-auto text-center">
        {categoriesFlated.map((category, index) => (
          <Link
            className="grid gap-2 group h-max overflow-hidden max-w-[330px] size-full"
            key={index}
            href={category.url}
          >
            <figure className="max-md:aspect-video aspect-square border-2 border-secondary bg-secondary rounded-2xl grid place-items-center overflow-hidden group-hover:border-primary transition-all duration-300">
              {/* <span className="text-2xl font-semibold">Proximamente...</span> */}
              <div className="object-cover relative size-full p-4">
                <Image
                  src={category.img}
                  alt={category.label}
                  fill
                  className="transition-transform group-hover:scale-105"
                />
              </div>
            </figure>
            <div className="space-y-2">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {category.label}{" "}😎
              </h3>
              {/* <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit 😎
              </p> */}
            </div>
          </Link>
        ))}
      </ul>

      {/* <ul className="grid gap-4 list-disc list-inside"> */}

      {/* {data.map((category, index) => (
          <li key={index} className="grid gap-2">
            <section className="flex gap-2 items-center -ms-3">
              <HeartHandshake />
              <p className="font-medium text-2xl">{category.label}</p>
            </section>
            <section className="flex w-full">
              {category.value.map((item, index) => (
                <article
                  className="grid max-w-96 w-full gap-2 group cursor-pointer"
                  key={index}
                >
                  <section className="aspect-video bg-black/10 rounded"></section>
                  <p className="text-base group-hover:underline">
                    {item.label}
                  </p>
                </article>
              ))}
            </section>
          </li>
        ))} */}
    </article>
  );
};

export default Categories;

const data = [
  {
    label: "Agranda tu pene",
    value: [
      {
        label: "Agranda tu pene en 30 dias",
        img: "https://res.cloudinary.com/dfi9lz3xh/image/upload/v1733195517/Strolling_Character_fe6acv.svg",
        // url: "/",
        url: "/categoria/reto-30-dias",
      },
    ],
  },
  // {
  //   label: "Lorem ipsum dolor",
  //   value: [
  //     {
  //       label: "Lorem ipsum dolor sit amet",
  //       img: "",
  //     },
  //   ],
  // },
  // {
  //   label: "Lorem ipsum dolor sit",
  //   value: [
  //     {
  //       label: "Lorem ipsum dolor sit amet",
  //       img: "",
  //     },
  //   ],
  // },
];
