import PropTypes from "prop-types";

export default function Landing() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container mx-auto">
        <main className="mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">AlInfo </span>
            </h2>
            <StyledParagraph>
              Repositorio Virtual de Ingeniería Alimentaria.
            </StyledParagraph>
            <StyledParagraph>
              Facultad de Ingeniería Química, Cujae.
            </StyledParagraph>
            <StyledParagraph>
              Universidad Tecnológica de la Habana.
            </StyledParagraph>
          </div>
        </main>
      </div>
    </div>
  );
}

function StyledParagraph({ children }) {
  return (
    <p className="mt-3 text-lg text-gray-700 font-semibold sm:mx-auto sm:mt-5 sm:max-w-xl md:mt-5 md:text-xl lg:mx-0">
      {children}
    </p>
  );
}

StyledParagraph.propTypes = {
  children: PropTypes.string.isRequired,
};
