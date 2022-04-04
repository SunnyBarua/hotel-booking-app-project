import React from "react";
import { useSelector } from "react-redux";
import HeroSection from "../components/HeroSection";
import Hotels from "../components/Hotels";


const Home = () => {
  const state=useSelector((state)=>state)
  console.log(state)
  return (
    <>
      <HeroSection/>
      <Hotels/>
    </>
  );
};

export default Home;
