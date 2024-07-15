import React, { useState } from 'react';

import './App.css';
import Header from './components/header';
import CreateUser from './components/createUser';
import Users from './components/users';
import CreateUserButton from './components/createUserButton';

function App() {
  const [shown, setShown] = useState(false);

  const toggleModal = () => setShown((prev) => !prev);

  return (
    <div className="App">
      <Header />
      <div id="content">
        <CreateUserButton onClick={toggleModal} />
        <CreateUser displayModal={shown} closeModal={()=>toggleModal()} />
        <Users trigger = {shown}/>
      </div>
    </div>
  );
}

export default App;
