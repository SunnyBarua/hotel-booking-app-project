import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { diffDays } from "../actions/hotel";
import { currencyFormatter } from "../actions/stripe";
const AdminHotelSmallView = ({ hotel,handleHotelDelete=(f)=>f }) => {
  const history = useHistory();
  return (
    <tr>
    <td><img src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`} className="admin_hotel_view" alt=""/>
    </td>
    <td>{hotel.title}</td>
    <td>{hotel.location}</td>
    <td>{currencyFormatter({amount: hotel.price*100,
                    currency: "usd",
                   })}<br/> for {diffDays(hotel.from,hotel.to)} {diffDays(hotel.from,hotel.to)<=1 ? 'day' :" days"}</td>
    <td>Available from {new Date(hotel.from).toLocaleDateString()}</td>
    <td><button className='edit_btn d-flex' onClick={()=>history.push(`/hotel/edit/${hotel._id}`)}>
                               <Link to={`/hotel/edit/${hotel._id}`}>
                               <EditOutlined classID='text-warning' style={{ fontSize: '26px', color: '#fff' }}/> 
                                </Link>Edit
                              </button></td>
    <td><button onClick={()=>handleHotelDelete(hotel._id)} className="del_btn">
                               <DeleteOutlined className="text-warning"/>Delete
                               </button></td>
    </tr>
    
  );
};

export default AdminHotelSmallView;
