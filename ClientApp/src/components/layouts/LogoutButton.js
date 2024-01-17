import React from 'react';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {

  const navigate = useNavigate();
    async function logout(){
      try {
        const response = await fetch('https://localhost:7101/api/account/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (response.ok) {
          console.log('Uitloggen uitgevoerd');
          localStorage.removeItem('jwtToken');
          
          // Gebruik de navigate instantie om te redirecten
          navigate("/");
        } else {
          console.error('Fout tijdens uitloggen:', response.statusText);
        }
      } catch (error) {
        console.error('Fout tijdens uitloggen:', error);
      }
    };

  return (
    
      <button
        onClick={logout}
        label="Log uit"
        className="btn btn-danger text-white"
        disabled={false}
      >Log Uit</button>
    
  );
};

export default LogoutButton;