import React, { useState, useEffect } from 'react';
import heroImg from '../../assets/original.jpg';
import image2 from '../../assets/Flowers.jpeg';
import image3 from '../../assets/Gaban.jpeg';
import image4 from '../../assets/Chaqueta_azul.jpeg';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [heroImg, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }, 3000); // Cambia la imagen cada 3 segundos
    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <section className="text-white body-font mt-20 relative" style={{ margin: 0 }}>
      <div className="container-fluid px-0 position-relative" style={{ paddingLeft: 0 }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`card mb-3 text-bg-dark ${index !== currentImage ? 'd-none' : ''}`}
            style={{
              display: index === currentImage ? 'block' : 'none',
              transition: 'opacity 1s ease-in-out',
              opacity: '1',
            }}
          >
            <img
              src={image}
              className="card-img-top"
              alt={`image${index}`}
              style={{
                width: '100%',
                height: '1000px',
                objectFit: 'cover',
                transition: 'opacity 0.5s ease-in-out', // Transición más suave al cambiar de imagen
              }}
            />
          </div>
        ))}
        <div className="animated-text-container" style={{textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -150%)', zIndex: 2, overflow: 'hidden'}}>
          <h1 className="animated-text" style={{ fontSize: '4rem', fontWeight: 'bold', whiteSpace: 'nowrap', animation: 'moveLeft 10s linear infinite', display: 'block' }}>LO MAS NUEVO DE LA TEMPORADA</h1>
          <div style={{ textAlign: 'center' }}>
            <h2 className="animated-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>La moda se transforma en expresión y la diversidad es la clave de tu armario.</h2>
            <p className="animated-text" style={{ fontSize: '1rem', fontWeight: 'bold', display: 'block' }}><small className="text-body-secondary">CAMBALACHES</small></p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-center mt-10">
        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Todos los productos</button>
        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Mas informacion</button>
      </div>
      <style>
        {`
          @keyframes moveLeft {
            0% {
              transform: translateX(100%);
            }
            98% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          /* Media query para pantallas pequeñas */
          @media screen and (max-width: 768px) {
            .animated-text-container {
              top: 30%; /* Ajusta la posición vertical */
              left: 50%; /* Centra horizontalmente */
              transform: translate(-50%, -50%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
