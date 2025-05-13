import { useState, useEffect } from "react";
import { login as authLogin, getCurrentUser, logout as authLogout } from './services/authService';
import Dashboard from "./pages/Dashboard";
import HomePage from './pages/HomePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
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
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        if (isMounted && userData) {
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
        if (isMounted) {
          authLogout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (credentials) => {
    setUserPermissions({
      gestionVehiculos: true,
      gestionServicios: true,
      gestionOrdenes: true,
      gestionPagos: true,
      gestionUsuarios: true,
    })
    setCurrentView('orders')
    setIsAuthenticated(true);
    setShowLogin(false);
    /*try {
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
    }*/
  };

  const handleLogout = () => {
    authLogout();
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    setShowLogin(true);
    setUserPermissions({
      gestionUsuarios: false,
      gestionVehiculos: false,
      gestionServicios: false,
      gestionOrdenes: false,
      gestionPagos: false,
      verReportes: false
    });
    // Redirect to login page
    window.location.href = '/';
  };

  const renderContent = () => {
    if (loading) {
      return <div style={{ textAlign: 'center', padding: '2em' }}>Cargando...</div>;
    }

    if (!isAuthenticated) {
      return <HomePage handleLogin={handleLogin} />;
    }

    // Render for authenticated users
    return (
      <Dashboard userPermissions={userPermissions} handleLogout={handleLogout} currentView={currentView} setCurrentView={setCurrentView}/>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default App;
