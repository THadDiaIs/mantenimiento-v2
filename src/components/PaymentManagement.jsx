import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, nombre: 'Efectivo' },
    { id: 2, nombre: 'Tarjeta de Crédito' },
    { id: 3, nombre: 'Transferencia Bancaria' },
  ]);
  
  const [formData, setFormData] = useState({
    idOrden: '',
    monto: '',
    fechaPago: new Date().toISOString().split('T')[0],
    metodoPago: 'Efectivo',
    referencia: ''
  });
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPayments();
    fetchOrders();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/api/Pago');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/Orden');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        ...formData,
        monto: parseFloat(formData.monto),
        idOrden: parseInt(formData.idOrden)
      };
      
      if (editingId) {
        await api.put(`/api/Pago/${editingId}`, paymentData);
      } else {
        await api.post('/api/Pago', paymentData);
      }
      
      fetchPayments();
      resetForm();
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  const handleEdit = (payment) => {
    setFormData({
      idOrden: payment.idOrden,
      monto: payment.monto.toString(),
      fechaPago: payment.fechaPago.split('T')[0],
      metodoPago: payment.metodoPago,
      referencia: payment.referencia || ''
    });
    setEditingId(payment.idPago);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pago?')) {
      try {
        await api.delete(`/api/Pago/${id}`);
        fetchPayments();
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      idOrden: '',
      monto: '',
      fechaPago: new Date().toISOString().split('T')[0],
      metodoPago: 'Efectivo',
      referencia: ''
    });
    setEditingId(null);
  };

  const getOrderDescription = (idOrden) => {
    const order = orders.find(o => o.idOrden === idOrden);
    return order ? `Orden #${order.idOrden}` : 'Orden no encontrada';
  };

  if (loading) return <div>Cargando pagos...</div>;

  return (
    <div style={styles.container}>
      <h2>Gestión de Pagos</h2>
      
      <div style={styles.formContainer}>
        <h3>{editingId ? 'Editar Pago' : 'Registrar Nuevo Pago'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Orden:</label>
            <select
              name="idOrden"
              value={formData.idOrden}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar orden</option>
              {orders.map(order => (
                <option key={order.idOrden} value={order.idOrden}>
                  Orden #{order.idOrden} - {order.descripcion || 'Sin descripción'}
                </option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label>Monto (Q):</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleInputChange}
              step="0.01"
              min="0.01"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Fecha de Pago:</label>
            <input
              type="date"
              name="fechaPago"
              value={formData.fechaPago}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Método de Pago:</label>
            <select
              name="metodoPago"
              value={formData.metodoPago}
              onChange={handleInputChange}
              required
            >
              {paymentMethods.map(method => (
                <option key={method.id} value={method.nombre}>
                  {method.nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label>Referencia (opcional):</label>
            <input
              type="text"
              name="referencia"
              value={formData.referencia}
              onChange={handleInputChange}
              placeholder="Número de transacción o referencia"
            />
          </div>
          
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Actualizar Pago' : 'Registrar Pago'}
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
        <h3>Historial de Pagos</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Orden</th>
              <th>Monto (Q)</th>
              <th>Fecha</th>
              <th>Método</th>
              <th>Referencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.idPago}>
                <td>{payment.idPago}</td>
                <td>{getOrderDescription(payment.idOrden)}</td>
                <td>{payment.monto.toFixed(2)}</td>
                <td>{new Date(payment.fechaPago).toLocaleDateString()}</td>
                <td>{payment.metodoPago}</td>
                <td>{payment.referencia || 'N/A'}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(payment)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(payment.idPago)}
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
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  select: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white'
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
    fontSize: '16px'
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
    overflowX: 'auto'
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
    borderBottom: '1px solid #ddd',
    position: 'sticky',
    top: 0,
    background: 'white'
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'middle'
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginRight: '5px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  '@media (max-width: 768px)': {
    form: {
      gridTemplateColumns: '1fr'
    }
  }
};

export default PaymentManagement;
