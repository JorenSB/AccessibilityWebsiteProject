import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from './Auth';

const PrivateRoutes = ({ role }) => {
  const [navigateTo, setNavigateTo] = useState(null);
  const isAuthenticatedUser = isAuthenticated();
  const userRole = getUserRole();

  useEffect(() => {
    // Controleer of de gebruiker is ingelogd en de juiste rol heeft
    if (!isAuthenticatedUser || (role && role.length > 0 && !role.includes(userRole))) {
      // Update de state om de navigatie aan te sturen
      setNavigateTo("/");
    }
  }, [isAuthenticatedUser, userRole, role]);

  console.log("Rol = " + userRole);

  if (navigateTo) {
    // Als navigateTo is ingesteld, navigeer dan naar de opgegeven locatie
    return <Navigate to={navigateTo} />;
  }

  return isAuthenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
