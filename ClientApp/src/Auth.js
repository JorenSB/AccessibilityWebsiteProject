
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  console.log(jwtToken);
  return !!jwtToken; // Return true als er een token aanwezig is, anders false
};

export const jwtIsValid = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(jwtToken);

    if (!decodedToken || !decodedToken.exp) {
      
      localStorage.removeItem('jwtToken'); 
      return false;
    }

    const expirationTime = decodedToken.exp;

    const currentTime = Math.floor(Date.now() / 1000);

    if (expirationTime > currentTime) {
      return true; 
    } else {
      localStorage.removeItem('jwtToken'); 
      return false;
    }
  } catch (error) {
    console.error('Fout bij het decoderen van het JWT-token:', error);
    localStorage.removeItem('jwtToken'); 
    return false;
  }
};

export const getUserName = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(jwtToken);
    const username = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/username'] || '';
    return username || null;
  } catch (error) {
    console.error('Fout bij het decoderen van JWT-token:', error);
    return null;
  }
};


export const getUserRole = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(jwtToken);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || '';
    return role || null;
  } catch (error) {
    console.error('Fout bij het decoderen van JWT-token:', error);
    return null;
  }
};
