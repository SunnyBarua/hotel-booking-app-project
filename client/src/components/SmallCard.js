import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { diffDays } from '../actions/hotel'
import { currencyFormatter } from '../actions/stripe'

const SmallCard = ({hotel ,handleHotelDelete=(f)=>f,owner=false,showMoreButton=true}) => {
    console.log(hotel)
    const history=useHistory()
    return (
        <>
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4 mt-5">
                    <img src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`} alt="hotel pic" style={{height:"300px",width:"400px"}}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{hotel.title}
                        <span className="float-right text-primary">{currencyFormatter({
                            amount:hotel.price*100,
                            currency:"usd"
                        })}</span>
                        </h3>
                        <p className="alert alert-info">{hotel.address}</p>
                        <p className="card-text">{`${hotel.description.substring(1,200)}...`}</p>
                        
                        <p className="card-text">
                            for {diffDays(hotel.from,hotel.to)}
                            {diffDays (hotel.from,hotel.to)<=1 ? " day" :" days"}
                        </p>
                        <p className="card-text">{hotel.bed} bed</p>
                        <p className="card-text">{hotel.wifi ==="Yes" ?"Avialable Wifi":"Not Available Wifi"}</p>
                        <p className="card-text">{hotel.airConditional ==="Yes" ?"Avialable Air Condition":"Not Available Air Condition"}</p>
                        <p className="card-text">{hotel.wifi ==="Yes" ?"Pets Allowed":"Not Pets Allowed"}</p>

                        <p className="card-text">Available from {new Date(hotel.from).toLocaleDateString()}</p>
                        <div className="d-flex h4">
                            
                               <button className='edit_btn d-flex' onClick={()=>history.push(`/hotel/edit/${hotel._id}`)}>
                               <Link to={`/hotel/edit/${hotel._id}`}>
                                <EditOutlined classID='text-warning' style={{ fontSize: '26px', color: '#fff' }}/> 
                                </Link>Edit
                               </button>
                               <button onClick={()=>handleHotelDelete(hotel._id)} className="del_btn">
                               <DeleteOutlined className="text-warning"/>Delete
                               </button>
                                                   
                           
                            <div className='d-flex justify-content-between h4'>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default SmallCard
