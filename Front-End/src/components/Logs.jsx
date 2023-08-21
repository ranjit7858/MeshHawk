import React from "react";

import { RxCross1 } from "react-icons/rx";
const Logs = () => {
  return (
    <div className="flex gap-10 h-[100vh] justify-center  w-full items-center">
      <div className="w-[60%] h-[40%] flex flex-col border-2 bg-[#121211]  rounded-lg mt-20 ">
        <div className="flex items-center justify-between">
          <div className="text-[1.5rem] pl-4  items-center py-2">
            Confirmation Dialog --
          </div>
          <div className="pr-2">
            <RxCross1 size={30} />
          </div>
        </div>
        <hr className=" " />
        <div className="flex flex-col justify-center items-center mt-10">
          <div>
            The scan is Completed!!
          </div>
          <div className="mt-1">
            A .pcap file has been downloaded and Updated -- you can analyze it in the next step.
          </div>
          <div className="mt-8">
            happy hacking  	&gt;&gt;&gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
