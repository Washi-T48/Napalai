import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Port from "../port";
interface setPopup {
  setOpenPopup: (option: boolean) => void;
}

const AddCamera:React.FC<setPopup> = ({ setOpenPopup }) => {
  const [zoneName, setZoneName] = useState("")
  const [location , setLocation] = useState("")
  const [ip , setIp] = useState("")
  const [port , setPort] = useState("")
  const [path , setPath] = useState("")
  const [onvifUsername , setuOnvifUername] = useState("")
  const [onvifPassword , setOnvifPassword] = useState("")
  const [rtspUrl , setRtspUrl] = useState("")
  const [rtspUsername , setRtspUsername] = useState("")
  const [rtspPassword , setRtspPassword] = useState("")


    const postCamera = async () => {
      try {
        const postCamera = await fetch(`${Port.URL}/cameras`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // id: "9",
            // zone_id: "2",
            name: zoneName,
            location: location,
            onvif_ip: ip,
            onvif_port: port,
            onvif_path: path,
            onvif_username: onvifUsername,
            onvif_password: onvifPassword,
            rtsp_url: rtspUrl,
            rtsp_username: rtspUsername,
            rtsp_password: rtspPassword,
          }),
        });
  
        if (!postCamera.ok) {
          const errorData = await postCamera.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
  
        const data = await postCamera.json();
        console.log("Fetched camera data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
  return (
    

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[550px] h-auto bg-customBlue p-8 shadow-lg rounded-2xl">
        <div className="flex justify-between pb-2">
          <div className="pb-2 text-2xl font-bold">Add ONVIF Camera</div>
          <div>
          <Icon
            onClick={() => setOpenPopup(false)}
            icon="icon-park-solid:close-one"
            width="30"
            height="30"
          />
        </div>
        </div>
        
        
        <div className="bg-customwhite w-auto h-32 text-black p-2 rounded-sm">
          Something...
        </div>
        <div className="flex flex-col gap-2 pt-8">
          <div className="flex justify-between items-center">
            <div>Zone Name</div>
            <input 
            onChange={(e) => {setZoneName(e.target.value)}}
            value={zoneName}
            type="text" 
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center">
            <div>Location</div>
            <input 
            onChange={(e) => {setLocation(e.target.value)}}
            value={location}
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center">
            <div>ip</div>
            <input 
            onChange={(e) => {setIp(e.target.value)}}
            value={ip}
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center ">
            <div>Port</div>
            <input 
            onChange={(e) => {setPort(e.target.value)}}
            value={port}
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center">
            <div>path</div>
            <input 
            onChange={(e) => {setPath(e.target.value)}}
            value={path}
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center">
            <div>Onvif Uername</div>
            <input 
            onChange={(e) => {setuOnvifUername(e.target.value)}}
            value={onvifUsername}
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center">
            <div>Onvif password</div>
            <input 
            onChange={(e) => {setOnvifPassword(e.target.value)}}
            value={onvifPassword}
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center">
            <div>rtspUrl</div>
            <input 
            onChange={(e) => {setRtspUrl(e.target.value)}}
            value={rtspUrl}
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center">
            <div>rtspUsername</div>
            <input 
            onChange={(e) => {setRtspUsername(e.target.value)}}
            value={rtspUsername}
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center">
            <div>rtspPassword</div>
            <input 
            onChange={(e) => {setRtspPassword(e.target.value)}}
            value={rtspPassword}
            className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button 
          onClick={postCamera}
          className="flex justify-center items-center w-28 bg-customฺButton p-2 rounded-md hover:bg-customฺButtomHover">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCamera;
