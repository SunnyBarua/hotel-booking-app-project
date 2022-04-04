import React from 'react'
import { Link } from 'react-router-dom'

const DashboardNav = () => {
    const active=window.location.pathname

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className={`nav-link ${active==="/dashboard" && "active"}`} to="/dashboard"><h5 style={{color:"#0000FF"}}>Your Bookings</h5></Link>
            </li>
            <li className="nav-item">
            <Link 
            className={`nav-link ${active==="/dashboard/seller" && "active"}`} 
            
            to="/dashboard/seller"><h5 style={{color:"#0000FF"}}>Your Hotels</h5></Link>
            </li>
        </ul>
    )
}

export default DashboardNav
