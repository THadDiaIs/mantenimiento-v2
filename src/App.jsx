import { useState, useEffect } from 'react';

// Import components
import Login from './pages/Login';
import VehicleManagement from './pages/VehicleManagement';
import MaintenanceHistory from './pages/MaintenanceHistory';
import InventoryManagement from './pages/InventoryManagement';
import OrderManagement from './pages/Orden';
import EmployeeManagement from './pages/EmployeeManagement';
import PaymentManagement from './pages/PaymentManagement';
import ServiceManagement from './pages/ServiceManagement';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';

// Import services
import { login as authLogin, getCurrentUser, logout as authLogout } from './services/authService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [userPermissions, setUserPermissions] = useState({
    gestionUsuarios: false,
    gestionVehiculos: false,
    gestionServicios: false,
    gestionOrdenes: false,
    gestionPagos: false,
    verReportes: false
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          
          // Parse and set user permissions
          if (userData.permisos) {
            const perms = typeof userData.permisos === 'string' 
              ? JSON.parse(userData.permisos) 
              : userData.permisos;
            setUserPermissions(perms);
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        authLogout();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const { user, token } = await authLogin(credentials);
      
      setUser(user);
      setIsAuthenticated(true);
      setShowLogin(false);
      
      // Parse and set user permissions
      if (user.permisos) {
        const perms = typeof user.permisos === 'string' 
          ? JSON.parse(user.permisos) 
          : user.permisos;
        setUserPermissions(perms);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        message: error.message || 'Error de autenticación' 
      };
    }
  };

  const handleLogout = () => {
    authLogout();
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    setUserPermissions({
      gestionUsuarios: false,
      gestionVehiculos: false,
      gestionServicios: false,
      gestionOrdenes: false,
      gestionPagos: false,
      verReportes: false
    });
  };

  const buttonStyle = {
    height: '40px',
    backgroundColor: 'var(--accent)',
    color: 'var(--primary)',
    borderRadius: '1em',
    border: 'none',
    padding: '0.5em 1em',
    cursor: 'pointer',
    margin: '0 5px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.3s ease'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'var(--primary)',
    color: 'var(--accent)',
    border: '2px solid var(--accent)'
  };

  const renderContent = () => {
    if (loading) return <div style={styles.loading}>Cargando...</div>;
    if (!isAuthenticated) return <Login onLogin={handleLogin} />;

    switch (currentView) {
      case 'vehicles':
        return <VehicleManagement />;
      case 'maintenance':
        return <MaintenanceHistory />;
      case 'inventory':
        return <InventoryManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'employees':
        return <EmployeeManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'services':
        return <ServiceManagement />;
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      default:
        return (
          <div style={styles.dashboard}>
            <h1>Bienvenido al Sistema de Mantenimiento Vehicular</h1>
            <p>Seleccione una opción del menú para comenzar</p>
            <div style={styles.dashboardGrid}>
              {[
                { 
                  id: 'vehicles', 
                  title: 'Vehículos', 
                  icon: '🚗',
                  permission: userPermissions.gestionVehiculos
                },
                { 
                  id: 'maintenance', 
                  title: 'Mantenimientos', 
                  icon: '🔧',
                  permission: true
                },
                { 
                  id: 'inventory', 
                  title: 'Inventario', 
                  icon: '📦',
                  permission: userPermissions.gestionServicios
                },
                { 
                  id: 'orders', 
                  title: 'Órdenes', 
                  icon: '📝',
                  permission: userPermissions.gestionOrdenes
                },
                { 
                  id: 'payments', 
                  title: 'Pagos', 
                  icon: '💳',
                  permission: userPermissions.gestionPagos
                },
                { 
                  id: 'services', 
                  title: 'Servicios', 
                  icon: '⚙️',
                  permission: userPermissions.gestionServicios
                },
                { 
                  id: 'employees', 
                  title: 'Empleados', 
                  icon: '👥',
                  permission: userPermissions.gestionUsuarios
                },
                { 
                  id: 'users', 
                  title: 'Usuarios', 
                  icon: '👤',
                  permission: userPermissions.gestionUsuarios
                },
                { 
                  id: 'roles', 
                  title: 'Roles', 
                  icon: '🔑',
                  permission: userPermissions.gestionUsuarios
                },
              ]
                .filter(item => item.permission)
                .map(item => (
                  <div 
                    key={item.id}
                    style={styles.dashboardCard}
                    onClick={() => setCurrentView(item.id)}
                  >
                    <div style={styles.dashboardIcon}>{item.icon}</div>
                    <h3>{item.title}</h3>
                  </div>
                ))}
            </div>
          </div>
        );
    }
  };

  const renderNavButton = (view, label, icon) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setCurrentView(view)}
        style={isActive ? activeButtonStyle : buttonStyle}
      >
        {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
        {label}
      </button>
    );
  };

  if (loading) {
    return <div style={styles.loading}>Cargando...</div>;
  }

  return (
    <div style={styles.appContainer}>
      {isAuthenticated ? (
        <>
          <header style={styles.header}>
            <div style={styles.logo} onClick={() => setCurrentView('dashboard')}>
              <span role="img" aria-label="Car">🚗</span> Mantenimiento Vehicular
            </div>
            
            <nav style={styles.nav}>
              <div style={styles.navSection}>
                {userPermissions.gestionVehiculos && renderNavButton('vehicles', 'Vehículos', '🚗')}
                {renderNavButton('maintenance', 'Mantenimientos', '🔧')}
                {userPermissions.gestionServicios && renderNavButton('inventory', 'Inventario', '📦')}
                {userPermissions.gestionOrdenes && renderNavButton('orders', 'Órdenes', '📝')}
                {userPermissions.gestionPagos && renderNavButton('payments', 'Pagos', '💳')}
                {userPermissions.gestionServicios && renderNavButton('services', 'Servicios', '⚙️')}
                {userPermissions.gestionUsuarios && (
                  <>
                    {renderNavButton('employees', 'Empleados', '👥')}
                    {renderNavButton('users', 'Usuarios', '👤')}
                    {renderNavButton('roles', 'Roles', '🔑')}
                  </>
                )}
              </div>
              
              <div style={styles.userSection}>
                <div style={styles.userInfo}>
                  <span style={styles.userName}>{user?.nombreUsuario}</span>
                  <span style={styles.userRole}>{user?.rol?.nombre || 'Usuario'}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  style={styles.logoutButton}
                >
                  Cerrar Sesión
                </button>
              </div>
            </nav>
          </header>
          
          <main style={styles.mainContent}>
            {renderContent()}
          </main>
          
          <footer style={styles.footer}>
            <p>© {new Date().getFullYear()} Sistema de Mantenimiento Vehicular</p>
          </footer>
        </>
      ) : (
        <div style={styles.authContainer}>
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '0 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '1rem 0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  navSection: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  userName: {
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  userRole: {
    fontSize: '0.8rem',
    opacity: 0.8
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  mainContent: {
    flex: 1,
    padding: '2rem',
    maxWidth: '1400px',
    width: '100%',
    margin: '0 auto'
  },
  dashboard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  dashboardCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textAlign: 'center',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  },
  dashboardIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem'
  },
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    marginTop: '2rem',
    fontSize: '0.9rem'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem',
    color: '#555'
  },
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  }
};

export default App;
