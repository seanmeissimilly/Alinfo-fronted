import React from "react";
import PropTypes from "prop-types";

const HomePage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <h1 className="text-3xl font-bold text-center my-8">
          Bienvenido a la AlInfo
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <Section title="Foro" link="/forum" />
          <Section title="Documentos" link="/documents" />
          <Section title="Videos" link="/videos" />
          <Section title="Herramientas" link="/tools" />
          <Section title="Quejas o Sugerencias" link="/suggestions" />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, link }) => (
  <div className="p-4 border rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-center mb-8">{title}</h2>
    <div className="flex justify-center">
      <a href={link} className="text-blue-500 hover:underline text-center">
        Ir a {title}
      </a>
    </div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default HomePage;
