import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
function UpdateUserButton({ onClick }) {
  const btnStyle = {
    border: 'none',
    backgroundColor: 'white',
    borderRadius: '5px',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize:'1em',
  };
  return (
    <button className='update-user' onClick={onClick} style={btnStyle}>
      <FaPencilAlt />
    </button>
  );
}
export default UpdateUserButton;
