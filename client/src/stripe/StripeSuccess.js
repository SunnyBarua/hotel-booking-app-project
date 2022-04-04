import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { stripeSuccessRequest } from '../actions/stripe'

const StripeSuccess = () => {
  const history=useHistory()
  const hotelId=useParams().hotelId
  const {auth:{token}}=useSelector((state)=>({...state}));

  useEffect(()=>{
    stripeSuccessRequest(token,hotelId).then((res)=>{
      if(res.data.success){
        history.push("/dashboard")
      }else{
        history.push("/stripe/cancel");
      }
    })
  },[hotelId])
  return (
    <div style={{textAlign:"center" , marginTop:"10%"}}>
      <h1>Congratulations!! Payment Success. {hotelId}!</h1>
      </div>
  )
}

export default StripeSuccess