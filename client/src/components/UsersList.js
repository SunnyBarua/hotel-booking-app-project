import { DeleteOutlined } from '@ant-design/icons';
import { Button } from "antd";
import React, { useEffect, useState } from 'react';
import { allUsers } from '../actions/auth';
const UsersList = () => {

const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);
  console.log(users)

  const loadUsers = async () => {
    let res = await allUsers();
    setUsers(res.data);
  };
  const deleteHandler=(id)=>{
      console.log(id)
  }
  return (
    <>
    <h1>Users</h1>
    <table class="table">
    <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            </tr>
            
        </thead>
        <tbody>
            {users.map(user=>(
                <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <Button onClick={()=>deleteHandler(user._id)} > <DeleteOutlined className="h5 pt-2"/>Delete</Button>
            </tr>

            ))}
        </tbody>
    </table>
    </>
  )
}

export default UsersList