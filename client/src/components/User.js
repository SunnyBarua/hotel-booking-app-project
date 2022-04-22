import React from 'react';
const User = ({user}) => {
  return (
    <>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            </tr>
            
        </thead>
        <tbody>
            <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
            </tr>
        </tbody>
    </table>
    </>
  )
}

export default User