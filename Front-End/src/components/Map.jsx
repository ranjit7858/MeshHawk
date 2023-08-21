import React, { Component, useEffect, useState } from "react";
import GenerateGraph from "./GenerateGraph";
import { AiOutlineFileText } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FileUpload, csvUpload, getScannedCsv, getScannedPcap } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { mapAtom, csvAtom, selectedCompAtom } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { map } from "highcharts";
import Loading from "./Loading";
import PolarGraph from "./PolarGraph"
import  ComponentGraph from "./ComponentGraph";

const Map = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Upload a pcap file");

  const [responseMessage, setResponseMessage] = useState(null);
  const [secresponseMessage, setsecResponseMessage] = useState(null);
  const [mapData, setMapData] = useAtom(mapAtom);
  const [csvData, setCsvData] = useAtom(csvAtom);
  const [selected, setSelected] = useAtom(selectedCompAtom);

  const [csvFile, setCsvFile] = useState(null);
  const [csvName, setCsvName] = useState("Upload a csv file");

  const bssidArray = [];
  const power = [];
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFilename(`${selectedFile.name}`);
      setFile(selectedFile);
    }
  };
  console.log("mapAtom", mapData);
  console.log("csvAtom", csvData);

  const handleCsvChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setCsvName(`${selectedFile.name}`);
      setCsvFile(selectedFile);
    }
  };

  const csvMutation = useMutation(csvUpload, {
    onSuccess: (data) => {
      setCsvData(data);
    },
  });

  const componentMutation = useMutation(FileUpload, {
    onSuccess: (data) => {
      setMapData(data);
      setResponseMessage(data.addresses);

      const componentsData = data.compenents;
      const keys = Object.keys(componentsData);
      const parsedComponentsArray = keys.map((key) => componentsData[key]);
      setsecResponseMessage(parsedComponentsArray);


      const lastElementsArray = [];

      for (const key in data.compenents) {
        const subArrays = data.compenents[key];
        const lastSubArray = subArrays[subArrays.length];
        if (lastSubArray) {
          const lastElement = lastSubArray[lastSubArray.length - 1];
          lastElementsArray.push(lastElement);
        }
      }
      
      console.log(lastElementsArray);

      if (csvFile) {
        csvMutation.mutate(csvFile);
      }
    },
  });

  const getPcapMutation = useMutation(getScannedPcap, {
    onSuccess: async (data) => {
      const pcapHeaders = data.headers;
      const responseBuffer = await data.arrayBuffer();
      const pcapBlob = new Blob([responseBuffer], {
        type: pcapHeaders.get("content-type"),
      });

      const pcapFile = new File([pcapBlob], `${pcapHeaders.get('last-modified')}`, {
        lastModified: new Date(pcapHeaders.get('last-modified')).getTime(),
        type: pcapHeaders.get('content-type'),
      });
      setFile(pcapFile);
    },
  });
  const getCvsMutation = useMutation(getScannedCsv, {
    onSuccess: async (data) => {
      if (data.status == 200) {
        const pcapHeaders = data.headers;
        const responseBuffer = await data.arrayBuffer();
        const pcapBlob = new Blob([responseBuffer], { type: pcapHeaders.get('content-type') });
        
        const csvFile = new File([pcapBlob], `${pcapHeaders.get('last-modified')}.csv` , {
          lastModified: new Date(pcapHeaders.get('last-modified')).getTime(),
          type: "text/csv",
        });
        setCsvFile(csvFile);
      }
    },
  });

  useEffect(() => {
    getPcapMutation.mutate();
    getCvsMutation.mutate();
  }, []);
  if (
    csvData &&
    csvData.first_section &&
    Array.isArray(csvData.first_section)
  ) {
    csvData.first_section.forEach((element, index) => {
      bssidArray.push(element.BSSID);
      power.push(element.Power);

      if (!isNaN(element.Power)) {
        power.push(element.Power);
      }
    });
  }
  console.log(csvFile)
  return (
    <div className="h-screen over">
      {responseMessage ? (
        <div className="flex flex-col  gap-7 z-1 h-screen  ">
          {/* <div className="absolute w-[900px] h-[600px] bg-black bottom-10 left-5 rounded-2xl "></div> */}
          <div className="flex gap-3">
            <div className=" mt-10 h-[80vh]">
              <GenerateGraph
                keyVar={`maingraph`}
                pcap={responseMessage}
                graphHeight={600}
                graphWidth={900}
                className={
                  "flex justify-center items-center bg-[#0F4C75] bg-opacity-20 border-2 border-[#323232]  rounded-2xl "
                }
              />
            </div>
            <div className="max-w-[100%] mt-10">
              <PolarGraph />
            </div>
          </div>
          <div className="mt-10 flex-row flex-wrap justify-center flex gap-4">
            {secresponseMessage.map((result, index) => (
              <div key={index} className={`relative rounded-xl`}>
                <ComponentGraph
                  keyVar={`component${index}`}
                  pcap={result}
                  graphHeight={250}
                  graphWidth={400}
                  className={
                    "flex justify-center items-center bg-[#0F4C75] bg-opacity-20  border-[#323232] rounded-t-2xl "
                  }
                />
                {csvData && (
                  <div className="flex justify-end bg-[#0F4C75] bg-opacity-20 rounded-b-2xl">
                    <button
                      className=" uppercase px-4 py-2 rounded-xl text-white bg-[#0F4C75] border border-gray-500 bg-opacity-20 rounded-b-2xl"
                      onClick={() => {
                        setSelected(result);
                        navigate("/protocol");
                      }}
                    >
                      More Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center  items-center text-[white] h-screen">
          <div className="w-[80%] px-[20%] py-[5%] flex flex-col justify-center items-center bg-[#161616] bg-opacity-80 rounded-2xl">
            <div className="w-[100%] gap-3 flex">
              <fieldset className=" flex border py-3 pr-4 pl-4 w-full">
                <legend className="text-[0.7rem]">Generated Pcap</legend>
                <div className=" w-full flex justify-between items-center">
                  <div className="flex gap-2 justify-center items-center">
                    <AiOutlineFileText size={20} />
                    {file && (
                      <span className=" text-blue-500 ">{file.name}</span>
                    )}
                  </div>
                  {/* <div>
                    <RxCross1 />
                  </div> */}
                </div>
              </fieldset>
              <fieldset className=" flex border py-3 pr-4 pl-4 w-full">
                <legend className="text-[0.7rem]">Generated CSV</legend>
                <div className=" w-full flex justify-between items-center">
                  <div className="flex gap-2 justify-center items-center">
                    <AiOutlineFileText size={20} />
                    {csvFile && (
                      <span className=" text-blue-500 ">{csvFile.name}</span>
                    )}
                  </div>
                  {/* <div>
                    <RxCross1 />
                  </div> */}
                </div>
              </fieldset>
            </div>
            <div className="mt-5 opacity-20">-----OR-----</div>
            <div className="mt-5 w-[100%]">
              <div className="w-full  flex gap-2 flex-col">
                <fieldset className="flex border py-2 pr-2 pl-3 b">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex justify-center items-center">
                      <span>{filename}</span>
                    </div>
                    <div>
                      <label className=" flex flex-col items-center px-6 py-2 rounded bg-[#2E59BF]   cursor-pointer">
                        <span className="text-base leading-normal">Upload</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="flex border py-2 pr-2 pl-3 b">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex justify-center items-center">
                      <span>{csvName}</span>
                      <span className="text-gray-500 text-xs">(optional)</span>
                    </div>
                    <div>
                      <label className=" flex flex-col items-center px-6 py-2 rounded bg-[#2E59BF]   cursor-pointer">
                        <span className="text-base leading-normal">Upload</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleCsvChange}
                          required={true}
                        />
                      </label>
                    </div>
                  </div>
                </fieldset>
                <h4 className=" text-green-400 text-xs ">
                  Note - uploading csv component will give you better results
                </h4>
              </div>
            </div>
            <div>
              <button
                className="mt-5 uppercase px-4 py-2 text-black bg-white"
                onClick={() => {
                  if (!file) toast.error("Please upload a pcap file");
                  componentMutation.mutate(file);
                }}
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      )}

      {componentMutation.isLoading || csvMutation.isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-dotted-spacing-10 bg-dotted-gray-700 ">
          <Loading />
        </div>
      ) : null}
    </div>
  );
};

export default Map;
