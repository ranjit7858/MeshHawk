import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import Protocol from "./components/Protocol";
import Scanning from "./components/Scanning";
import Login from "./components/Login";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser } from "./api";
import Protected from "./components/Protected";
import Logs from "./components/Logs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PolarGraph from "./components/PolarGraph";
import { useAtom } from "jotai";
import Report from "./components/Report";

const App = () => {
  const [shouldHideNavbar, setShouldHideNavbar] = useState(false);
  const location = useLocation();
  const hideNavbarPaths = ["/login"];
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");
  const getUserId = useMutation(async () => getUser(token), {
    onError: () => {
      setUserId(null)
    }
  });
  
  useEffect(() => {
    hideNavbarPaths.includes(location.pathname)
      ? setShouldHideNavbar(false)
      : setShouldHideNavbar(true);
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem("token") === null) return;
    getUserId.data && setUserId(getUserId.data.userid);
  }, [getUserId]);

  

  useEffect(() => {
    console.log("useEffect") 
    if(!userId){
      
      getUserId.mutate()
    }         
  },[]) 


  return (
    <div className="max-w-[90%]  h-screen block mx-auto relative ">
      {shouldHideNavbar && (
        <Navbar user={userId} userStatus={getUserId.status} />
      )}
      <Routes>
        <Route path="/" element={<Home user={userId} />} />

        <Route
          path="/map"
          element={
            // <Protected user={userId}>
              <Map />
            // </Protected>
          }
        />
        <Route
          path="/protocol"
          element={
            // <Protected user={userId}>
            <Protocol />
            // </Protected>
          }
        />
        <Route  
          path="/scan"
          element={
            // <Protected user={userId}>
            <Scanning />
            // </Protected>
          }
        />

        <Route path="/logs" element={<Logs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<Report/>}/>
        {/* <Route path="/polar" element={<PolarGraph/> }/> */}
      </Routes>
    
      <ToastContainer
        position="bottom-left"
        autoClose={4997}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
