import React, { useState } from "react";
import logo from "../assets/hero.png";
import homeimg from "../assets/Mask1.png";
import { useNavigate, Link } from "react-router-dom";
import { useAtom } from "jotai";
import { mapAtom } from "../store";
import { scanNetwork } from "../api";
import { useMutation } from "@tanstack/react-query";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { BsArrowUpRight } from "react-icons/bs";

function Home({ user }) {
  const [mapData, setMapData] = useAtom(mapAtom);
  const [showTest, setShowTest] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [customValue, setCustomValue] = useState(null);

  const navigate = useNavigate();
  const scanMutation = useMutation(scanNetwork, {
    onSuccess: async () => {
      if (customValue) {
        await new Promise((r) => setTimeout(r, (customValue + 5) * 1000));
        navigate("/map");
      } else {
        await new Promise((r) => setTimeout(r, (selectedValue + 5) * 1000));
        navigate("/map");
      }
    },
  });

  const scan = () => {
    setShowTest((prevShowTest) => !prevShowTest);
  };

  const handleScan = () => {
    if (!selectedValue && !customValue) {
      toast.error("please select duration");
      return;
    }
    if (customValue) {
      scanMutation.mutate(customValue);
      return;
    }
    scanMutation.mutate(selectedValue);
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full gap-5 ">
        <div className=" text-7xl inline mt-[10%] flex-col ml-[10%] uppercase">
          unveiling THE <br /> hidden{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-white">
            NETWORKS
          </span>
        </div>
        {/* <button onClick={() => scanNetwork(8)}>scan</button> */}

        <div className="ml-[10%]  bg-black w-fit">
          Mesh Hawk is one tap solution which detects concealed mesh networks
          <br />- reshaping cyber security for the better!!
          {user && (
            <div className="flex flex-col absolute bg-black rounded-lg ">
              <div className="flex gap-5 ml-5 mt-7 w-fit pl-2 pr-2 py-2 bg-[#2D2D2D] rounded">
                <button
                  className="border py-1 px-6 bg-white text-black rounded"
                  onClick={scan}
                >
                  Get Started
                </button>
                <button className="py-1 px-6  rounded">Learn More</button>
              </div>
              {user && (
                <div
                  className={`bg-black px-6 py-4 rounded-lg transition-all test  ${
                    showTest ? "" : "hidden"
                  }`}
                >
                  <div className="mt-4 font-bold text-gray-400 mb-3">
                    Scan ( in seconds -){" "}
                  </div>
                  {customValue === null ? (
                    <ul className="items-center  w-full text-sm font-medium rounded sm:flex text-white mt-1 gap-2">
                      <li
                        className={`w-full    transition-all duration-75 ease-in-out rounded-lg  px-3 py-2 font-bold border-blue-500 border-[1px] ${
                          selectedValue === 15
                            ? "text-white bg-blue-700 "
                            : "  bg-blue-500/20 text-blue-700   hover:bg-blue-700 hover:text-white"
                        }`}
                        onClick={() => setSelectedValue(15)}
                      >
                        <div className="flex items-center cursor-pointer">
                          <input
                            id="radio-15s"
                            type="radio"
                            value={15}
                            name="list-radio"
                            className="w-4 h-4 hidden "
                          />
                          <label
                            htmlFor="radio-15s"
                            className=" px-10 cursor-pointer"
                          >
                            15s
                          </label>
                        </div>
                      </li>

                      <li
                        className={`w-full    transition-all duration-75 ease-in-out rounded-lg  px-3 py-2 font-bold border-purple-500 border-[1px] ${
                          selectedValue === 30
                            ? "text-white bg-purple-700 "
                            : "  bg-purple-500/20 text-purple-700   hover:bg-purple-700 hover:text-white font-"
                        }`}
                        onClick={() => setSelectedValue(30)}
                      >
                        <div className="flex items-center cursor-pointer">
                          <input
                            id="radio-30s"
                            type="radio"
                            value={30}
                            name="list-radio"
                            className="w-4 h-4 hidden"
                            // onChange={handleRadioChange}
                          />
                          <label
                            htmlFor="radio-30s"
                            className=" px-10  cursor-pointer  "
                          >
                            30s
                          </label>
                        </div>
                      </li>

                      <li
                        className={`w-full    transition-all duration-75 ease-in-out rounded-lg  px-3 py-2 font-bold border-teal-500 border-[1px] ${
                          selectedValue === 45
                            ? "text-white bg-teal-700 "
                            : "  bg-teal-500/20 text-blue-700-600   hover:bg-teal-800 hover:text-white"
                        }`}
                        onChange={() => setSelectedValue(45)}
                      >
                        <div className="flex items-center cursor-pointer">
                          <input
                            id="radio-60s"
                            type="radio"
                            value={45}
                            name="list-radio"
                            className="w-4 h-4 hidden"
                          />
                          <label
                            htmlFor="radio-60s"
                            className=" px-10 cursor-pointer"
                          >
                            45s
                          </label>
                        </div>
                      </li>
                      <li
                        className={`w-full    transition-all duration-75 ease-in-out rounded-lg   py-2 font-bold border-gray-500 border-[1px] ${
                          selectedValue === 45
                            ? "text-white bg-gray-700 "
                            : "  bg-gray-500/20 text-gray-700-600   hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <button
                          className="flex items-center cursor-pointer px-10"
                          onClick={() => {
                            setCustomValue(15);
                          }}
                        >
                          Custom
                        </button>
                      </li>

                      <li
                        className={`w-full border-b sm:border-b-0 py-3  px- ${
                          selectedValue === "scan" ? "selected" : ""
                        }`}
                      ></li>
                    </ul>
                  ) : (
                    <div className="flex justify-center gap-3 ">
                      <input
                        type="number"
                        className={`w-full  px-5  transition-all duration-75 ease-in-out rounded-lg   py-2 font-bold border-gray-500 border-[1px] 
                          bg-gray-500/20 text-gray-700-600   hover:bg-gray-800 hover:text-white appearance-none
                    }`}
                        value={customValue}
                        onChange={(e) => setCustomValue(parseInt(e.target.value))}
                      />
                      <button
                        onClick={() => {
                          setCustomValue(null);
                          setSelectedValue(15);
                        }}
                        className="flex justify-center items-center text-3xl rotate-45 text-gray-400 hover:text-white "
                      >
                        +
                      </button>
                    </div>
                  )}
                  <div className="flex items-center mt-4">
                    {scanMutation.isLoading ? (
                      <Loading />
                    ) : (
                      <button
                        className="py-2  bg-secondary rounded-xl  font-bold px-40  w-full "
                        onClick={handleScan}
                      >
                        Scan
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="h-[60%] ">
          <img
            src={homeimg}
            alt=""
            className=" bg-black  mt-20 w-full rounded-2xl object-cover h-[90%]"
          />
        </div>

        <div className="flex items-center  mt-36">
          <div class="w-[197px] h-[53px] px-8 py-4 bg-white bg-opacity-10 rounded justify-center items-center gap-2.5 inline-flex ">
            <div class="text-white text-xl font-normal uppercase leading-tight">
              About Us
            </div>
          </div>
        </div>
        <div className=" text-7xl inline flex-col uppercase mt-3">
          What is
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900  to-blue-700 ">
            MeshHawk?
          </span>
        </div>
        <div className="w-[70%] text-xl opacity-70">
          We're sincerely grateful that you've made MeshHawk your choice for
          enhancing your services. To ensure that your experience is as smooth
          as possible, we've taken the time to simplify every step of the
          process – from the initial scan to the final analysis. Rest assured,
          we're here to make this journey user-friendly for everyone involved.
          <br />
          <br />
          For an in-depth understanding of how to harness the full capabilities
          of MeshHawk, we encourage you to dive into our dedicated document.
          There, you'll uncover a wealth of valuable insights and practical tips
          that will empower you to fully unleash MeshHawk's potential. The
          document serves as your go-to resource for navigating this innovative
          tool with confidence.
        </div>

        <div className="flex items-center mt-16 ">
          <div class="w-[197px] h-[53px] px-8 py-4 bg-white bg-opacity-10 rounded justify-center items-center gap-2.5 inline-flex ">
            <div class="text-white text-xl font-normal uppercase leading-tight">
              How to use
            </div>
          </div>
        </div>
        <div className=" text-7xl inline flex-col uppercase mt-3">
          go-to Steps to
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900  to-blue-700 ">
            follow
          </span>
        </div>
        <div className="w-[70%] text-xl opacity-70">
          We are grateful you decided to use MeshHawk for your services. To make
          the experience seem less we have simplified every step, from scanning
          to analysis, ensuring a smooth experience for everyone. Dive into our
          dedicated document to uncover valuable insights and handy tips,
          helping you unleash the full potential of MeshHawk.
          <br />
          <br />
          Here is a stepwise guide to help you use MeshHawk - you can use the
          document or refer to the flow below.
        </div>
        <div className="w-full flex justify-center items-center mt-44 relative mb-32">
          <div className="w-[60%] text-6xl text-center">
            GET to know more about us. our lazy team. and our amazing mentor
          </div>
          <div className="absolute bottom-[-70px] bg-secondary/90 flex justify-center items-center aspect-square w-20 rounded-full  left-50  text-4xl">
            <BsArrowUpRight />
          </div>
        </div>

        <div className="flex justify-center  w-full mt-20">
          <Link
            to="/"
            className="text-xl font-bold flex items-center logo translate-x-5  "
          >
            <img src="./kavach.png  " alt="" className="w-[15%]" />
            MeshHawk
          </Link>
        </div>
        <div className="w-3/4 border-t-[1px] mx-auto"></div>
        <div className="flex  items-center justify-center py-8 ">
          Made with love by &nbsp;
          <span className="font-bold text"> Hash Society &nbsp;💛 </span>{" "}
        </div>
        {/* <div className="flex flex-row gap-4">
            {user ? (
              <button
                href="/map"
                className="text-xl font-semibold my-5 ml-1 px-3 rounded-3xl bg-yellow-200 text-black group/demo cursor-pointer "
                onClick={handleClick}
              >
                Automated Scan{" "}
                <span className="pl-2 text-2xl group-hover/demo:pl-5 transition-all duration-300 ease-in-out ">
                  &rarr;{" "}
                </span>
              </button>
            ) : (
              <Link to="/login" className="text-xl font-semibold my-5 ml-1 px-3 rounded-3xl bg-primary group/demo cursor-pointer ">
                Login &rarr;{" "}
              </Link>
            )}
          </div> */}
      </div>
    </>
  );
}

export default Home;
