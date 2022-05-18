import { DeleteOutlined } from '@ant-design/icons';
import React from "react";
import { useHistory } from "react-router-dom";

const UserSmallView = ({ user,handleUserDelete=(f)=>f }) => {
  const history = useHistory();
  return (
    <tr>
       <td>{user._id}</td>
       <td>{user.name}</td>
       <td>{user.email}</td>
      <td>
          <div className="edit_del_button">
                               <button onClick={()=>handleUserDelete(user._id)} className="del_btn">
                               <DeleteOutlined className="text-warning"/>Delete
                               </button>

          </div>
      
        </td> 
    </tr>

  );
};

export default UserSmallView;
