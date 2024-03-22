import React, { useState } from "react";
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
  const navigate = useNavigate(); // Hook useNavigate para redirigir al usuario después del inicio de sesión
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para indicar si se está realizando la solicitud
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const { mutateAsync } = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = { email, password };
      console.log('Datos a enviar:', formData);
      await mutateAsync(formData);
      console.log('Redirigiendo a /Home...'); // Agrega este console.log para verificar si se está llamando a la redirección
      navigate("/Home"); // Aquí intentas redirigir al usuario a la página de inicio
      setSuccessMessage('¡Inicio de sesión exitoso!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
        {successMessage && <div style={{ color: "green", marginBottom: "10px" }}>{successMessage}</div>}
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
