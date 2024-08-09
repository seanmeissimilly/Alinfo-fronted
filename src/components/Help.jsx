import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FaChevronDown } from "react-icons/fa";

export default function Help() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAboutClick = () => {
    navigate("/about");
  };

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    { question: "Pregunta 1", answer: "Respuesta a la pregunta 1." },
    { question: "Pregunta 2", answer: "Respuesta a la pregunta 2." },
    { question: "Pregunta 3", answer: "Respuesta a la pregunta 3." },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Página de Ayuda</h1>
      <p className="text-gray-700 mb-2">
        Bienvenido a la página de ayuda. Aquí encontrarás respuestas a las
        preguntas más frecuentes.
      </p>
      <ul className="list-none">
        {questions.map((item, index) => (
          <li key={index} className="mb-2">
            <Button
              onClick={() => toggleDropdown(index)}
              className="w-full text-left focus:outline-none bg-transparent hover:bg-gray-100"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-black">
                  {item.question}
                </span>
                <FaChevronDown
                  className={`w-5 h-5 ml-2 transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
            </Button>
            {activeIndex === index && (
              <div className="mt-2 p-2 bg-gray-50 rounded transition-all duration-300">
                {item.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="text-gray-700 mt-4">
        Si tienes más preguntas, no dudes en contactarnos.
      </p>
      <Button
        onClick={handleAboutClick}
        className="mt-2 group relative flex justify-end rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 normal-case"
      >
        Ir a Acerca de
      </Button>
    </div>
  );
}
