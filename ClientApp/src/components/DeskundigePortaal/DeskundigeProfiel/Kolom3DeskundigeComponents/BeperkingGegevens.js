import React, { useEffect, useState } from 'react';
import '../Kolom3DeskundigeComponents/BeperkingGegevens.css';

const Dropdown = (props) => {    
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [disabilities, setDisabilities] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  
    toggleDropdown();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://localhost:7101/api/deskundige/getdisabilities`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setDisabilities(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Update selectedOptions whenever disabilities change
    setSelectedOptions(props.disabilities || []);
  }, [props.disabilities]);

  const removeOption = (index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={toggleDropdown}>
        {isOpen ? 'Verberg Beperkingen' : 'Toon Beperkingen'}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {disabilities.map((option, index) => (
            <a key={index} onClick={() => selectOption(option)}>
              {option}
            </a>
          ))}
        </div>
      )}
      <div className='optionsContainer'>
        {selectedOptions.length > 0 && (
          <div className="selected-options">
            Geselecteerde Beperkingen:
            <ul>
              {selectedOptions.map((option, index) => (
                <li key={index}>
                  {option}
                  <button onClick={() => removeOption(index)}>X</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
