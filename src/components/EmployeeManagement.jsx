import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    contrasenia: '',
    fechaContratacion: '',
    salario: '',
    idRol: '',
    rolIdRol: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/api/Empleado');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get('/api/Rol');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      rolIdRol: formData.idRol
    };

    try {
      if (editingId) {
        await api.put(`/api/Empleado/${editingId}`, payload);
      } else {
        await api.post('/api/Empleado', payload);
      }
      fetchEmployees();
      resetForm();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => {
    console.log(employee)
    setFormData({
      nombre: employee.nombre,
      apellido: employee.apellido,
      telefono: employee.telefono,
      correo: employee.correo,
      contrasenia: '',
      fechaContratacion: employee.fechaContratacion.split('.')[0],
      salario: employee.salario,
      idRol: employee.idRol,
      rolIdRol: employee.idRol
    });
    setEditingId(employee.idEmpleado);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
      try {
        await api.delete(`/api/Empleado/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      telefono: '',
      correo: '',
      contrasenia: '',
      fechaContratacion: '',
      salario: '',
      idRol: '',
      rolIdRol: ''
    });
    setEditingId(null);
  };

  if (loading) return <div>Cargando empleados...</div>;

  return (
    <div style={styles.container}>
      <h2>Gestión de Empleados</h2>
      
      <div style={styles.formContainer}>
        <h3>{editingId ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
          </div>



          <div style={styles.formGroup}>
            <label>Contraseña:</label>
            <input
              type="password"
              name="contrasenia"
              value={formData.contrasenia}
              onChange={handleInputChange}
              required={!editingId}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Fecha de Contratación:</label>
            <input
              type="datetime-local"
              name="fechaContratacion"
              value={formData.fechaContratacion}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Salario:</label>
            <input
              type="number"
              name="salario"
              step="0.01"
              value={formData.salario}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Rol:</label>
            <select
              name="idRol"
              value={formData.idRol}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar rol</option>
              {roles.map(role => (
                <option key={role.idRol} value={role.idRol}>
                  {role.nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Actualizar' : 'Agregar'}
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
        <h3>Lista de Empleados</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.idEmpleado}>
                <td>{emp.idEmpleado}</td>
                <td>{emp.nombre}</td>
                <td>{emp.apellido}</td>
                <td>{emp.telefono}</td>
                <td>{emp.correo}</td>
                <td>{roles.find(r => r.idRol === emp.idRol)?.nombre || 'N/A'}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(emp)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(emp.idEmpleado)}
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
    marginBottom: '10px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    gridColumn: '1 / -1'
  },
  submitButton: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelButton: {
    padding: '8px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px'
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginRight: '5px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default EmployeeManagement;
