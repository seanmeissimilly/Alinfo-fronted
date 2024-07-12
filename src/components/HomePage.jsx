import React from "react";

const HomePage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <h1 className="text-3xl font-bold text-center my-8">
          Bienvenido a la AlInfo
        </h1>
        <div className="space-y-8">
          <Section title="Foro" link="/forum" />
          <Section title="Documentos" link="/documents" />
          <Section title="Videos" link="/multimedia" />
          <Section title="Aplicaciones" link="/apps" />
          <Section title="Quejas o Sugerencias" link="/suggestions" />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, link }) => (
  <div className="p-4 border rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <a href={link} className="text-blue-500 hover:underline">
      Ir a {title}
    </a>
  </div>
);

export default HomePage;
