import axios from "axios"

export const createHotel=async(token,data)=>{
    await axios.post(`${process.env.REACT_APP_API}/hotel/create-hotel`,data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const allHotel=async()=>await axios.get(`${process.env.REACT_APP_API}/hotel/all`)

export const hotelDetails=async()=>await axios.get(`${process.env.REACT_APP_API}/hotel/all`)

export const diffDays=(from,to)=>{
    const day=24*60*60*1000
    const start=new Date(from)
    const end=new Date(to)
    const difference=Math.round(Math.abs((start-end)/day))
    return difference;
}

export const sellerHotels=async(token)=>
     await axios.get(`${process.env.REACT_APP_API}/hotel/seller-hotels`,{
         headers:{
            Authorization:`Bearer ${token}`
         }
     })

export const deleteHotel=async(token,hotelId)=>await axios.delete(`${process.env.REACT_APP_API}/hotel/delete-hotel/${hotelId}`,{
    headers:{
        Authorization:`Bearer ${token}`,
    },
})

export const readHotel=async(hotelId)=>await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);

export const updateHotel=async(token,data,hotelId)=>{
    await axios.put(`${process.env.REACT_APP_API}/hotel/update-hotel/${hotelId}`,data,{
        headers:{
            Authorization:`Bearer ${token}`
        },
    });
}


export const userHotelBookings = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/order/user-hotel-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const isAlreadyBooked = async (token, hotelId) =>
  await axios.get(`${process.env.REACT_APP_API}/hotel/is-already-booked/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const searchListings=async(query)=>await axios.post(`${process.env.REACT_APP_API}/hotel/search-listings`,query)

