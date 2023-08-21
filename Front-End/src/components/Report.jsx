import React from "react";
import { mapAtom, csvAtom, selectedCompAtom } from "../store";
import { useAtom } from "jotai";
import ComponentGraph from "./ComponentGraph";
const Report = () => {
  const [generatedResponses, setGeneratedResponses] = useState([]);
  const [mapData, setMapData] = useAtom(mapAtom);
  const [csvData, setCsvData] = useAtom(csvAtom);
  const [selected, setSelected] = useAtom(selectedCompAtom);
  const dataArray = Object.values(csvData.first_section);
  const selectedBSSID =
    selected.component_edges[
      selected.component_edges.length - 1
    ][0].toUpperCase();
  console.log("selected", selected);

  const handlePrint = () => {
    window.print();
  };

  // Function to generate random responses
  const generateRandomResponses = () => {
    const protocols = ["UDP", "TCP", "ICMP", "BATADV", "DNS"];
    const shuffledProtocols = [...protocols].sort(() => 0.5 - Math.random());
    const responses = shuffledProtocols.slice(0, 3);
    setGeneratedResponses(responses);
  };

  useEffect(() => {
    generateRandomResponses();
  }, []); // Generate responses on component mount

  return (
    <div className=" w-full h-screen aspect-[9/16] ">
      <div className=" flex justify-center text-4xl">Report</div>
      <hr className="mt-3" />
      <div>
        <div className="flex flex-1 gap-10 rounded-2xl">
          <div className=" w-full">
            <div className="text-4xl my-3">Detected Component</div>
            <div className="min-h-[65%]  bg-secondary/10 rounded-2xl">
              {" "}
              <ComponentGraph pcap={selected} />{" "}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="text-3xl my-3">Mac Addresses of Graph</div>
            <div className="flex flex-row flex-wrap gap-8 rounded-2xl px-3 w-full mt-5">
              {Object.entries(selected.mac_address).map(
                ([key, value], innerIndex) => (
                  <div key={innerIndex} className="">
                    {value !== null && (
                      <>
                        <p>
                          <b className="bg-white/10 p-4 rounded-xl">{value}</b>
                        </p>
                      </>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-3xl">Parameters</div>
        <hr />
        <div class="flex flex-col justify-center">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-center text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-6 py-2">
                        Parameters
                      </th>
                      <th scope="col" class="px-6 py-2">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-2 font-bold">
                        Density
                      </td>
                      <td class="whitespace-nowrap px-6 py-2">
                        {parseFloat(selected.density.toFixed(3))}
                      </td>
                    </tr>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-2 font-bold">
                        Distance
                      </td>
                      <td class="whitespace-nowrap px-6 py-2">
                        {parseFloat(selected.diameter.toFixed(3))}
                      </td>
                    </tr>
                    {dataArray.map((data, index) => {
                      if (data.BSSID === selectedBSSID) {
                        return (
                          <>
                            {Object.entries(data).map(([key, value]) => {
                              if (!["BSSID", "ESSID"].includes(key)) {
                                return (
                                  <tr
                                    key={key}
                                    className="border-b dark:border-neutral-500"
                                  >
                                    <td className="px-6 py-2 font-bold">
                                      {key}:
                                    </td>
                                    <td className="px-6 py-2">
                                      <span>{value}</span>
                                    </td>
                                  </tr>
                                );
                              }
                              return null;
                            })}
                          </>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="text-3xl">Generated Responses</div>
        <ul className="list-disc pl-6">
          {generatedResponses.map((response, index) => (
            <li key={index}>{response}</li>
          ))}
        </ul>
      </div>
      <div className="mt-10 flex justify-center ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrint}
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default Report;
