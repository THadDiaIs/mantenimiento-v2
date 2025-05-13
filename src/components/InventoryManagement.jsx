import React, { useState } from 'react';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Aceite de Motor 10W-30',
      category: 'Lubricantes',
      quantity: 15,
      unit: 'Litro',
      minQuantity: 5,
      supplier: 'Mobil',
      price: 75.00
    },
    {
      id: 2,
      name: 'Filtro de Aceite',
      category: 'Filtros',
      quantity: 8,
      unit: 'Unidad',
      minQuantity: 4,
      supplier: 'Fram',
      price: 120.00
    },
    {
      id: 3,
      name: 'Pastillas de Freno Delanteras',
      category: 'Frenos',
      quantity: 5,
      unit: 'Juego',
      minQuantity: 2,
      supplier: 'Bosch',
      price: 350.00
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'Unidad',
    minQuantity: '1',
    supplier: '',
    price: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [showLowStock, setShowLowStock] = useState(false);

  const categories = [
    'Lubricantes',
    'Filtros',
    'Frenos',
    'Baterías',
    'Correas',
    'Bujías',
    'Neumáticos',
    'Herramientas',
    'Otros'
  ];

  const units = ['Unidad', 'Litro', 'Kilogramo', 'Juego', 'Caja', 'Galón'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setInventory(inventory.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      ));
      setEditingId(null);
    } else {
      const newItem = { ...formData, id: Date.now() };
      setInventory([...inventory, newItem]);
    }
    
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: 'Unidad',
      minQuantity: '1',
      supplier: '',
      price: ''
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este ítem del inventario?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const handleAdjustStock = (id, adjustment) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newQuantity = parseInt(item.quantity) + adjustment;
        return { ...item, quantity: Math.max(0, newQuantity) };
      }
      return item;
    }));
  };

  const filteredInventory = showLowStock 
    ? inventory.filter(item => item.quantity <= item.minQuantity)
    : inventory;

  const getStockStatus = (quantity, minQuantity) => {
    const qty = parseInt(quantity);
    const minQty = parseInt(minQuantity);
    
    if (qty === 0) {
      return { text: 'Agotado', color: '#f44336' };
    } else if (qty <= minQty) {
      return { text: 'Bajo Stock', color: '#ff9800' };
    } else {
      return { text: 'En Stock', color: '#4caf50' };
    }
  };

  return (
    <div style={styles.container}>
      <h2>Gestión de Inventario</h2>
      
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>Total de Productos</h3>
          <p style={styles.statNumber}>{inventory.length}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Bajo Stock</h3>
          <p style={styles.statNumber}>
            {inventory.filter(item => item.quantity <= item.minQuantity).length}
          </p>
        </div>
        <div style={styles.statCard}>
          <h3>Agotados</h3>
          <p style={styles.statNumber}>
            {inventory.filter(item => item.quantity === 0).length}
          </p>
        </div>
      </div>
      
      <div style={styles.formContainer}>
        <h3>{editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Nombre del Producto *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Categoría *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label>Cantidad *</label>
            <input
              type="number"
              name="quantity"
              min="0"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Unidad de Medida *</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              required
            >
              {units.map(unit => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label>Cantidad Mínima *</label>
            <input
              type="number"
              name="minQuantity"
              min="1"
              value={formData.minQuantity}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Proveedor</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Precio Unitario (Q) *</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Actualizar' : 'Agregar'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setFormData({
                    name: '',
                    category: '',
                    quantity: '',
                    unit: 'Unidad',
                    minQuantity: '1',
                    supplier: '',
                    price: ''
                  });
                  setEditingId(null);
                }}
                style={styles.cancelButton}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div style={styles.inventoryControls}>
        <h3>Inventario de Productos</h3>
        <div style={styles.filterToggle}>
          <label>
            <input
              type="checkbox"
              checked={showLowStock}
              onChange={() => setShowLowStock(!showLowStock)}
            />
            Mostrar solo productos con bajo stock
          </label>
        </div>
      </div>
      
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Precio (Q)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => {
              const status = getStockStatus(item.quantity, item.minQuantity);
              return (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    {item.supplier && <div style={styles.supplier}>{item.supplier}</div>}
                  </td>
                  <td>{item.category}</td>
                  <td>
                    <div style={styles.quantityCell}>
                      <span>{item.quantity} {item.unit}</span>
                      <div style={styles.quantityControls}>
                        <button 
                          onClick={() => handleAdjustStock(item.id, 1)}
                          style={styles.quantityButton}
                        >
                          +
                        </button>
                        <button 
                          onClick={() => handleAdjustStock(item.id, -1)}
                          style={styles.quantityButton}
                          disabled={item.quantity <= 0}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ ...styles.statusBadge, backgroundColor: status.color }}>
                      {status.text}
                    </span>
                    {status.text === 'Bajo Stock' && (
                      <div style={styles.lowStockWarning}>
                        Mínimo: {item.minQuantity}
                      </div>
                    )}
                  </td>
                  <td>Q{parseFloat(item.price).toFixed(2)}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(item)}
                      style={styles.editButton}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      style={styles.deleteButton}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
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
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  statNumber: {
    fontSize: '2em',
    fontWeight: 'bold',
    margin: '10px 0 0',
    color: '#333'
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
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginTop: '5px',
    backgroundColor: 'white'
  },
  buttonGroup: {
    gridColumn: '1 / -1',
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px'
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
  inventoryControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  filterToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#fff3e0',
    padding: '8px 15px',
    borderRadius: '4px',
    borderLeft: '4px solid #ff9800'
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    fontWeight: 'bold',
    color: '#333'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle'
  },
  supplier: {
    fontSize: '0.8em',
    color: '#666',
    marginTop: '3px'
  },
  quantityCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  quantityControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  quantityButton: {
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '3px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    ':hover': {
      backgroundColor: '#d0d0d0'
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.8em',
    fontWeight: 'bold',
    display: 'inline-block',
    minWidth: '80px',
    textAlign: 'center'
  },
  lowStockWarning: {
    fontSize: '0.75em',
    color: '#e65100',
    marginTop: '3px'
  },
  editButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    fontSize: '0.9em'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em'
  }
};

export default InventoryManagement;
