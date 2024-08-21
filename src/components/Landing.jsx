import PropTypes from "prop-types";
import bookImage from "../media/bookImage.png";

export default function Landing() {
  return (
    <div className="relative bg-white mb-20">
      <div className="container mx-auto">
        <main className="mt-10 px-4">
          <div className="sm:text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              <span className="block xl:inline">AlInfo </span>
            </h2>
            <div className="flex items-center">
              <div className="flex-1">
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
              <img
                src={bookImage}
                alt="Book related to engineering and study"
                className="h-96 w-96 rounded-lg object-cover object-center"
              />
            </div>
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
