import React from 'react';

const LoginVehiculos = ({handleLogin}) => {

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
          <h2 style={styles.title}>Sistema de Mantenimiento de Vehiculos</h2>
          <p style={styles.subtitle}>Ingrese sus credenciales para acceder</p>
        </div>

        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="usuario" style={styles.label}>Usuario</label>
            <input
              type="text"
              id="usuario"
              placeholder="Ej: paulgomez"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="contrasena" style={styles.label}>Contraseña</label>
            <input
              type="password"
              id="contraseña"
              placeholder="Ingrese su contraseña"
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button} onClick={handleLogin}>
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
  inputFocus: {
    borderColor: '#3498db',
    boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.1)'
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
  },
  buttonHover: {
    backgroundColor: '#2980b9'
  },
  link: {
    color: '#3498db',
    fontSize: '13px',
    textDecoration: 'none',
    transition: 'all 0.3s'
  },
  linkHover: {
    textDecoration: 'underline'
  },
  separator: {
    color: '#bdc3c7',
    fontSize: '12px'
  }
};

export default LoginVehiculos;