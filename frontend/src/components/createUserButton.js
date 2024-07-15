import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
function CreateUserButton({ onClick }) {
  const btnStyle = {
    border: 'none',
    padding: '10px 25px',
    marginLeft: '2.5%',
    backgroundColor: 'white',
    borderRadius: '5px',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize:'1em',
  };
  return (
    <button className='create-user' onClick={onClick} style={btnStyle}>
      <FaPlusCircle />
      {' Add'}
    </button>
  );
}

export default CreateUserButton;
