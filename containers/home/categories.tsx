import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = () => {
  const categoriesFlated = data.flatMap((category) => category.value);
  return (
    <section className="container mx-auto mt-10 max-md:px-6">
      <ul className="flex justify-center items-center gap-4 h-max max-md:max-w-lg max-md:mx-auto text-center">
        {categoriesFlated.map((category, index) => (
          <Link
            className="grid gap-2 group h-max overflow-hidden max-w-[330px] size-full"
            key={index}
            href={category.url}
          >
            <section className="max-md:aspect-video aspect-square border-2 border-secondary bg-secondary rounded-2xl grid place-items-center overflow-hidden">
              {/* <span className="text-2xl font-semibold">Proximamente...</span> */}

              <section className="object-cover relative size-80">
                <Image
                  src={category.img}
                  alt={category.label}
                  fill
                  className=""
                />
              </section>
            </section>
            <p className="text-base group-hover:underline font-medium">
              {category.label}
            </p>
          </Link>
        ))}
        <ul />
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
      </ul>
    </section>
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
  //   label: "Dura mas en la cama",
  //   value: [
  //     {
  //       label: "Ejercicios para prolongar la duracion",
  //       img: "",
  //     },
  //   ],
  // },
  // {
  //   label: 'Poses para que "ella" solo piense en ti',
  //   value: [
  //     {
  //       label: "Top 3 poses para hacerlas venir",
  //       img: "",
  //     },
  //   ],
  // },
];
