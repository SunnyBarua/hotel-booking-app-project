import React from "react";
import { Link, useHistory } from "react-router-dom";
import { diffDays } from "../actions/hotel";
import { currencyFormatter } from "../actions/stripe";
const Hotel = ({ hotel }) => {
  const history = useHistory();
  return (
    <div className="card p-2">
      <img
        className="card-img-top mx-auto"
        src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
        alt=""
      />
      <div className="card-body d-flex flex-column hotel_desc">
        <h5 className="card-title">{hotel.title}</h5>
        <p className="card-title">{hotel.location}</p>

        <div className="ratings mt-auto mb-3">
          <p className="card-text">
          {currencyFormatter({
                    amount: hotel.price*100,
                    currency: "usd",
                  })}<br/> for {diffDays(hotel.from,hotel.to)} {diffDays(hotel.from,hotel.to)<=1 ? 'day' :" days"}
            
          </p>
          <p className="card-text">
                Available from {new Date(hotel.from).toLocaleDateString()}
              </p>

        </div>
        <button
          className="btn btn-block view-btn"
          onClick={() => history.push(`/hotel/${hotel._id}`)}
        >
          <Link to="#" className="view-link">
            View Details
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Hotel;
