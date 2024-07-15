import axios from 'axios';
import React, { useEffect } from 'react';
import EditUser from './editUser';
import './users.css';
import UpdateUserButton from './updateUserButton';
import DeleteUserButton from './deleteUserButton';
function Users({trigger}) {
  const [userList, setUserList] = React.useState([]);
  const [editShown, setEditShown] = React.useState(false);
  const [editId, setEditId] = React.useState('');
  const [update, setUpdate] = React.useState(false);

  useEffect(() => {setUpdate(!update)}, [trigger, editShown]);

  const toggleEditModal = () => setEditShown((prev) => !prev);

  const dynamicSort = (property) => {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

  useEffect(() => {
    axios.get('http://localhost:4000/users').then((res) => {
      setUserList(res.data);
    });
  }, [update]);

  const handleDelete = (id) => {
    try {
      axios({
        method: 'delete',
        url: `http://localhost:4000/user/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Host: 'localhost:4000',
          Accept: '*/*',
          Origin: 'http://localhost:3000',
        },
      }).then((res) => {
        setUserList(userList.filter((user) => user._id !== id));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    toggleEditModal();
    setEditId(id);
  };
  return (
    <>
      <EditUser
        update={update}
        id={editId}
        displayModal={editShown}
        closeModal={toggleEditModal}
      />
      <div className='users'>
        <table className="users-table">
          <tr>
            <th onClick={()=>setUserList([...userList].sort(dynamicSort('firstName')))}>First Name</th>
            <th onClick={()=>setUserList([...userList].sort(dynamicSort('lastName')))}>Last Name</th>
            <th onClick={()=>setUserList([...userList].sort(dynamicSort('email')))}>Email</th>
            <th onClick={()=>setUserList([...userList].sort(dynamicSort('createdAt')))}>Date Started</th>
            <th onClick={()=>setUserList([...userList].sort(dynamicSort('role')))}>Role</th>
            <th onClick={()=>setUserList([...userList].sort(dynamicSort('salary')))}>Salary</th>
            <th onClick={()=>setUserList([...userList].sort(dynamicSort('manager')))}>Manager</th>
            <th>Actions</th>
          </tr>
          {userList.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td className="email">{user.email}</td>
                <td>{user.createdAt.substring(0, 10)}</td>
                <td>{user.role}</td>
                <td>{user.salary}</td>
                <td className="manager">{user.manager?.firstName} {user.manager?.lastName}</td>
                <td>
                  <UpdateUserButton onClick={() => handleEdit(user._id)} />
                  <DeleteUserButton onClick={() => handleDelete(user._id)} />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default Users;
