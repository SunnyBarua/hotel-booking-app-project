import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userHotelBookings } from "../../actions/hotel";
import BookingCard from "../../components/BookingCard";
import ConnectNav from "../../components/ConnectNav";
import DashboardNav from "../../components/DashboardNav";


const Dashboard = () => {
  
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const [booking,setBooking]=useState([])
  
  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings =  async() => {
    const {data} =await userHotelBookings(token);
    setBooking(data)
  };
  console.log("WORKING!!",booking)
 
  
  return (
    <>
      <div
        className="container-fluid bg-secondary p-5"
        style={{ height: "10rem" }}
      >
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <p>Your Bookings</p>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary">Browse Hotels</Link>
          </div>
        </div>
      </div>
      <div className="row">
       {booking.map((b)=>(
        <BookingCard 
        key={b._id} 
        hotel={b.hotel} 
        session={b.session} 
        orderedBy={b.orderedBy}
        /> 
       ))}
        </div>
    </>
  );
};

export default Dashboard;
