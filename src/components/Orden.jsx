import React, { useEffect, useState } from 'react';
import api from '../services/api';

const FormularioOrden = ({ orden, onSave, onCancel }) => {
  const [formData, setFormData] = useState(orden || {
    idVehiculo: '',
    idEmpleado: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    fechaSalida: '',
    estado: 'Pendiente',
    observaciones: '',
  });

  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [empleado, setEmpleado] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empleadoRes, servicioRes, vehiculosRes] = await Promise.all([
          api.get('/api/Empleado'),
          api.get('/api/Servicio'),
          api.get('/api/Vehiculo'),
        ]);

        setEmpleado(empleadoRes.data);
        setServices(servicioRes.data);
        setVehicles(vehiculosRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSave = async (ordenData) => {
  try {
    if (ordenData.id) {
      await api.put(`/api/Orden/${ordenData.id}`, ordenData);
    } else {
      await api.post('/api/Orden', ordenData);
    }

    alert('Orden guardada correctamente');
  } catch (error) {
    console.error('Error guardando la orden:', error);
    alert('Hubo un error al guardar la orden');
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(" los datos ", formData)
    handleSave(formData);
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div style={styles.modalContent}>
      <h2 style={styles.title}>
        {orden ? 'Editar Orden' : 'Nueva Orden de Mantenimiento'}
        <button onClick={onCancel} style={styles.closeButton}>&times;</button>
      </h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.section}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tipo de Vehículo *</label>
            <select
              name="idVehiculo"
              value={formData.idVehiculo}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Seleccionar tipo</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.idVehiculo}>{v.tipo}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Empleado para Orden *</label>
            <select
              name="idEmpleado"
              value={formData.idEmpleado}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Seleccionar Empleado</option>
              {empleado.map(e => (
                <option key={e.id} value={e.idEmpleado}>{e.nombre}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Tipo de Mantenimiento *</label>
            <select
              name="servicioId"
              value={formData.servicioId}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Seleccionar tipo mantenimiento</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>
        </div>


        <div style={styles.section}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha de Ingreso *</label>
            <input
              type="date"
              name="fechaIngreso"
              value={formData.fechaIngreso}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha de Salida Estimada</label>
            <input
              type="date"
              name="fechaSalida"
              value={formData.fechaSalida}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Estado *</label>
          <div style={styles.radioGroup}>
            {['Pendiente', 'En Proceso', 'Completado', 'Cancelado'].map(estado => (
              <label key={estado} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="estado"
                  value={estado}
                  checked={formData.estado === estado}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                <span>{estado}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Observaciones</label>
          <textarea
            rows={4}
            style={styles.textarea}
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            placeholder="Detalles del mantenimiento requerido..."
          />
        </div>

        <div style={{ ...styles.section, ...styles.paymentSection }}>
          <h3 style={styles.subtitle}>Información de Pago</h3>
          <div style={styles.paymentFields}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Método de Pago</label>
              <select
                name="metodoPago"
                value={formData.metodoPago}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Seleccionar método</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Monto Estimado (Q)</label>
              <input
                type="number"
                name="montoEstimado"
                value={formData.montoEstimado}
                onChange={handleChange}
                step="0.01"
                style={styles.input}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={onCancel}
            style={styles.cancelButton}
          >
            Cancelar
          </button>
          <button type="submit" style={styles.submitButton}>
            {orden ? 'Actualizar Orden' : 'Crear Orden'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Estilos
const styles = {
  // Estilos para el contenedor principal
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },

  // Estilos para el encabezado
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  },

  pageTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0
  },

  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#2980b9',
      transform: 'translateY(-1px)'
    }
  },

  // Estilos para los filtros
  filtersContainer: {
    marginBottom: '24px',
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },

  searchBox: {
    position: 'relative',
    marginBottom: '16px',
    maxWidth: '400px'
  },

  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d'
  },

  searchInput: {
    width: '100%',
    padding: '10px 16px 10px 40px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'all 0.2s',
    ':focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,0.25)',
      outline: 'none'
    }
  },

  filterGroup: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  filterLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '500',
    color: '#495057',
    marginRight: '8px'
  },

  filterSelect: {
    padding: '8px 12px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    backgroundColor: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '180px'
  },

  dateFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  dateInput: {
    padding: '8px 12px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px'
  },

  // Estilos para la tabla
  tableContainer: {
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    marginBottom: '24px'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },

  th: {
    backgroundColor: '#f8f9fa',
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#495057',
    borderBottom: '2px solid #dee2e6',
    whiteSpace: 'nowrap'
  },

  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #e9ecef',
    verticalAlign: 'middle'
  },

  tr: {
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f8f9fa'
    }
  },

  // Estilos para el badge de estado
  statusBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize'
  },

  // Estilos para los botones de acción
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },

  actionButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6c757d',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      backgroundColor: '#f1f3f5',
      color: '#343a40'
    }
  },

  // Estilos para el modal del formulario
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
    overflowY: 'auto'
  },

  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    padding: '24px'
  },

  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6c757d',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.2s',
    ':hover': {
      color: '#343a40',
      backgroundColor: '#f1f3f5'
    }
  },

  // Estilos para el formulario
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #eee'
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#444',
    marginBottom: '16px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'all 0.3s',
    ':focus': {
      borderColor: '#4a90e2',
      boxShadow: '0 0 0 3px rgba(74,144,226,0.2)'
    }
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#fff',
    transition: 'all 0.3s',
    ':focus': {
      borderColor: '#4a90e2',
      boxShadow: '0 0 0 3px rgba(74,144,226,0.2)'
    }
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'all 0.3s',
    ':focus': {
      borderColor: '#4a90e2',
      boxShadow: '0 0 0 3px rgba(74,144,226,0.2)'
    }
  },
  radioGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  radioInput: {
    margin: '0'
  },
  paymentSection: {
    paddingTop: '20px',
    borderTop: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  paymentFields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    paddingTop: '20px',
    borderTop: '1px solid #eee'
  },
  cancelButton: {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#fff',
    color: '#555',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  submitButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#3a7bc8'
    }
  }
};

export default FormularioOrden;