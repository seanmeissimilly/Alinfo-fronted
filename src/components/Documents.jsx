import React from "react";
import Document from "./Document";

function Documents() {
  const documents = [
    {
      name: "Documento PDF",
      description: "Este es un documento PDF.",
      type: "tesis",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.pdf",
    },
    {
      name: "Documento Word",
      description: "Este es un documento Word.",
      type: "doctorado",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.docx",
    },
    {
      name: "Documento Word",
      description: "Este es un documento Word.",
      type: "doctorado",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.docx",
    },
    {
      name: "Documento Word",
      description: "Este es un documento Word.",
      type: "doctorado",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.docx",
    },
    {
      name: "Documento Word",
      description: "Este es un documento Word.",
      type: "doctorado",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.docx",
    },
    {
      name: "Documento Word",
      description: "Este es un documento Word.",
      type: "doctorado",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.docx",
    },
    {
      name: "Documento Word",
      description: "Este es un documento Word.",
      type: "doctorado",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.docx",
    },
    {
      name: "Documento Word",
      description: "Este es un documento Word.",
      type: "doctorado",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.docx",
    },
    {
      name: "Documento Word",
      description: "Este es un documento Word.",
      type: "doctorado",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.docx",
    },
    {
      name: "Documento Word",
      description: "Este es un documento Word.",
      type: "doctorado",
      classification: "encapsulado",
      user: "davidam",
      downloadLink: "/path/to/document.docx",
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {documents.map((doc, index) => (
          <Document
            key={index}
            name={doc.name}
            description={doc.description}
            type={doc.type}
            classification={doc.classification}
            user={doc.user}
            downloadLink={doc.link}
          />
        ))}
      </div>
    </div>
  );
}

export default Documents;
