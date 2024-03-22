import React, { useState, useEffect } from "react";
import { useSignUp } from "../../hook/useSignUp";
import useInputChange from "../../hook/useInputChange";
import axios from "axios";

const InputField = ({ label, type, id, name, value, onChange, children }) => {
  return (
    <div className="mb-1">
      <label htmlFor={id} className="form-label" style={{ textAlign: "left" }}>
        {label}
      </label>
      {type === "select" ? (
        <select
          className="form-select"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "0.25rem",
          }}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          className="form-control"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "0.3rem",
            marginBottom: "1rem",
            border: "2px solid #ccc",
            borderRadius: "0.25rem",
          }}
        />
      )}
    </div>
  );
};

const Register = () => {
  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:3001/usuarios/agregar", values);
      alert("Usuario registrado correctamente");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario. Por favor, inténtalo de nuevo.");
    }
  };

  const { formik } = useSignUp(handleSubmit);

  const handleEmailChange = useInputChange(formik, "email");
  const handlePasswordChange = useInputChange(formik, "password");
  const handleFirstNameChange = useInputChange(formik, "nom_persona");
  const handleLastNameChange = useInputChange(formik, "apell_persona");
  const handleTipoDocumentoChange = useInputChange(formik, "pk_fk_tdoc"); // Cambiado a pk_fk_tdoc

  const [tiposDocumento, setTiposDocumento] = useState([]);

  const fetchTiposDocumento = async () => {
    try {
      const response = await fetch("http://localhost:3001/tipo_documento/");
      const data = await response.json();
      setTiposDocumento(data);
    } catch (error) {
      console.error("Error al obtener los tipos de documento:", error);
    }
  };

  useEffect(() => {
    fetchTiposDocumento();
  }, []);

  return (
    <div className="container mt-4" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "3.5em", marginBottom: "0.5em", textAlign: "center" }}>Registro</h1>
      <form onSubmit={formik.handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", textAlign: "left" }}>
        <InputField
          label="Tipo de Documento"
          type="select"
          id="tipoDocumento"
          name="tipoDocumento"
          value={formik.values.pk_fk_tdoc} // Cambiado a pk_fk_tdoc
          onChange={handleTipoDocumentoChange} // Cambiado a handleTipoDocumentoChange
        >
          <option value="">Seleccione un tipo de documento</option>
          {tiposDocumento.map((tipo) => (
            <option key={tipo.tdoc} value={tipo.tdoc}>
              {tipo.desc_tdoc}
            </option>
          ))}
        </InputField>
        <InputField
          label="Número de Identificación"
          type="text"
          id="numeroIdentificacion"
          name="numeroIdentificacion"
          value={formik.values.id_usuario}
          onChange={useInputChange(formik, "id_usuario")}
        />
        {formik.touched.id_usuario && formik.errors.id_usuario && (
          <span style={{ color: "red" }}>{formik.errors.id_usuario}</span>
        )}
        <InputField
          label="Primer Nombre"
          type="text"
          id="primerNombre"
          name="primerNombre"
          value={formik.values.nom_persona}
          onChange={handleFirstNameChange}
        />
        {formik.touched.nom_persona && formik.errors.nom_persona && (
          <span style={{ color: "red" }}>{formik.errors.nom_persona}</span>
        )}
        <InputField
          label="Primer Apellido"
          type="text"
          id="primerApellido"
          name="primerApellido"
          value={formik.values.apell_persona}
          onChange={handleLastNameChange}
        />
        {formik.touched.apell_persona && formik.errors.apell_persona && (
          <span style={{ color: "red" }}>{formik.errors.apell_persona}</span>
        )}
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={handleEmailChange}
        />
        {formik.touched.email && formik.errors.email && (
          <span style={{ color: "red" }}>{formik.errors.email}</span>
        )}
        <InputField
          label="Contraseña"
          type="password"
          id="contraseña"
          name="contraseña"
          value={formik.values.password}
          onChange={handlePasswordChange}
        />
        {formik.touched.password && formik.errors.password && (
          <span style={{ color: "red" }}>{formik.errors.password}</span>
        )}
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Registrarse
          </button>
        </div>
        <div style={{ marginTop: "40px" }}></div>
      </form>
    </div>
  );
};

export default Register;
