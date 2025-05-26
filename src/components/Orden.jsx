import React, { useEffect, useState } from 'react';
import api from '../services/api';

const FormularioOrden = ({ orden, onSave, onCancel }) => {
  const [formData, setFormData] = useState(orden || {
    idVehiculo: '',
    idEmpleado: '',
    servicioId: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    fechaSalida: '',
    estado: 'Pendiente',
    observaciones: '',
    metodoPago: '',
    montoEstimado: ''
  });

  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empleadosRes, serviciosRes, vehiculosRes] = await Promise.all([
          api.get('/api/Empleado'),
          api.get('/api/Servicio'),
          api.get('/api/Vehiculo'),
        ]);

        setEmpleados(empleadosRes.data);
        setServices(serviciosRes.data);
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
      if (onSave) onSave(); // Notifica al padre si hay callback
    } catch (error) {
      console.error('Error guardando la orden:', error);
      alert('Hubo un error al guardar la orden');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                <option key={v.idVehiculo || v.id} value={v.idVehiculo || v.id}>{v.tipo}</option>
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
              {empleados.map(e => (
                <option key={e.idEmpleado || e.id} value={e.idEmpleado || e.id}>{e.nombre}</option>
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

// (Aquí van los estilos que ya tienes definidos...)

const styles = {
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
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #eee'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
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
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '100px',
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
    display: 'block'
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#333'
  },
  paymentFields: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '12px'
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  }
};

export default FormularioOrden;
