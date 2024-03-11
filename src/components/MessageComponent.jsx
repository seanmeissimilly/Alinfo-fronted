import React from "react";

const MessageComponent = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <p className="text-gray-700">¡Hola! Este es un mensaje importante.</p>
      </div>
      <a
        href="https://www.example.com"
        className="text-blue-500 hover:underline mt-2 block"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ir al enlace
      </a>
    </div>
  );
};

export default MessageComponent;
