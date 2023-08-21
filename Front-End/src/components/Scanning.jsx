import React from "react";
import Navbar from "./Navbar";
import logo from "../assets/logo-bg.png"
const Scanning = () => {
  return (
    <div className="h-screen">
      <img src={logo} alt="" className="absolute top-0 right-0 w-[50%] overflow-hidden"/>
      <div className="flex flex-col justify-center h-[50vh]">
        <div>
          <div className="text-5xl font-semibold tracking-wider courier-font">
            One-stop solution for <br />
            <span className="text-primary">mesh</span> detection!!
          </div>
          <div className="flex gap-5 mt-5 courier-font">
            <button className="scan-button">Get Started</button>
            <button className="scan-button">Learn More</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 ">
        <div className="text-2xl font-semibold courier-font">Enter Estimate scan time:</div>
        <div className="flex flex-row gap-6 items-end">
          <div className=" bg-content-bg py-5 px-6 border-b-2  rounded-xl text-3xl courier-font">35</div>
          <div>Hours</div>
          <div className="  bg-content-bg py-5 px-6 border-b-2  rounded-xl text-3xl courier-font">35</div>
          <div>mins</div>
          <div className="  bg-content-bg py-5 px-6 border-b-2  rounded-xl text-3xl courier-font">35</div>
          <div>Seconds</div>
        </div>
        <div>
        <button className="py-[5px] px-[20px] border-1 bg-[#A5C1FF] rounded-2xl text-[black] courier-font">Scan!</button>
      </div>
      </div>
      
    </div>
  );
};

export default Scanning;
