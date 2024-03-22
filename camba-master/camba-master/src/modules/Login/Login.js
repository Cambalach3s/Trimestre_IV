import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir al usuario después del inicio de sesión
import axios from "axios";

const InputField = ({ label, type, id, name, value, onChange }) => {
  return (
    <div className="mb-4" style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={id} className="form-label fw-bold">{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control fw-bold"
        style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.50rem", padding: "0.4rem" }} 
        required
      />
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook useNavigate para redirigir al usuario después del inicio de sesión

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores al enviar el formulario

    try {
      // Enviar las credenciales al backend para iniciar sesión
       await axios.post("http://localhost:3001/login", {
        email,
        password
      });

      // Si el inicio de sesión es exitoso, redirige al usuario a la página de inicio
      navigate("/home");
    } catch (error) {
      // Si hay un error en el inicio de sesión, muestra un mensaje de error
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="container mt-4" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "3.5em", marginBottom: "0.5em", textAlign: "center" }}>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "0 auto", textAlign: "left" }}>
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <InputField
          label="Contraseña"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>} {/* Muestra el mensaje de error si existe */}
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>
            Iniciar Sesión
          </button>
        </div>
        <div style={{ marginTop: "40px" }}></div>
      </form>
    </div>
  );
};

export default Login;
