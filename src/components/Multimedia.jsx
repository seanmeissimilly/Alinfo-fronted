import React from "react";
import Video from "./Video";

const Multimedia = () => {
  const videoData = [
    {
      title: "Mi Video de Ejemplo",
      description:
        "Este es un video de ejemplo para mostrar cómo funciona el componente.",
      classification: "Educativo",
      user: "Juan Pérez",
      videoLink: "https://www.example.com/video.mp4",
      date: "2024-07-15",
    },
    {
      title: "Mi Video de Ejemplo",
      description:
        "Este es un video de ejemplo para mostrar cómo funciona el componente.",
      classification: "Educativo",
      user: "Juan Pérez",
      videoLink: "https://www.example.com/video.mp4",
      date: "2024-07-15",
    },
    {
      title: "Mi Video de Ejemplo",
      description:
        "Este es un video de ejemplo para mostrar cómo funciona el componente.",
      classification: "Educativo",
      user: "Juan Pérez",
      videoLink: "https://www.example.com/video.mp4",
      date: "2024-07-15",
    },
    {
      title: "Mi Video de Ejemplo",
      description:
        "Este es un video de ejemplo para mostrar cómo funciona el componente.",
      classification: "Educativo",
      user: "Juan Pérez",
      videoLink: "https://www.example.com/video.mp4",
      date: "2024-07-15",
    },
    {
      title: "Mi Video de Ejemplo",
      description:
        "Este es un video de ejemplo para mostrar cómo funciona el componente.",
      classification: "Educativo",
      user: "Juan Pérez",
      videoLink: "https://www.example.com/video.mp4",
      date: "2024-07-15",
    },
    {
      title: "Mi Video de Ejemplo",
      description:
        "Este es un video de ejemplo para mostrar cómo funciona el componente.",
      classification: "Educativo",
      user: "Juan Pérez",
      videoLink: "https://www.example.com/video.mp4",
      date: "2024-07-15",
    },
    {
      title: "Mi Video de Ejemplo",
      description:
        "Este es un video de ejemplo para mostrar cómo funciona el componente.",
      classification: "Educativo",
      user: "Juan Pérez",
      videoLink: "https://www.example.com/video.mp4",
      date: "2024-07-15",
    },
    {
      title: "Mi Video de Ejemplo",
      description:
        "Este es un video de ejemplo para mostrar cómo funciona el componente.",
      classification: "Educativo",
      user: "Juan Pérez",
      videoLink: "https://www.example.com/video.mp4",
      date: "2024-07-15",
    },
    {
      title: "Mi Video de Ejemplo",
      description:
        "Este es un video de ejemplo para mostrar cómo funciona el componente.",
      classification: "Educativo",
      user: "Juan Pérez",
      videoLink: "https://www.example.com/video.mp4",
      date: "2024-07-15",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoData.map((index) => (
          <Video
            key={index}
            title={videoData.title}
            description={videoData.description}
            classification={videoData.classification}
            user={videoData.user}
            videoLink={videoData.videoLink}
            date={videoData.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Multimedia;
