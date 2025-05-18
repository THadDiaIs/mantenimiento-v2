import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserManagement = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
      idUsuario: null,
      nombreCompleto: '',
      telefono: '',
      correo: '',
      direccion: '',
      fechaRegistro: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/api/Usuario');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage('');
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.NombreCompleto || !formData.Telefono || !formData.Direccion) {
    setErrorMessage('Nombre, teléfono y dirección son obligatorios');
    return;
  }

  try {
    // Crear objeto JSON exacto para enviar
    const usuarioToSend = {
      idUsuario: editingId || 0,
      nombreCompleto: formData.NombreCompleto,
      telefono: formData.Telefono,
      correo: formData.Correo || null,
      direccion: formData.Direccion,
      fechaRegistro: formData.FechaRegistro
        ? new Date(formData.FechaRegistro).toISOString()
        : new Date().toISOString(),
      vehiculos: null, 
    };

    if (editingId) {
      await api.put(`/api/Usuario/${editingId}`, usuarioToSend);
    } else {
      const { idUsuario, ...usuarioCrear } = usuarioToSend;
      await api.post('/api/Usuario', usuarioCrear);
    }

    fetchUsuarios();
    resetForm();
  } catch (error) {
    console.error('Error saving usuario:', error);
    setErrorMessage(error.response?.data?.message || 'Error al guardar el usuario');
  }
};


  const handleEdit = (usuario) => {
    setFormData({
      IdUsuario: usuario.idUsuario,
      NombreCompleto: usuario.nombreCompleto,
      Telefono: usuario.telefono,
      Correo: usuario.correo || '',
      Direccion: usuario.direccion,
      FechaRegistro: usuario.fechaRegistro ? usuario.fechaRegistro.split('T')[0] : '',
    });
    setEditingId(usuario.idUsuario);
    setErrorMessage('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await api.delete(`/api/Usuario/${id}`);
        fetchUsuarios();
      } catch (error) {
        console.error('Error deleting usuario:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      IdUsuario: null,
      NombreCompleto: '',
      Telefono: '',
      Correo: '',
      Direccion: '',
      FechaRegistro: '',
    });
    setEditingId(null);
    setErrorMessage('');
  };

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div style={styles.container}>
      <h2>Gestión de Usuarios</h2>

      <div style={styles.formContainer}>
        <h3>{editingId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Nombre Completo *</label>
            <input
              type="text"
              name="NombreCompleto"
              value={formData.NombreCompleto}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Teléfono *</label>
            <input
              type="text"
              name="Telefono"
              value={formData.Telefono}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Correo</label>
            <input
              type="email"
              name="Correo"
              value={formData.Correo}
              onChange={handleInputChange}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Dirección *</label>
            <input
              type="text"
              name="Direccion"
              value={formData.Direccion}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Fecha Registro</label>
            <input
              type="date"
              name="FechaRegistro"
              value={formData.FechaRegistro}
              onChange={handleInputChange}
              disabled={!!editingId} // Si quieres que no se modifique al editar
            />
          </div>

          {errorMessage && (
            <div style={styles.errorMessage}>
              {errorMessage}
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={styles.cancelButton}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.tableContainer}>
        <h3>Lista de Usuarios</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>
                <td>{usuario.nombreCompleto}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.correo || '-'}</td>
                <td>{usuario.direccion}</td>
                <td>{new Date(usuario.fechaRegistro).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(usuario)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(usuario.idUsuario)}
                    style={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '15px',
    marginTop: '15px',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  errorMessage: {
    gridColumn: '1 / -1',
    color: '#f44336',
    backgroundColor: '#ffebee',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '5px',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    gridColumn: '1 / -1',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  tableContainer: {
    overflowX: 'auto',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
    fontSize: '14px',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UserManagement;