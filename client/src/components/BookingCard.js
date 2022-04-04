import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { diffDays } from '../actions/hotel';
import OrderModal from './models/orderModal';

const BookingCard = ({hotel,session,orderedBy}) => {
    const [showModal, setShowModal] = useState(false);
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
                        {showModal && <OrderModal session={session} orderedBy={orderedBy} showModal={showModal} setShowModal={setShowModal}/>}
                        <div className="d-flex justify-content-between h4">
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-primary"
                >
                  Show Payment info
                </button>
              </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default BookingCard
