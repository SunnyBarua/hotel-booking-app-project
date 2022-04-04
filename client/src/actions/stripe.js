import axios from "axios";

export const createConnectAccount=async(token)=>
    await axios.post(
        `${process.env.REACT_APP_API}/stripe/create-connect-account`,{},
    {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })

export const getAccountStatus=async(token)=>axios.post(
    `${process.env.REACT_APP_API}/stripe/get-account-status`,{},
    {
        headers:{
            Authorization:`Bearer ${token}`
        },
    }
)

export const getAccountBalance=async(token)=>axios.post(
    `${process.env.REACT_APP_API}/stripe/get-account-balance`,{},
    {
        headers:{
            Authorization:`Bearer ${token}`
        },
    }
)

export const currencyFormatter=(data)=>{
    return (data.amount/ 100).toLocaleString(data.currency,{
        style:"currency",
        currency:data.currency
    });
};

export const payoutSetting=async(token)=>await axios.post(`${process.env.REACT_APP_API}/stripe/payout-setting`,{},{
    headers:{
        Authorization: `Bearer ${token}`,
    }
})
export const getSessionId = async (token, hotelId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe/stripe-session-id`,
    {
      hotelId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const stripeSuccessRequest=async(token,hotelId)=>await axios.post(`${process.env.REACT_APP_API}/stripe/stripe-success`,
  {hotelId},
  {
      headers:{
          Authorization:`Bearer ${token}`,
      }
  }
  )