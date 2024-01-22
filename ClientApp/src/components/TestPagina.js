import React, { useState, useEffect } from 'react';

const TestPagina = () => {
  const [secureData, setSecureData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7101/testController', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Voeg hier je JWT-token toe (vervang 'your-jwt-token' door het daadwerkelijke token)
            'Authorization': 'Bearer your-jwt-token',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSecureData(data);
        } else {
          console.error('Failed to fetch secure data');
        }
      } catch (error) {
        console.error('Error fetching secure data:', error);
      }
    };

    fetchData();
  }, []); // De lege array zorgt ervoor dat de useEffect alleen wordt uitgevoerd bij de eerste render

  return (
    <div>
      <h1>React Test Page</h1>
      <p>Secure Data:</p>
      {secureData ? (
        <pre>{JSON.stringify(secureData, null, 2)}</pre>
      ) : (
        <p>Loading secure data...</p>
      )}
    </div>
  );
};

export default TestPagina;