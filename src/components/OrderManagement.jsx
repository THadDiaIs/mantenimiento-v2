import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import FormularioOrden from './Orden';
import api from '../services/api';

// Componente principal de gestión de órdenes
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    estado: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Cargar órdenes iniciales (simulando una API)
  useEffect(() => {
    fetchOrders();
    //setOrders(mockOrders);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/Orden');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching ordens:', error);
    } finally {
      //setLoading(false);
    }
  };

  const handleSaveOrder = (orderData) => {
    if (currentOrder) {
      // Actualizar orden existente
      setOrders(orders.map(o => o.id === currentOrder.id ? { ...orderData, id: currentOrder.id } : o));
    } else {
      // Crear nueva orden
      const newOrder = {
        ...orderData,
        id: Math.max(0, ...orders.map(o => o.id)) + 1
      };
      setOrders([...orders, newOrder]);
    }
    setShowForm(false);
    setCurrentOrder(null);
  };

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta orden?')) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = Object.values(order).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesFilters = (
      (!filters.estado || order.estado === filters.estado) &&
      (!filters.fechaInicio || order.fechaIngreso >= filters.fechaInicio) &&
      (!filters.fechaFin || order.fechaIngreso <= filters.fechaFin)
    );

    return matchesSearch && matchesFilters;
  });

  const getStatusStyle = (status) => {
    const statusStyles = {
      'Pendiente': { backgroundColor: '#fff3cd', color: '#856404' },
      'En Proceso': { backgroundColor: '#cce5ff', color: '#004085' },
      'Completado': { backgroundColor: '#d4edda', color: '#155724' },
      'Cancelado': { backgroundColor: '#f8d7da', color: '#721c24' }
    };
    return statusStyles[status] || {};
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.pageTitle}>Gestión de Órdenes</h2>
        <button 
          onClick={() => {
            setCurrentOrder(null);
            setShowForm(true);
          }} 
          style={styles.addButton}
        >
          <FaPlus /> Nueva Orden
        </button>
      </div>

      {/* Filtros */}
      <div style={styles.filtersContainer}>
        <div style={styles.searchBox}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar órdenes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            <FaFilter style={{ marginRight: '8px' }} />
            Filtros:
          </label>
          <select 
            value={filters.estado}
            onChange={(e) => setFilters({...filters, estado: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="">Todos los estados</option>
            {['Pendiente', 'En Proceso', 'Completado', 'Cancelado'].map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
          
          <div style={styles.dateFilter}>
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            <input
              type="date"
              value={filters.fechaInicio}
              onChange={(e) => setFilters({...filters, fechaInicio: e.target.value})}
              style={styles.dateInput}
            />
            <span style={{ margin: '0 8px' }}>a</span>
            <input
              type="date"
              value={filters.fechaFin}
              onChange={(e) => setFilters({...filters, fechaFin: e.target.value})}
              style={styles.dateInput}
            />
          </div>
        </div>
      </div>

      {/* Tabla de órdenes */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Vehículo</th>
              <th style={styles.th}>Mantenimiento</th>
              <th style={styles.th}>Fecha Ingreso</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Monto (Q)</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
  {filteredOrders.length > 0 ? (
    filteredOrders.map(order => (
      <tr key={order.idOrden} style={styles.tr}>
        <td style={styles.td}>#{order.idOrden}</td>
        <td style={styles.td}>{order.vehiculo.marca}</td>
        <td style={styles.td}>{order.observaciones}</td>
        <td style={styles.td}>
          {new Date(order.fechaIngreso).toLocaleDateString()}
        </td>
        <td style={styles.td}>
          <span style={{
            ...styles.statusBadge,
            ...getStatusStyle(order.estado)
          }}>
            {order.estado}
          </span>
        </td>
        <td style={styles.td}>
          {parseFloat(order.pago?.monto || 0).toFixed(2)}
        </td>
        <td style={styles.td}>
          <div style={styles.actionButtons}>
            <button 
              onClick={() => handleEdit(order)}
              style={styles.actionButton}
              title="Editar"
            >
              <FaEdit />
            </button>
            <button 
              onClick={() => handleDelete(order.idOrden)}
              style={{...styles.actionButton, color: '#dc3545'}}
              title="Eliminar"
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
        No se encontraron órdenes que coincidan con los criterios de búsqueda.
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <FormularioOrden 
          orden={currentOrder}
          onSave={handleSaveOrder}
          onCancel={() => {
            setShowForm(false);
            setCurrentOrder(null);
          }}
        />
      )}
    </div>
  );
};

const styles = {
  // Container styles
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  
  // Header styles
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  
  pageTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
  },
  
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#2980b9',
    },
  },
  
  // Filter styles
  filtersContainer: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
  },
  
  searchBox: {
    position: 'relative',
    marginBottom: '15px',
    '& input': {
      width: '100%',
      padding: '8px 12px 8px 35px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
    },
  },
  
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d',
  },
  
  filterGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    alignItems: 'center',
  },
  
  filterLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#495057',
    marginRight: '10px',
  },
  
  filterSelect: {
    padding: '6px 12px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
  },
  
  dateFilter: {
    display: 'flex',
    alignItems: 'center',
    '& input': {
      padding: '6px 12px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '14px',
    },
  },
  
  // Table styles
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '20px',
  },
  
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  
  th: {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    color: '#495057',
    fontWeight: '600',
    fontSize: '14px',
  },
  
  td: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
    fontSize: '14px',
  },
  
  tr: {
    '&:hover': {
      backgroundColor: '#f8f9fa',
    },
  },
  
  // Status badge
  statusBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
  
  // Action buttons
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  
  actionButton: {
    background: 'none',
    border: 'none',
    color: '#6c757d',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px 8px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  
  // Modal styles
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
  },
  
  modalContent: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
};

export default OrderManagement;
