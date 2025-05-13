import React, { useState, useEffect } from 'react';

const MaintenanceHistory = () => {
  const [maintenances, setMaintenances] = useState([
    {
      id: 1,
      vehicle: 'Toyota Corolla (ABC-123)',
      date: '2023-05-10',
      type: 'Cambio de aceite',
      cost: 250.00,
      status: 'Completado',
      details: 'Cambio de aceite y filtro'
    },
    {
      id: 2,
      vehicle: 'Honda Civic (XYZ-456)',
      date: '2023-05-15',
      type: 'Frenos',
      cost: 450.00,
      status: 'Pendiente',
      details: 'Cambio de pastillas de freno'
    },
  ]);

  const [filters, setFilters] = useState({
    vehicle: '',
    status: '',
    startDate: '',
    endDate: ''
  });

  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredMaintenances = maintenances.filter(maintenance => {
    return (
      (filters.vehicle === '' || maintenance.vehicle.includes(filters.vehicle)) &&
      (filters.status === '' || maintenance.status === filters.status) &&
      (filters.startDate === '' || maintenance.date >= filters.startDate) &&
      (filters.endDate === '' || maintenance.date <= filters.endDate)
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleViewDetails = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setShowDetails(true);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Completado': 'green',
      'En Proceso': 'orange',
      'Pendiente': 'gray',
      'Cancelado': 'red'
    };
    
    return {
      backgroundColor: `${statusColors[status]}20`,
      color: statusColors[status],
      padding: '4px 8px',
      borderRadius: '12px',
      display: 'inline-block',
      fontSize: '0.8em',
      fontWeight: 'bold'
    };
  };

  return (
    <div style={styles.container}>
      <h2>Historial de Mantenimientos</h2>
      
      <div style={styles.filterContainer}>
        <h3>Filtros</h3>
        <div style={styles.filters}>
          <div style={styles.filterGroup}>
            <label>Vehículo:</label>
            <input
              type="text"
              name="vehicle"
              value={filters.vehicle}
              onChange={handleFilterChange}
              placeholder="Buscar por vehículo"
            />
          </div>
          
          <div style={styles.filterGroup}>
            <label>Estado:</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Completado">Completado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <label>Desde:</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          
          <div style={styles.filterGroup}>
            <label>Hasta:</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
      
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Vehículo</th>
              <th>Tipo de Mantenimiento</th>
              <th>Costo (Q)</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaintenances.map(maintenance => (
              <tr key={maintenance.id}>
                <td>{new Date(maintenance.date).toLocaleDateString()}</td>
                <td>{maintenance.vehicle}</td>
                <td>{maintenance.type}</td>
                <td>Q{maintenance.cost.toFixed(2)}</td>
                <td>
                  <span style={getStatusBadge(maintenance.status)}>
                    {maintenance.status}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleViewDetails(maintenance)}
                    style={styles.viewButton}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showDetails && selectedMaintenance && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3>Detalles del Mantenimiento</h3>
              <button 
                onClick={() => setShowDetails(false)}
                style={styles.closeButton}
              >
                &times;
              </button>
            </div>
            <div style={styles.modalBody}>
              <p><strong>Vehículo:</strong> {selectedMaintenance.vehicle}</p>
              <p><strong>Fecha:</strong> {new Date(selectedMaintenance.date).toLocaleDateString()}</p>
              <p><strong>Tipo:</strong> {selectedMaintenance.type}</p>
              <p><strong>Estado:</strong> {selectedMaintenance.status}</p>
              <p><strong>Costo:</strong> Q{selectedMaintenance.cost.toFixed(2)}</p>
              <p><strong>Detalles:</strong></p>
              <div style={styles.detailsBox}>
                {selectedMaintenance.details}
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button 
                onClick={() => setShowDetails(false)}
                style={styles.closeModalButton}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    position: 'relative'
  },
  filterContainer: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  filters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  },
  filterGroup: {
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
  tableContainer: {
    marginTop: '20px',
    overflowX: 'auto',
    backgroundColor: 'white',
    borderRadius: '8px',
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
  viewButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#0b7dda'
    }
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  },
  modalHeader: {
    padding: '15px 20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalBody: {
    padding: '20px',
    lineHeight: '1.6'
  },
  modalFooter: {
    padding: '15px 20px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    ':hover': {
      color: '#000'
    }
  },
  closeModalButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#d32f2f'
    }
  },
  detailsBox: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
    marginTop: '10px',
    borderLeft: '4px solid #2196F3'
  }
};

export default MaintenanceHistory;
