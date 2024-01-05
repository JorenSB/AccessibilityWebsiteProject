import React, { useState, useEffect } from 'react';

const FetchBedrijven = () => {

//   const [bedrijfData, setBedrijfData] = useState('');

//   const fetchBedrijfData = async () => {
//     try {
//       const response = await fetch('https://localhost:7101/api/portaal/admin/companies', {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setBedrijfData(data[0].bedrijfData);
//     } 
    
//     catch (error) {
//       console.error('Error:', error);
//     }
//   }


//   useEffect(() => {
//     fetchBedrijfData();
//   }, []);

const [bedrijfData, setbedrijfData] = useState('bedrijven');
  useEffect(() => {
    fetch("https://localhost:7101/api/portaal/admin/companies", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setbedrijfData(data[0].bedrijfData);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <div>
      <h2>Test Functie:</h2>
        <div>
            {/* <ul>
            {bedrijfData.data.map(company => (
                <li key={company.id}>{company.id}</li>
            ))}
            </ul> */}
            {bedrijfData && <p>{bedrijfData}</p>}
        </div>
    </div>
  );
}
export default FetchBedrijven;