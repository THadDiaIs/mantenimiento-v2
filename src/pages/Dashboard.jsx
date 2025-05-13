import OrderManagement from "../components/OrderManagement";
import VehicleManagement from "../components/VehicleManagement";
import ServiceManagement from "../components/ServiceManagement";
import PaymentManagement from "../components/PaymentManagement";
import UserManagement from "../components/UserManagement";

const Dashboard = ({userPermissions, handleLogout, currentView, setCurrentView}) => {
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

    return (
        <div style={{ padding: '20px' }}>
          <nav style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            backgroundColor: 'rgba(var(--tertiary-raw), 0.7)',
            padding: '10px',
            borderRadius: '1em'
          }}>
            {userPermissions.gestionVehiculos && (
              <button
                onClick={() => setCurrentView('vehicles')}
                style={currentView === 'vehicles' ? activeButtonStyle : buttonStyle}
              >
                Vehículos
              </button>
            )}
            {userPermissions.gestionServicios && (
              <button
                onClick={() => setCurrentView('services')}
                style={currentView === 'services' ? activeButtonStyle : buttonStyle}
              >
                Servicios
              </button>
            )}
            {userPermissions.gestionOrdenes && (
              <button
                onClick={() => setCurrentView('orders')}
                style={currentView === 'orders' ? activeButtonStyle : buttonStyle}
              >
                Órdenes
              </button>
            )}
            {userPermissions.gestionPagos && (
              <button
                onClick={() => setCurrentView('payments')}
                style={currentView === 'payments' ? activeButtonStyle : buttonStyle}
              >
                Pagos
              </button>
            )}
            {userPermissions.gestionUsuarios && (
              <button
                onClick={() => setCurrentView('users')}
                style={currentView === 'users' ? activeButtonStyle : buttonStyle}
              >
                Usuarios
              </button>
            )}
            <div style={{ marginLeft: 'auto' }}>
              <button
                onClick={handleLogout}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#ff4444',
                  color: 'white'
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </nav>

          <div style={{ marginTop: '20px' }}>
            {currentView === 'orders' && <OrderManagement />}
            {currentView === 'vehicles' && <VehicleManagement />}
            {currentView === 'services' && <ServiceManagement />}
            {currentView === 'payments' && <PaymentManagement />}
            {currentView === 'users' && <UserManagement />}
          </div>
        </div >
    );
};
const styles = {
    appContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      '& h1': {
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: '600',
      }
    },
    loginButtonContainer: {
      position: 'relative',
    },
    loginButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1.5rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: '#2980b9',
        transform: 'translateY(-2px)',
      }
    },
    loginTooltip: {
      position: 'absolute',
      top: '100%',
      right: 0,
      backgroundColor: 'white',
      color: '#333',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      whiteSpace: 'nowrap',
      marginTop: '0.5rem',
      '&:before': {
        content: '""',
        position: 'absolute',
        bottom: '100%',
        right: '1rem',
        borderWidth: '0 8px 8px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent white',
      }
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    userName: {
      marginRight: '0.5rem',
      color: 'white',
    },
    logoutButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: '#c0392b',
        transform: 'translateY(-2px)',
      }
    },
    mainContent: {
      flex: 1,
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
    },
    landingPage: {
      textAlign: 'center',
      padding: '4rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      '& h1': {
        fontSize: '2.5rem',
        marginBottom: '1rem',
        color: '#2c3e50',
      },
      '& p': {
        fontSize: '1.2rem',
        color: '#7f8c8d',
        marginBottom: '3rem',
      },
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      margin: '3rem 0',
    },
    featureCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
      },
      '& h3': {
        color: '#2c3e50',
        marginTop: 0,
      },
      '& p': {
        color: '#7f8c8d',
        marginBottom: 0,
      },
    },
    ctaSection: {
      marginTop: '4rem',
    },
    primaryButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '1rem 2.5rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: '600',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: '#2980b9',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
    },
    contactText: {
      marginTop: '1.5rem',
      color: '#7f8c8d',
      '& a': {
        color: '#3498db',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
    dashboardNav: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e0e0e0',
    },
    navButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#7f8c8d',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s',
      '&:hover': {
        color: '#2c3e50',
        backgroundColor: '#f0f0f0',
      },
    },
    activeNavButton: {
      color: '#2c3e50',
      fontWeight: '600',
      backgroundColor: '#e8f4fc',
      borderBottom: '2px solid #3498db',
    },
    dashboardContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    loginOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    loginContainer: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      width: '100%',
      maxWidth: '400px',
    },
    footer: {
      backgroundColor: '#2c3e50',
      color: 'white',
      textAlign: 'center',
      padding: '1.5rem',
      marginTop: 'auto',
      '& p': {
        margin: 0,
        color: 'rgba(255,255,255,0.8)',
        fontSize: '0.9rem',
      },
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.2rem',
      color: '#555',
    },
};

export default Dashboard;