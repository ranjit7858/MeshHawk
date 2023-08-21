import "../App.css";
import Kavach from "../assets/kavach.png";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function Navbar({ user , userStatus }) {

  return (
    <nav className="py-5 flex justify-between h-[10%] items-center  w-full z-50">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold flex items-center logo">
          <img src={Kavach} alt="" className="w-[15%]" />
          MeshHawk
        </Link>
      </div>
      <div className="">
        <ul className="flex gap-7 text-lg font-extralight opacity-80 ">
          <li>Home</li>
          <li>About</li>
          <li>How it works?</li>
        </ul>
      </div>
      {user ? (
        <div className="flex bg-slate-800 pl-3 pr-1 py-1 rounded-full items-center gap-2">
          {user}{" "}
          <button
            className="px-3 bg-black rounded-full h-full"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload(); // Corrected "location.reload();" to "window.location.reload();"
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        localStorage.getItem("token") && userStatus === "loading" ? <Loading className={"w-8"} /> : (
          <Link to="/login">
            <button className="px-6 py-3 border  bg-black  h-full">Login</button>
          </Link>
        )
      )}
    </nav>
  );
  
}

export default Navbar;
