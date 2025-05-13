import React, { useState } from 'react';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, plate: 'ABC-123', vin: 'JT2BF22K1W0123456' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2021, plate: 'XYZ-456', vin: '19XFC2F53KE123456' },
  ]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    plate: '',
    vin: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setVehicles(vehicles.map(v => v.id === editingId ? { ...formData, id: editingId } : v));
      setEditingId(null);
    } else {
      const newVehicle = { ...formData, id: Date.now() };
      setVehicles([...vehicles, newVehicle]);
    }
    setFormData({ make: '', model: '', year: '', plate: '', vin: '' });
  };

  const handleEdit = (vehicle) => {
    setFormData(vehicle);
    setEditingId(vehicle.id);
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Gestión de Vehículos</h2>
      
      <div style={styles.formContainer}>
        <h3>{editingId ? 'Editar Vehículo' : 'Agregar Nuevo Vehículo'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Marca:</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Modelo:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Año:</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Placa:</label>
            <input
              type="text"
              name="plate"
              value={formData.plate}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>VIN:</label>
            <input
              type="text"
              name="vin"
              value={formData.vin}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button type="submit" style={styles.submitButton}>
            {editingId ? 'Actualizar' : 'Agregar'}
          </button>
          {editingId && (
            <button type="button" onClick={() => {
              setFormData({ make: '', model: '', year: '', plate: '', vin: '' });
              setEditingId(null);
            }} style={styles.cancelButton}>
              Cancelar
            </button>
          )}
        </form>
      </div>
      
      <div style={styles.tableContainer}>
        <h3>Vehículos Registrados</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Placa</th>
              <th>VIN</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.plate}</td>
                <td>{vehicle.vin}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(vehicle)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(vehicle.id)}
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
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginTop: '5px'
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    marginRight: '10px'
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px'
  },
  tableContainer: {
    marginTop: '20px',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'middle'
  },
  editButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default VehicleManagement;
