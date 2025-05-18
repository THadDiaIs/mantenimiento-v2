import React, { useState, useEffect } from 'react';
import api from '../services/api';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    idUsuario: '',
    marca: '',
    modelo: '',
    anio: '',
    placa: '',
    color: '',
    tipo: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/api/Vehiculo');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const anioNum = parseInt(formData.anio, 10);
    const idUsuarioNum = parseInt(formData.idUsuario, 10);

    if (isNaN(anioNum) || isNaN(idUsuarioNum)) {
      alert('El ID Usuario y el Año deben ser números válidos');
      return;
    }

    const vehicleData = {
      ...formData,
      anio: anioNum,
      idUsuario: idUsuarioNum,
    };

    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/api/Vehiculo/${editingId}`, vehicleData);
      } else {
        await api.post('/api/Vehiculo', vehicleData);
      }
      fetchVehicles();
      resetForm();
    } catch (error) {
      console.error('Error saving vehicle:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (vehicle) => {
    setFormData({
      idUsuario: vehicle.idUsuario?.toString() || '',
      marca: vehicle.marca || '',
      modelo: vehicle.modelo || '',
      anio: vehicle.anio?.toString() || '',
      placa: vehicle.placa || '',
      color: vehicle.color || '',
      tipo: vehicle.tipo || '',
    });
    setEditingId(vehicle.idVehiculo);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este vehículo?')) {
      try {
        await api.delete(`/api/Vehiculo/${id}`);
        fetchVehicles();
        if (editingId === id) {
          resetForm();
        }
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      idUsuario: '',
      marca: '',
      modelo: '',
      anio: '',
      placa: '',
      color: '',
      tipo: '',
    });
    setEditingId(null);
  };

  if (loading) return <div>Cargando vehículos...</div>;

  return (
    <div style={styles.container}>
      <h2>Gestión de Vehículos</h2>

      <div style={styles.formContainer}>
        <h3>{editingId ? 'Editar Vehículo' : 'Agregar Nuevo Vehículo'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
  <div style={styles.formGroup}>
    <label>ID Usuario *</label>
    <input
      type="number"
      name="idUsuario"
      value={formData.idUsuario}
      onChange={handleInputChange}
      required
      min="1"
    />
  </div>

  <div style={styles.formGroup}>
    <label>Marca *</label>
    <input
      type="text"
      name="marca"
      value={formData.marca}
      onChange={handleInputChange}
      required
      maxLength="50"
    />
  </div>

  <div style={styles.formGroup}>
    <label>Modelo *</label>
    <input
      type="text"
      name="modelo"
      value={formData.modelo}
      onChange={handleInputChange}
      required
      maxLength="50"
    />
  </div>

  <div style={styles.formGroup}>
    <label>Año *</label>
    <input
      type="number"
      name="anio"
      value={formData.anio}
      onChange={handleInputChange}
      required
      min="1900"
      max={new Date().getFullYear()}
    />
  </div>

  <div style={styles.formGroup}>
    <label>Placa *</label>
    <input
      type="text"
      name="placa"
      value={formData.placa}
      onChange={handleInputChange}
      required
      maxLength="10"
    />
  </div>

  <div style={styles.formGroup}>
    <label>Color</label>
    <input
      type="text"
      name="color"
      value={formData.color}
      onChange={handleInputChange}
      maxLength="30"
    />
  </div>

  <div style={styles.formGroup}>
    <label>Tipo</label>
    <input
      type="text"
      name="tipo"
      value={formData.tipo}
      onChange={handleInputChange}
      maxLength="30"
    />
  </div>

  <div style={styles.buttonGroup}>
    <button type="submit" disabled={saving} style={styles.submitButton}>
      {saving ? 'Guardando...' : editingId ? 'Actualizar Vehículo' : 'Agregar Vehículo'}
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
        <h3>Lista de Vehículos</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Usuario</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Placa</th>
              <th>Color</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map(vehicle => (
                <tr key={vehicle.idVehiculo}>
                  <td>{vehicle.idVehiculo}</td>
                  <td>{vehicle.idUsuario}</td>
                  <td>{vehicle.marca}</td>
                  <td>{vehicle.modelo}</td>
                  <td>{vehicle.anio}</td>
                  <td>{vehicle.placa}</td>
                  <td>{vehicle.color || 'N/A'}</td>
                  <td>{vehicle.tipo || 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(vehicle)}
                      style={styles.editButton}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.idVehiculo)}
                      style={styles.deleteButton}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '15px' }}>
                  No hay vehículos registrados.
                </td>
              </tr>
            )}
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
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500'
  }
};

export default VehicleManagement;
