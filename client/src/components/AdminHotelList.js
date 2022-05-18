
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allHotel, deleteHotel } from "../actions/hotel";
import AdminHotelSmallView from "./AdminHotelSmallView";

const AdminHotelList = () => {
  const [hotels, setHotels] = useState([]);
  const {auth}=useSelector((state)=>({...state}))

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    let res = await allHotel();
    setHotels(res.data);
  };
  console.log(hotels)
  const handleHotelDelete=async(hotelId)=>{
    if(!window.confirm("Are you sure?")) return;
    deleteHotel(auth.token,hotelId).then(res=>{
      toast.success("Hotel Deleted !");
      loadHotels()
    })

  }

  return (
    <div className="conatiner">
      {/* <section  className="container rooms"> */}
      <table className="table-sm table-striped col-sm-12 col-md-12 col-lg-12 my-3">
      <thead>
      <tr>
       <th>Image</th>
      <th >HOTEL NAME</th>
      <th>ADDRESS</th>
      <th>RATE</th>
      <td>Availability</td>
      <td>Edit Button</td>
      <td>Delete Button</td>

    </tr>
    </thead>
    <tbody>
      

        {/* <div className="container-fluid">
          <div className="row mt-5">
             */}
              {hotels.map((hotel) => (
                // <div className="col-sm-12 col-md-12 col-lg-12 my-3">
                <AdminHotelSmallView key={hotel._id} hotel={hotel} handleHotelDelete={handleHotelDelete} />
                // </div>
              ))}
            
          {/* </div>
        </div> */}
      
      </tbody>
      </table>
      {/* </section> */}
    </div>
  );
};

export default AdminHotelList;
