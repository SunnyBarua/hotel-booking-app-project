import { loadStripe } from "@stripe/stripe-js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { diffDays, isAlreadyBooked, readHotel } from "../actions/hotel";
import { getSessionId } from "../actions/stripe";

const ViewHotel = () => {
  const [loading,setLoading]=useState(false)
  const [image, setImage] = useState("");
  const [alreadyBooked,setAlreadyBooked]=useState(false)

  const history=useHistory()
  const {auth}=useSelector((state)=>({...state}))
  
  const hotelId=useParams().hotelId
  console.log(hotelId)
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    loadHotels();
  }, []);
  
    const loadHotels = async () => {
      let res = await readHotel(hotelId);
      console.log(res)
      setHotel(res.data);
      setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    };
    useEffect(() => {
      if (auth && auth.token) {
        isAlreadyBooked(auth.token,hotelId).then((res) => {
          // console.log(res);
          if (res.data.ok) setAlreadyBooked(true);
        });
      }
    }, []);

  const handleClickForBooked=async(e)=>{
    e.preventDefault()
    alert("This Room is Already Booked ! So You can't book the same date !!");
    
  }

  const handleClick=async(e)=>{
    e.preventDefault()
    setLoading(true)
    
    if (!auth) {
      history.push("/login");
      return;
    }
   
    
    let res=await getSessionId(auth.token,hotelId)
    console.log("Get session id response",res.data.sessionId);
    const stripe=await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe.redirectToCheckout({
      sessionId:res.data.sessionId
    }).then((result)=>console.log(result))
    

  };
  
  return (
    <>
      <div className="details-container">
        <h2 className="mt-5">{hotel.title}</h2>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div className="rating-inner"></div>
          </div>
          
        </div>

        <img
          src={image}
          alt="Hotel" className="hotel-details-img"
        />

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>{hotel.location}</h3>
            <h5>{hotel.address}</h5>
            <p>
              {hotel.description}
            </p>

            <div className="features mt-5">
              <h3 className="mb-4">Features:</h3>
              <div className="room-feature d-flex">
              <i class="fas fa-bed feature-icon"></i>
              <h6 className="mt-2 ml-1"> {hotel.bed <2?"Bed :":"Beds :"} {hotel.bed}</h6>
                
              </div>

              <div className="room-feature">
              <i className="fas fa-wifi feature-icon"></i>
                <h6 className="mt-2 ml-1">Wifi: {hotel.wifi}</h6>

              </div>
              <div className="room-feature">
              <i className="fas fa-fan feature-icon"></i>
                <h6 className="mt-2 ml-1">AirCondition: {hotel.airConditioned}</h6>
                
              </div>
              <div className="room-feature">
              <i className="fas fa-paw feature-icon"></i>
                <h6 className="mt-2 ml-1">Pets Allowed: {hotel.petsAllowed}</h6>
                
              </div>
              <div className="room-feature">
              <i class="fa fa-user" aria-hidden="true"></i>
              <p className="mt-2 ml-1">Posted By : {hotel.postedBy && hotel.postedBy.name}</p>
                
              </div>
              
              
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${hotel.price}</b> /  {diffDays(hotel.from,hotel.to)}
                            {diffDays (hotel.from,hotel.to)<=1 ? " day" :" days"}
              </p>
              <p>
              <span className="mr-2">From : </span>
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
            <span className="mr-2">To : </span>
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
           {alreadyBooked ?(
           <button onClick={handleClickForBooked} className="btn btn-block py-3 booking-btn" >  Already Booked
           </button>):( 
           <button onClick={handleClick} className="btn btn-block py-3 booking-btn" disabled={loading}>
                {loading 
                ? "Loading..." : 
                
                auth && auth.token 
                ? "Book Now": 
                "Login to Book"}</button>)
           }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
