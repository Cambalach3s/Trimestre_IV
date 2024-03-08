import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:3001/productos");
      if (componentMounted) {
        const products = await response.json();
        setData(products);
        setFilter(products); // Establece el filtro inicial como todos los productos
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };


  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => ((category) => {
              switch (category) {
                case "Todos":
                  setFilter(data);
                  break;
                case "Hombres":
                  setFilter(data.filter((x) => x.category === "men's clothing"));
                  break;
                case "Mujeres":
                  setFilter(data.filter((x) => x.category === "women's clothing"));
                  break;
                case "Joyas":
                  setFilter(data.filter((x) => x.category === "jewelery"));
                  break;
                case "Electronicos":
                  setFilter(data.filter((x) => x.category === "electronics"));
                  break;
                default:
                  setFilter(data);
                  break;
              }
            })("Todos")}
          >
            Todos
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => ((category) => {
              switch (category) {
                case "Todos":
                  setFilter(data);
                  break;
                case "Hombres":
                  setFilter(data.filter((x) => x.category === "men's clothing"));
                  break;
                case "Mujeres":
                  setFilter(data.filter((x) => x.category === "women's clothing"));
                  break;
                case "Joyas":
                  setFilter(data.filter((x) => x.category === "jewelery"));
                  break;
                case "Electronicos":
                  setFilter(data.filter((x) => x.category === "electronics"));
                  break;
                default:
                  setFilter(data);
                  break;
              }
            })("Hombres")}
          >
            Hombres
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => ((category) => {
              switch (category) {
                case "Todos":
                  setFilter(data);
                  break;
                case "Hombres":
                  setFilter(data.filter((x) => x.category === "men's clothing"));
                  break;
                case "Mujeres":
                  setFilter(data.filter((x) => x.category === "women's clothing"));
                  break;
                case "Joyas":
                  setFilter(data.filter((x) => x.category === "jewelery"));
                  break;
                case "Electronicos":
                  setFilter(data.filter((x) => x.category === "electronics"));
                  break;
                default:
                  setFilter(data);
                  break;
              }
            })("Mujeres")}
          >
            Mujeres
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => ((category) => {
              switch (category) {
                case "Todos":
                  setFilter(data);
                  break;
                case "Hombres":
                  setFilter(data.filter((x) => x.category === "men's clothing"));
                  break;
                case "Mujeres":
                  setFilter(data.filter((x) => x.category === "women's clothing"));
                  break;
                case "Joyas":
                  setFilter(data.filter((x) => x.category === "jewelery"));
                  break;
                case "Electronicos":
                  setFilter(data.filter((x) => x.category === "electronics"));
                  break;
                default:
                  setFilter(data);
                  break;
              }
            })("Joyas")}
          >
            Joyas
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => ((category) => {
              switch (category) {
                case "Todos":
                  setFilter(data);
                  break;
                case "Hombres":
                  setFilter(data.filter((x) => x.category === "men's clothing"));
                  break;
                case "Mujeres":
                  setFilter(data.filter((x) => x.category === "women's clothing"));
                  break;
                case "Joyas":
                  setFilter(data.filter((x) => x.category === "jewelery"));
                  break;
                case "Electronicos":
                  setFilter(data.filter((x) => x.category === "electronics"));
                  break;
                default:
                  setFilter(data);
                  break;
              }
            })("Electronicos")}
          >
            Electrónicos
          </button>
        </div>
        {filter.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 text-center p-4">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                height="300px"
              />
              <div className="card-body">
                <h5 className="card-title mb-0">
                  {product.title.substring(0, 12)}...
                </h5>
                <p className="card-text lead fw-bold">${product.price}</p>
                <button className="btn btn-outline-dark">
                  Comprar Ahora
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">
              Lista de productos
            </h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
