import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <>
    <div className='title'> Admin Panel</div>
    <div className='all_card'>
    <div className="card" >
  
  <div class="card-body">
   <Link to="/admin/hotel-list" className="card_name">All Hotels</Link>
   
  </div>
    </div>
    <div className="card" >
  
  <div class="card-body">
   <Link to="/admin/user-list" className="card_name">All User</Link>
   
  </div>
    </div>
    <div className="card" >
  
  <div class="card-body">
   <Link to="/dashboard/seller" className="card_name">Your Hotels</Link>
   
  </div>
    </div>
    </div>
    </>
  )
}

export default Admin