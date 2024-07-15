import React, { useEffect, useState } from 'react';
import Modal from './modal';
import axios from 'axios';

export default function CreateUser({ displayModal, closeModal }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('worker');
  const [salary, setSalary] = useState(0);
  const [manager, setManager] = useState('');
  const [managerList, setManagerList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users').then((res) => {
      setManagerList(res.data.filter((user) => user.role === 'manager'));
    });
  }, [displayModal]);

  return (
    <Modal displayModal={displayModal} closeModal={closeModal}>
      <h1>Add New User</h1>
      <form
        className="user-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('firstName', firstName);
          formData.append('lastName', lastName);
          formData.append('email', email);
          formData.append('role', role);
          formData.append('salary', salary);
          formData.append('manager', manager);
          await axios.post('http://localhost:4000/create', formData);
          closeModal();
        }}
      >
        <div className="firstName">
          <label>First Name</label>
          <input
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="lastName">
          <label>Last Name</label>
          <input
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="email">
          <label>Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="role">
          <label>Role</label>
          <select
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="worker">Worker</option>
            <option value="driver">Driver</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        {role !== 'manager' && (
          <div className="manager">
            <label>Manager</label>
            <select
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            >
              <option value="">None</option>
              {managerList.map((manager) => {
                return <option value={manager._id}>{`${manager.firstName} ${manager.lastName}`}</option>;
              })}
            </select>
          </div>
        )}
        <div className="salary">
          <label>Salary</label>
          <input
            required
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="submit">
          <button className="form-button" type="submit">
            Add User
          </button>
        </div>
      </form>
    </Modal>
  );
}
