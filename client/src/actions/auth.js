import axios from "axios"

export const register=async(user)=>await axios.post(`${process.env.REACT_APP_API}/user/register`,user)

export const login=async(user)=>await axios.post(`${process.env.REACT_APP_API}/user/login`,user)

export const updateUserInLocalStorage=(user,next)=>{
    if(window.localStorage.getItem("auth")){
        let auth=JSON.parse(localStorage.getItem("auth"))
        auth.user=user
        localStorage.setItem("auth",JSON.stringify(auth))
        next()
    }
}


export const allUsers = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user/all-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteUser=async(token,userId)=>await axios.delete(`${process.env.REACT_APP_API}/admin/delete-user/${userId}`,{
    headers:{
        Authorization:`Bearer ${token}`,
    },
});

export const updateUser=async(token,data,userId)=>{
  await axios.put(`${process.env.REACT_APP_API}/user/update-user/${userId}`,data,{
      headers:{
          Authorization:`Bearer ${token}`
      },
  });
}