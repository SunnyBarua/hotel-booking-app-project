import AlgoliaPlaces from "algolia-places-react";
import { DatePicker, Select } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createHotel } from "../actions/hotel";

const { Option } = Select;

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
};

const NewHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address,setAddress]=useState("")
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState();
  const [airConditioned, setAirConditioned] = useState("");
  const [petsAllowed,setPetsAllowed]=useState("")
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [bed, setBed] = useState();
  const [wifi,setWifi]=useState()
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("description", description);
    hotelData.append("location", location);
    hotelData.append("address",address)
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);
    hotelData.append("wifi",wifi)
    hotelData.append("airConditioned", airConditioned);
    hotelData.append("petsAllowed", petsAllowed);

    console.log(hotelData);
    try {
      let res = await createHotel(token, hotelData);
      console.log(res);
      toast.success("New Hotel is posted");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    console.log(preview);
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h3 style={{ color: "#fff" }}>Add Hotel</h3>
      </div>
      <div className="container add-hotel">
        <div className="row">
          <div className="col-md-10">
            <br />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="btn btn-outline-secondary btn-block m-2 text-left">
                  {" "}
                  Image
                  <input type="file" onChange={handleImageChange} hidden />
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="form-control m-2"
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="form-control m-2"
                />
                <AlgoliaPlaces
                  className="form-control ml-2 mr-2"
                  placeholder="Location"
                  defaultValue={location}
                  options={config}
                  onChange={({ suggestion }) => setLocation(suggestion.value)}
                  style={{ height: "50px" }}
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="form-control m-2"
                />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="form-control m-2"
                />
                {/* <input type="number" name="bed" value={bed} onChange={(e)=>setBed(e.target.value)}
                             placeholder="Bed" className="form-control m-2"/>  */}

                <Select
                  onChange={(value) => setBed(value)}
                  className="w-100 m-2"
                  size="large"
                  placeholder="Number of Beds"
                >
                  <Option key={1}>{1}</Option>
                  <Option key={2}>{2}</Option>
                  <Option key={3}>{3}</Option>
                  <Option key={4}>{4}</Option>
                  <Option key={5}>{5}</Option>
                </Select>
                <Select
                 className="w-100 m-2"
                 size="large"
                 placeholder="Wifi"

                 onChange={(value) => setWifi(value)}           
                >
                  <Option value="Yes">Available</Option>
                  <Option value="No">Not Available</Option>
                </Select>
                <Select
                 className="w-100 m-2"
                 size="large"
                 placeholder="Air Conditional"

                 onChange={(value) => setAirConditioned(value)}
                 
                >
                  <Option value="Yes">Air Condition </Option>
                  <Option value="No">No Air Condition</Option>
                </Select>
                <Select
                 className="w-100 m-2"
                 size="large"
                 placeholder="Pets Allowed"

                 onChange={(value) => setPetsAllowed(value)}           
                >
                  <Option value="Yes">Pets Allowed </Option>
                  <Option value="No">No Pets Allowed</Option>
                </Select>
                
              </div>
              <DatePicker
                placeholder="From date"
                className="form-control m-2"
                onChange={(date, dateString) => setFrom(dateString)}
                disabledDate={(current) =>
                  current && current.valueOf() < moment().subtract(1, "days")
                }
              />
              <DatePicker
                placeholder="To date"
                className="form-control m-2"
                onChange={(date, dateString) => setTo(date, dateString)}
                disabledDate={(current) =>
                  current && current.valueOf() < moment().subtract(1, "days")
                }
              />
              <button
                className="btn btn-online-prinary add-hotel-btn"  
              >
                Save
              </button>
            </form>
          </div>
          <div className="col-md-2">
            <img src={preview} alt="preview_image" className="img img-fluid" />
            <pre>{JSON.stringify(to, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
