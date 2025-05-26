import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    costo: '',
    duracion: '',
    activo: true
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/Servicio');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aseguramos que duración siempre termine con ' minutos'
      let duracionText = formData.duracion.toString().trim();
      if (!duracionText.toLowerCase().endsWith('minutos')) {
        duracionText = `${duracionText} minutos`;
      }

      const serviceData = {
        ...formData,
        costo: parseFloat(formData.costo),
        duracion: duracionText
      };

      if (editingId) {
        await api.put(`/api/Servicio/${editingId}`, serviceData);
      } else {
        await api.post('/api/Servicio', serviceData);
      }

      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEdit = (service) => {
    // Extraemos solo el número de duración si viene con texto "30 minutos"
    let duracionNum = service.duracion;
    if (typeof duracionNum === 'string') {
      const matches = duracionNum.match(/\d+/);
      duracionNum = matches ? matches[0] : '';
    }

    setFormData({
      nombre: service.nombre,
      descripcion: service.descripcion || '',
      costo: service.costo.toString(),
      duracion: duracionNum.toString(),
      activo: service.activo
    });
    setEditingId(service.idServicio);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
      try {
        await api.delete(`/api/Servicio/${id}`);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const toggleServiceStatus = async (id, currentStatus) => {
    try {
      // Llamada PATCH para cambiar el estado activo/inactivo
      await api.patch(`/api/Servicio/${id}/status`, { activo: !currentStatus });
      fetchServices();
    } catch (error) {
      console.error('Error toggling service status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      costo: '',
      duracion: '',
      activo: true
    });
    setEditingId(null);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;
  };

  if (loading) return <div>Cargando servicios...</div>;

  return (
    <div style={styles.container}>
      <h2>Gestión de Servicios</h2>

      <div style={styles.formContainer}>
        <h3>{editingId ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Nombre del Servicio *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              maxLength="100"
            />
          </div>

          <div style={styles.formGroup}>
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows="3"
              maxLength="500"
            />
          </div>

          <div style={styles.formGroup}>
            <label>Costo (Q) *</label>
            <input
              type="number"
              name="costo"
              value={formData.costo}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Duración (minutos) *</label>
            <input
              type="number"
              name="duracion"
              value={formData.duracion}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleInputChange}
              />
              {' '}Activo
            </label>
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Actualizar Servicio' : 'Agregar Servicio'}
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
        <h3>Lista de Servicios</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Costo (Q)</th>
              <th>Duración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.idServicio}>
                <td>{service.idServicio}</td>
                <td>{service.nombre}</td>
                <td>{service.descripcion || 'N/A'}</td>
                <td>{service.costo.toFixed(2)}</td>
                <td>{service.duracion}</td>
                <td>
                  <span style={{
                    color: service.activo ? '#4CAF50' : '#f44336',
                    fontWeight: 'bold'
                  }}>
                    {service.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(service)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => toggleServiceStatus(service.idServicio, service.activo)}
                    style={{
                      ...styles.statusButton,
                      backgroundColor: service.activo ? '#ff9800' : '#4CAF50'
                    }}
                  >
                    {service.activo ? 'Desactivar' : 'Activar'}
                  </button>
                  <button
                    onClick={() => handleDelete(service.idServicio)}
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  formContainer: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'vertical',
    minHeight: '80px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    gridColumn: '1 / -1'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  tableContainer: {
    overflowX: 'auto',
    marginTop: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
    fontSize: '14px'
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    position: 'sticky',
    top: 0,
    background: 'white'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle'
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginRight: '5px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500'
  },
  statusButton: {
    padding: '6px 12px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginRight: '5px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500'
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500'
  },
  '@media (max-width: 768px)': {
    form: {
      gridTemplateColumns: '1fr'
    },
    table: {
      fontSize: '12px'
    },
    "th, td": {
      padding: '8px 4px'
    },
    button: {
      padding: '4px 8px',
      fontSize: '12px'
    }
  }
};

export default ServiceManagement;
