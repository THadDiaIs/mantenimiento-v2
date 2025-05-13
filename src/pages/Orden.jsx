import React from 'react';

const FormularioOrden = ({ ordenExistente }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {ordenExistente ? 'Editar Orden' : 'Nueva Orden de Mantenimiento'}
      </h2>

      <form style={styles.form}>
        <div style={styles.section}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tipo de Vehiculo *</label>
            <select style={styles.select} required>
              <option value="">Seleccionar tipo</option>
              <option value="1">Pickup</option>
              <option value="2">SUV</option>
              <option value="3">Sedan</option>
              <option value="4">Coupe</option>
              <option value="5">Camioneta</option>
              <option value="6">Camión</option>
              <option value="7">Motocicleta</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Tipo de Mantenimiento *</label>
            <select style={styles.select} required>
              <option value="">Seleccionar tipo mantenimiento</option>
              <option value="1">Cambio de aceite</option>
              <option value="2">Lavado</option>
              <option value="3">Lavado completo</option>
              <option value="4">Servicio completo</option>
              <option value="5">Enderezado y Pintura</option>
              <option value="6">Electromecánica</option>
              <option value="7">Pinchazo</option>
              <option value="8">Servicio de alineación</option>
              <option value="9">Rectificacion de motor</option>
            </select>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha de Ingreso *</label>
            <input type="date" style={styles.input} required />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha de Salida Estimada</label>
            <input type="date" style={styles.input} />
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
            placeholder="Detalles del mantenimiento requerido..."
          />
        </div>

        <div style={{ ...styles.section, ...styles.paymentSection }}>
          <h3 style={styles.subtitle}>Información de Pago</h3>
          <div style={styles.paymentFields}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Método de Pago</label>
              <select style={styles.select}>
                <option value="">Seleccionar método</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Monto Estimado (Q)</label>
              <input
                type="number"
                step="0.01"
                style={styles.input}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button type="button" style={styles.cancelButton}>
            Cancelar
          </button>
          <button type="submit" style={styles.submitButton}>
            {ordenExistente ? 'Actualizar Orden' : 'Crear Orden'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
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