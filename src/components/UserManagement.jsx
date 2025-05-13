import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contrasena: '',
    confirmarContrasena: '',
    idRol: '',
    idEmpleado: '',
    activo: true
  });
  
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchEmployees();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/Usuario');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
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

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/api/Empleado');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear password error when user types
    if (name === 'contrasena' || name === 'confirmarContrasena') {
      setPasswordError('');
    }
  };

  const validatePasswords = () => {
    if (formData.contrasena !== formData.confirmarContrasena) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.contrasena.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!editingId && !validatePasswords()) {
      return;
    }
    
    try {
      const userData = {
        ...formData,
        idRol: parseInt(formData.idRol, 10),
        idEmpleado: formData.idEmpleado ? parseInt(formData.idEmpleado, 10) : null
      };
      
      // Remove confirmarContrasena before sending
      const { confirmarContrasena, ...dataToSend } = userData;
      
      if (editingId) {
        // Don't update password if not changed
        if (!dataToSend.contrasena) {
          const { contrasena, ...dataWithoutPassword } = dataToSend;
          await api.put(`/api/Usuario/${editingId}`, dataWithoutPassword);
        } else {
          await api.put(`/api/Usuario/${editingId}`, dataToSend);
        }
      } else {
        await api.post('/api/Usuario', dataToSend);
      }
      
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Error saving user:', error);
      setPasswordError(error.response?.data?.message || 'Error al guardar el usuario');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      nombreUsuario: user.nombreUsuario,
      contrasena: '',
      confirmarContrasena: '',
      idRol: user.idRol,
      idEmpleado: user.idEmpleado || '',
      activo: user.activo
    });
    setEditingId(user.idUsuario);
    setShowPassword(false);
    setPasswordError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await api.delete(`/api/Usuario/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/api/Usuario/${id}/status`, { activo: !currentStatus });
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      nombreUsuario: '',
      contrasena: '',
      confirmarContrasena: '',
      idRol: '',
      idEmpleado: '',
      activo: true
    });
    setEditingId(null);
    setShowPassword(false);
    setPasswordError('');
  };

  const getEmployeeName = (idEmpleado) => {
    if (!idEmpleado) return 'No asignado';
    const employee = employees.find(e => e.idEmpleado === idEmpleado);
    return employee ? `${employee.nombre} ${employee.apellido}` : 'Empleado no encontrado';
  };

  const getRoleName = (idRol) => {
    const role = roles.find(r => r.idRol === idRol);
    return role ? role.nombre : 'Rol no encontrado';
  };

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div style={styles.container}>
      <h2>Gestión de Usuarios</h2>
      
      <div style={styles.formContainer}>
        <h3>{editingId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Nombre de Usuario *</label>
            <input
              type="text"
              name="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleInputChange}
              required
              disabled={!!editingId}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Contraseña {!editingId && '*'}</label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="contrasena"
                value={formData.contrasena}
                onChange={handleInputChange}
                required={!editingId}
                placeholder={editingId ? 'Dejar en blanco para no cambiar' : ''}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          {!editingId && (
            <div style={styles.formGroup}>
              <label>Confirmar Contraseña *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmarContrasena"
                value={formData.confirmarContrasena}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          
          {passwordError && (
            <div style={styles.errorMessage}>
              {passwordError}
            </div>
          )}
          
          <div style={styles.formGroup}>
            <label>Rol *</label>
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
          
          <div style={styles.formGroup}>
            <label>Empleado</label>
            <select
              name="idEmpleado"
              value={formData.idEmpleado || ''}
              onChange={handleInputChange}
            >
              <option value="">No asignar empleado</option>
              {employees.map(emp => (
                <option key={emp.idEmpleado} value={emp.idEmpleado}>
                  {emp.nombre} {emp.apellido}
                </option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleInputChange}
              />
              {' '}Usuario Activo
            </label>
          </div>
          
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
              <th>Usuario</th>
              <th>Rol</th>
              <th>Empleado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.idUsuario}>
                <td>{user.idUsuario}</td>
                <td>{user.nombreUsuario}</td>
                <td>{getRoleName(user.idRol)}</td>
                <td>{getEmployeeName(user.idEmpleado)}</td>
                <td>
                  <span style={{
                    color: user.activo ? '#4CAF50' : '#f44336',
                    fontWeight: 'bold'
                  }}>
                    {user.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleEdit(user)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => toggleUserStatus(user.idUsuario, user.activo)}
                    style={{
                      ...styles.statusButton,
                      backgroundColor: user.activo ? '#ff9800' : '#4CAF50'
                    }}
                  >
                    {user.activo ? 'Desactivar' : 'Activar'}
                  </button>
                  <button 
                    onClick={() => handleDelete(user.idUsuario)}
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
  select: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    fontSize: '14px'
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  toggleButton: {
    position: 'absolute',
    right: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0 5px'
  },
  errorMessage: {
    gridColumn: '1 / -1',
    color: '#f44336',
    backgroundColor: '#ffebee',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '5px',
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

export default UserManagement;
