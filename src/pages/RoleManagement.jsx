import React, { useState, useEffect } from 'react';
import api from '../services/api';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    permisos: {
      gestionUsuarios: false,
      gestionVehiculos: false,
      gestionServicios: false,
      gestionOrdenes: false,
      gestionPagos: false,
      verReportes: false
    }
  });
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await api.get('/api/Rol');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name in formData.permisos) {
      setFormData(prev => ({
        ...prev,
        permisos: {
          ...prev.permisos,
          [name]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roleData = {
        ...formData,
        // Convertir permisos a formato de string para la API
        permisos: JSON.stringify(formData.permisos)
      };
      
      if (editingId) {
        await api.put(`/api/Rol/${editingId}`, roleData);
      } else {
        await api.post('/api/Rol', roleData);
      }
      
      fetchRoles();
      resetForm();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handleEdit = (role) => {
    try {
      const permisos = typeof role.permisos === 'string' 
        ? JSON.parse(role.permisos) 
        : role.permisos || {
            gestionUsuarios: false,
            gestionVehiculos: false,
            gestionServicios: false,
            gestionOrdenes: false,
            gestionPagos: false,
            verReportes: false
          };
      
      setFormData({
        nombre: role.nombre,
        descripcion: role.descripcion || '',
        permisos: permisos
      });
      setEditingId(role.idRol);
    } catch (error) {
      console.error('Error parsing role permissions:', error);
      // Reset form on error
      resetForm();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este rol?')) {
      try {
        await api.delete(`/api/Rol/${id}`);
        fetchRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
        alert('No se puede eliminar el rol porque está en uso');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      permisos: {
        gestionUsuarios: false,
        gestionVehiculos: false,
        gestionServicios: false,
        gestionOrdenes: false,
        gestionPagos: false,
        verReportes: false
      }
    });
    setEditingId(null);
  };

  const formatPermissions = (permisos) => {
    if (!permisos) return 'Sin permisos';
    
    try {
      const perms = typeof permisos === 'string' ? JSON.parse(permisos) : permisos;
      const activePerms = [];
      
      if (perms.gestionUsuarios) activePerms.push('Usuarios');
      if (perms.gestionVehiculos) activePerms.push('Vehículos');
      if (perms.gestionServicios) activePerms.push('Servicios');
      if (perms.gestionOrdenes) activePerms.push('Órdenes');
      if (perms.gestionPagos) activePerms.push('Pagos');
      if (perms.verReportes) activePerms.push('Reportes');
      
      return activePerms.length > 0 ? activePerms.join(', ') : 'Solo lectura';
    } catch (e) {
      return 'Error al cargar permisos';
    }
  };

  const getPermissionCount = (permisos) => {
    if (!permisos) return 0;
    try {
      const perms = typeof permisos === 'string' ? JSON.parse(permisos) : permisos;
      return Object.values(perms).filter(Boolean).length;
    } catch (e) {
      return 0;
    }
  };

  if (loading) return <div>Cargando roles...</div>;

  return (
    <div style={styles.container}>
      <h2>Gestión de Roles</h2>
      
      <div style={styles.formContainer}>
        <h3>{editingId ? 'Editar Rol' : 'Crear Nuevo Rol'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Nombre del Rol *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              maxLength="50"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows="3"
              maxLength="255"
            />
          </div>
          
          <div style={styles.permissionsContainer}>
            <h4>Permisos</h4>
            <div style={styles.permissionsGrid}>
              <label style={styles.permissionItem}>
                <input
                  type="checkbox"
                  name="gestionUsuarios"
                  checked={formData.permisos.gestionUsuarios || false}
                  onChange={handleInputChange}
                />
                <span>Gestión de Usuarios</span>
              </label>
              
              <label style={styles.permissionItem}>
                <input
                  type="checkbox"
                  name="gestionVehiculos"
                  checked={formData.permisos.gestionVehiculos || false}
                  onChange={handleInputChange}
                />
                <span>Gestión de Vehículos</span>
              </label>
              
              <label style={styles.permissionItem}>
                <input
                  type="checkbox"
                  name="gestionServicios"
                  checked={formData.permisos.gestionServicios || false}
                  onChange={handleInputChange}
                />
                <span>Gestión de Servicios</span>
              </label>
              
              <label style={styles.permissionItem}>
                <input
                  type="checkbox"
                  name="gestionOrdenes"
                  checked={formData.permisos.gestionOrdenes || false}
                  onChange={handleInputChange}
                />
                <span>Gestión de Órdenes</span>
              </label>
              
              <label style={styles.permissionItem}>
                <input
                  type="checkbox"
                  name="gestionPagos"
                  checked={formData.permisos.gestionPagos || false}
                  onChange={handleInputChange}
                />
                <span>Gestión de Pagos</span>
              </label>
              
              <label style={styles.permissionItem}>
                <input
                  type="checkbox"
                  name="verReportes"
                  checked={formData.permisos.verReportes || false}
                  onChange={handleInputChange}
                />
                <span>Ver Reportes</span>
              </label>
            </div>
          </div>
          
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Actualizar Rol' : 'Crear Rol'}
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
        <h3>Roles del Sistema</h3>
        <div style={styles.rolesGrid}>
          {roles.map(role => (
            <div key={role.idRol} style={styles.roleCard}>
              <div style={styles.roleHeader}>
                <h4 style={styles.roleTitle}>{role.nombre}</h4>
                <span style={styles.permissionCount}>
                  {getPermissionCount(role.permisos)} permisos
                </span>
              </div>
              <p style={styles.roleDescription}>
                {role.descripcion || 'Sin descripción'}
              </p>
              <div style={styles.permissionsList}>
                {formatPermissions(role.permisos)}
              </div>
              <div style={styles.roleActions}>
                <button 
                  onClick={() => handleEdit(role)}
                  style={styles.editButton}
                >
                  Editar
                </button>
                {role.idRol !== 1 && ( // Prevent deleting admin role
                  <button 
                    onClick={() => handleDelete(role.idRol)}
                    style={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'vertical',
    minHeight: '80px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px'
  },
  permissionsContainer: {
    margin: '20px 0',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid #eee'
  },
  permissionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '10px',
    marginTop: '10px'
  },
  permissionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#eee'
    }
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
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
    marginTop: '20px'
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '15px'
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  },
  roleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #eee'
  },
  roleTitle: {
    margin: 0,
    color: '#333',
    fontSize: '18px'
  },
  permissionCount: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  roleDescription: {
    padding: '15px',
    margin: 0,
    color: '#555',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
    flexGrow: 1
  },
  permissionsList: {
    padding: '15px',
    fontSize: '13px',
    color: '#666',
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #eee',
    minHeight: '60px'
  },
  roleActions: {
    display: 'flex',
    padding: '10px 15px',
    justifyContent: 'flex-end',
    gap: '10px',
    backgroundColor: '#f9f9f9'
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
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
    rolesGrid: {
      gridTemplateColumns: '1fr'
    },
    permissionsGrid: {
      gridTemplateColumns: '1fr 1fr'
    },
    button: {
      padding: '8px 12px',
      fontSize: '14px'
    }
  },
  '@media (max-width: 480px)': {
    permissionsGrid: {
      gridTemplateColumns: '1fr'
    },
    roleActions: {
      flexDirection: 'column',
      gap: '8px'
    },
    editButton,
    deleteButton: {
      width: '100%',
      textAlign: 'center'
    }
  }
};

export default RoleManagement;
