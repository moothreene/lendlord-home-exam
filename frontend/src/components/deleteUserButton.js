import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
function DeleteUserButton({ onClick }) {
  const btnStyle = {
    border: 'none',
    backgroundColor: 'white',
    borderRadius: '5px',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize:'1em',
  };
  return (
    <button className='delete-user' onClick={onClick} style={btnStyle}>
      <FaRegTrashAlt />
    </button>
  );
}

export default DeleteUserButton;
