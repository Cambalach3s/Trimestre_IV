import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Importa Navigate
import { useLoginMutation } from "../../services/authServices";

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
  const navigate = useNavigate (); // Hook useNavigate para redirigir al usuario después del inicio de sesión
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para indicar si se está realizando la solicitud
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para indicar si el usuario está autenticado

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const response = await axios.post("http://localhost:3001/login", { email, password });
  //     console.log('Respuesta del servidor:', response.data); // Agrega este console.log para verificar la respuesta del servidor
  //     setIsLoggedIn(true);
  //   } catch (error) {
  //     console.error("Error al iniciar sesión:", error);
  //     setError("Correo electrónico o contraseña incorrectos");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Si el usuario está autenticado, redirige a la página de inicio
  // if (isLoggedIn) {
  //   return <Navigate to="/home" />;
  // }
  const { mutateAsync } = useLoginMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = { email, password };
      const data = await mutateAsync(formData);
      navigate("/home");
    } catch (error) {
      alert(error.message);
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
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem 1rem", cursor: loading ? "not-allowed" : "pointer" }} disabled={loading}>
            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </div>
        <div style={{ marginTop: "40px" }}></div>
      </form>
    </div>
  );
};

export default Login;
