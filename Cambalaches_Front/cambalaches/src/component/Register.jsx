import React, { useState, useEffect } from "react";

const Register = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    tipoDocumento: "",
    numeroIdentificacion: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    direccion: "",
    telefono: "",
    email: "",
    contraseña: "",
  });

  // Estado para almacenar los tipos de documento
  const [tiposDocumento, setTiposDocumento] = useState([]);

  // Manejador de cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log("Datos del formulario:", formData);
    // Por ejemplo, puedes enviar los datos a tu backend para procesarlos
  };

  // Función para obtener los tipos de documento desde el backend
  const fetchTiposDocumento = async () => {
    try {
      const response = await fetch("http://localhost:3001/tipo_documento");
      const data = await response.json();
      setTiposDocumento(data);
    } catch (error) {
      console.error("Error al obtener los tipos de documento:", error);
    }
  };

  // Efecto para obtener los tipos de documento al cargar el componente
  useEffect(() => {
    fetchTiposDocumento();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="mb-3">
          <label htmlFor="tipoDocumento" className="form-label">
            Tipo de Documento
          </label>
          <select
            className="form-select"
            id="tipoDocumento"
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un tipo de documento</option>
            {tiposDocumento.map((tipo) => (
              <option key={tipo.id} value={tipo.nombre}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="numeroIdentificacion" className="form-label">
            Número de Identificación
          </label>
          <input
            type="text"
            className="form-control"
            id="numeroIdentificacion"
            name="numeroIdentificacion"
            value={formData.numeroIdentificacion}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="primerNombre" className="form-label">
            Primer Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="primerNombre"
            name="primerNombre"
            value={formData.primerNombre}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="segundoNombre" className="form-label">
            Segundo Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="segundoNombre"
            name="segundoNombre"
            value={formData.segundoNombre}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="primerApellido" className="form-label">
            Primer Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="primerApellido"
            name="primerApellido"
            value={formData.primerApellido}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="segundoApellido" className="form-label">
            Segundo Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="segundoApellido"
            name="segundoApellido"
            value={formData.segundoApellido}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
