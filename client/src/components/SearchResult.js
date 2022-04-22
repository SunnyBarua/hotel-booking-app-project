import queryString from "query-string"
import React, { useEffect, useState } from 'react'
import { searchListings } from "../actions/hotel"
import Hotel from "./Hotel"
import Search from "./Search"



const SearchResult = () => {

const [searchLocation,setSearchLocation]=useState("")
const [searchDate,setSearchDate]=useState("")
const [searchBed,setSearchBed]=useState("")
const [hotels,setHotels]=useState([])
useEffect(()=>{
    const {location,date,bed}=queryString.parse(window.location.search)
    console.table({location,date,bed})
    searchListings({location,date,bed}).then((res)=>{
        console.log("SEARCH RESULTS ===>",res.data)
        setHotels(res.data)
    })
},[window.location.search])

  return (
      <>
      <div className="col">
          <Search/>
          <br/>
      </div>
    <div className='container'>
        <div className='row'>
            {hotels.map((hotel)=>(
                <Hotel key={hotel._id} hotel={hotel}/>
            ))}
        </div>
    </div>
    </>
  )
}

export default SearchResult