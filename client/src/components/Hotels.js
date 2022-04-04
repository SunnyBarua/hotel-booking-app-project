
import React, { useEffect, useState } from "react";
import { allHotel } from "../actions/hotel";
import Hotel from "./Hotel";
import Search from "./Search";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    let res = await allHotel();
    setHotels(res.data);
  };

  return (
    <div className="conatiner">
      <section id="rooms" className="container rooms">
       <Search/>

        <div className="container-fluid">
          <div className="row mt-5">
            
              {hotels.map((hotel) => (
                <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <Hotel key={hotel._id} hotel={hotel} />
                </div>
              ))}
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hotels;
