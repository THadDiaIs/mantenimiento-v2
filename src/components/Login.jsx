import React, { useState } from 'react';

const LoginVehiculos = ({ handleLogin }) => {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://localhost:7020/api/Empleado/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contrasenia })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error de autenticación');
      }

      const data = await response.json();
      console.log('Login exitoso:', data);
      if (handleLogin) {
        handleLogin(data); 
      }

    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError(err.message);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1995/1995459.png" 
            alt="Logo Taller" 
            style={styles.logo}
          />
        </div>
        <h2 style={styles.title}>Sistema de Mantenimiento de Vehículos</h2>
        <p style={styles.subtitle}>Ingrese sus credenciales para acceder</p>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="correo" style={styles.label}>Correo</label>
          <input
            type="text"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ej: paulgomez@gmail.com"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="contrasenia" style={styles.label}>Contraseña</label>
          <input
            type="password"
            id="contrasenia"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Ingrese su contraseña"
            style={styles.input}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
        )}

        <button type="submit" style={styles.button}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    width: '400px',
    padding: '40px',
    textAlign: 'center'
  },
  header: {
    marginBottom: '32px'
  },
  logoContainer: {
    margin: '0 auto 16px',
    width: '80px',
    height: '80px',
    backgroundColor: '#e3f2fd',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '50px',
    height: '50px'
  },
  title: {
    color: '#2c3e50',
    fontSize: '22px',
    fontWeight: '600',
    margin: '0 0 8px'
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '14px',
    margin: '0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#34495e',
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #dfe6e9',
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'all 0.3s',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '10px'
  }
};

export default LoginVehiculos;
