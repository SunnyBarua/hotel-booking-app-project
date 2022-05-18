
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allUsers, deleteUser } from "../actions/auth";
import UserSmallView from "./UserSmallView";


const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const {auth}=useSelector((state)=>({...state}))

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    let res = await allUsers();
    setUsers(res.data);
  };
  console.log(users)
  const handleUserDelete=async(userId)=>{
    if(!window.confirm("Are you sure?")) return;
    deleteUser(auth.token,userId).then(res=>{
      toast.success("User Deleted !");
      loadUsers()
    })

  }

  return (
    <div className="conatiner admin_user_list">

      <table className="table-sm table-striped col-sm-12 col-md-12 col-lg-12 my-3">
      <thead>
      <tr>
      <th>ID</th>
      <th >NAME</th>
      <th>EMAIL</th>
      <th>BUTTON</th>
    </tr>
    </thead>
      <tbody>
         {users.map((user) => (    
            <UserSmallView key={user._id} user={user} handleUserDelete={handleUserDelete} />
                
          ))}
      </tbody>              
    </table>            
         
    </div>
  );
};

export default AdminUserList;
