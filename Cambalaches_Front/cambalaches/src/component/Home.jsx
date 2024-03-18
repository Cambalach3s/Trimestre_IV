import React, {useState,useEffect} from "react";
import Products from "./Products";


const Home = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgrounds = [
    "/assets/bg.jpg",
    "/assets/Chaqueta_Blanca2.jpeg",
    "/assets/Conjunto.jpeg",
    "/assets/Flowers.jpeg",
    "/assets/Gaban.jpeg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prevIndex =>
        prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia la imagen cada 5 segundos

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <div className="hero">
      <div className="card text-bg-dark text-white border-0">
        <img
           src={backgrounds[backgroundIndex]}
          className="card-img"
          alt="Background"
          height="999px"
          style={{ animation: "slide 10s linear infinite" }} // Ajusta la duración del movimiento y la dirección
        />
        <div className="card-img-overlay d-flex flex-column justify-content-center">
          <div className="container">
            <h5 className="card-title display-3 fw-bolder mb-0">
              LO MAS NUEVO DE LA TEMPORADA
            </h5>
            <p className="card-text lead fs-2">
              La moda se transforma en expresión y la diversidad es la clave de
              tu armario.
            </p>
          </div>
        </div>
      </div>
      <Products/>
    </div>
  );
};

export default Home;