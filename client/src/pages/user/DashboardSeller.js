import { HomeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteHotel, sellerHotels } from "../../actions/hotel";
import { createConnectAccount } from "../../actions/stripe";
import ConnectNav from "../../components/ConnectNav";
import DashboardNav from "../../components/DashboardNav";
import SmallCard from "../../components/SmallCard";


const DashboardSeller = () => {
  const [hotels,setHotels]=useState([])
  const {auth}=useSelector((state)=>({...state}))
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
   loadSellersHotels()
  },[])

  const loadSellersHotels=async()=>{
    let {data}=await sellerHotels(auth.token)
    setHotels(data)
  }
  console.log(hotels)

  const handleClick=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      let res=await createConnectAccount(auth.token)
      console.log(res)
      window.location.href=res.data

    }catch(err){
      console.log(err)
      toast.error("Stripe connect failed. Try Again.")
      setLoading(true)
    }

  }

  const handleHotelDelete=async(hotelId)=>{
    if(!window.confirm("Are you sure?")) return;
    deleteHotel(auth.token,hotelId).then(res=>{
      toast.success("Hotel Deleted !");
      loadSellersHotels()
    })

  }

  const connected=()=>(
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h3>Your Hotels</h3>
          </div>
          <div className="col-md-2 mb-5">
            <Link to="/hotels/new" className="btn btn-primary">+ Add New</Link>
          </div>
        </div>
      <div className="mt-5">
        {hotels.map(hotel=>(
           <SmallCard hotel={hotel} key={hotel._id} handleHotelDelete={handleHotelDelete}/>
        ))}
      </div>
      </div>
  )

  const notConnected=()=>(
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1"/>
          <h4>Setup payouts to post hotel rooms</h4>
          <p className="lead">
            MERN partners with striper to transfer earnings to your bank account
          </p>
          <button className="btn btn-primary mb-3" onClick={handleClick} disabled={loading}>{loading ? "Processing...":"Setup Payouts"}
          </button>
          <p className="text-muted">
            <small>You'll be redirected to striper to complete the onboarding process.</small>
          </p>
          </div>
          </div>
        </div>
      </div>
  )
  return (
    <>
      <div
        className="container-fluid bg-secondary p-5"
        style={{ height: "10rem" }}
      >
        <h1 className="text-center" style={{ color: "#fff" }}>
         <ConnectNav/>
        </h1>
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? connected() : notConnected()}
     
    </>
  );
};

export default DashboardSeller;
