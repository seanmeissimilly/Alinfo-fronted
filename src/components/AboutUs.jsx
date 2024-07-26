import PropTypes from "prop-types";

const About = (username, email) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Información de contacto</h2>
      <p>Nombre de Usuario del Administrador: `${username}`</p>
      <a
        href={`mailto:${email}`}
        style={{
          color: "blue",
          textDecoration: "none",
          borderBottom: "1px dotted blue",
        }}
      >
        Correo: `${email}`
      </a>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Otros componentes */}
      <About />
    </div>
  );
};

About.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default AboutUs;
