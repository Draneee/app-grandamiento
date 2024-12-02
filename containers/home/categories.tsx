import Link from "next/link";
import React from "react";

const Categories = () => {
  const categoriesFlated = data.flatMap((category) => category.value);
  return (
    <section className="container mx-auto my-10 max-md:px-6">
      <ul className="grid md:grid-cols-3 gap-4 h-max max-md:max-w-lg max-md:mx-auto text-center">
        {categoriesFlated.map((category, index) => (
          <Link
            href={category.url}
            className="grid gap-2 group cursor-pointer h-max overflow-hidden"
            key={index}
          >
            <section className="max-md:aspect-video aspect-square bg-black/10 rounded"></section>
            <p className="text-base group-hover:underline">{category.label}</p>
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
        img: "",
        url: "/",
        // url: "/categoria/reto-30-dias",
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
