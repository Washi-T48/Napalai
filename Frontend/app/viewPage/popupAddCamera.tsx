import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Port from "../port";

interface setPopup {
  setOpenPopup: (option: boolean) => void;
}

interface Zone {
  id: string;
  name: string;
  location: string;
}

const AddCamera: React.FC<setPopup> = ({ setOpenPopup }) => {
  const [createZone, setCreateZones] = useState("");
  const [locationZone, setLocationZone] = useState("");
  const [zones, setZones] = useState<Zone[]>([]);
  const [zoneName, setZoneName] = useState<string>("");
  const [zoneId, setZoneId] = useState<string>("");
  const [cameraName, setCameraName] = useState("");
  const [location, setLocation] = useState("");
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [path, setPath] = useState("");
  const [onvifUsername, setOnvifUsername] = useState("");
  const [onvifPassword, setOnvifPassword] = useState("");
  const [rtspUrl, setRtspUrl] = useState("");
  const [rtspUsername, setRtspUsername] = useState("");
  const [rtspPassword, setRtspPassword] = useState("");
  const [showCreateZone, setShowCreateZone] = useState(false);
  const [view, setView] = useState<'addCamera' | 'createZones'>('addCamera');

  useEffect(() => {
    const getZones = async () => {
      try {
        const getZone = await fetch(`${Port.URL}/zones`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!getZone.ok) {
          const errorData = await getZone.json();
          throw new Error(errorData.message || "Network response was not ok");
        }

        const getDataZone = await getZone.json();
        setZones(getDataZone);
        console.log("Fetched zones:", getDataZone);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    getZones();
  }, []);

  const postCreateZone = async () => {
    try {
      const postZone = await fetch(`${Port.URL}/zones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: createZone,
          location: locationZone,
        }),
      });

      if (!postZone.ok) {
        const errorData = await postZone.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const postDataZone = await postZone.json();
      setCreateZones(postDataZone);



      console.log("Created zone:", postDataZone);
    } catch (error) {
      console.error("Error posting zone:", error);
    }
  };

  const postCamera = async () => {
    try {
      const postCamera = await fetch(`${Port.URL}/cameras`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cameraName,
          location: location,
          zone_id: zoneId,
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

      const postDataCamera = await postCamera.json();
      console.log("Fetched camera data:", postDataCamera);
    } catch (error) {
      console.error("Error posting camera data:", error);
    }
  };
  const isFormValid = () => {
    return (
      cameraName !== "" &&
      location !== "" &&
      ip !== "" &&
      port !== "" &&
      path !== "" &&
      onvifUsername !== "" &&
      onvifPassword !== "" &&
      rtspUrl !== "" &&
      rtspUsername !== "" &&
      rtspPassword !== "" 
     
    );
  };

  const isFormValidZones = () => {
    return (
      createZone !== "" &&
      location !== "" 
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="w-[550px] h-auto bg-customBlue p-8 shadow-lg rounded-2xl">

        <div className="flex justify-between pb-2">
          <div className="pb-2 text-2xl font-bold">
            <div className="flex">
              <button
                className={`flex justify-center items-center w-20 p-2 rounded-l-md text-sm bg-customButton transition-all duration-300 ${view === 'addCamera' ? 'bg-customฺButtomHover' : 'bg-customฺButton'}`}
                onClick={() => setView('addCamera')}>
                {/* <Icon icon="noto-v1:camera" width="20" height="20" /> */}
                Camera
              </button>
              <button
                className={`flex justify-center items-center w-20 p-2 rounded-r-md text-sm bg-customButton ${view === 'createZones' ? 'bg-customฺButtomHover' : 'bg-customฺButton'}`}
                onClick={() => setView('createZones')}>
                {/* <Icon icon="cbi:zones-areas-first-floor" width="20" height="20" /> */}
                Zone
              </button>
            </div>
          </div>


        
        </div>



        {view === 'addCamera' ? (

          <div className="flex flex-col gap-2 h-auto ">
            <div className="text-2xl font-bold py-3">
              Add camera
            </div>
            <div className="flex justify-between items-center">
              <div>Zone</div>
              <select
                onChange={(e) => {
                  const selectedZone = zones.find(zone => zone.name === e.target.value);
                  setZoneName(e.target.value);
                  setZoneId(selectedZone ? selectedZone.id : "");
                  setShowCreateZone(e.target.value === "Create Name");
                }}
                value={zoneName}
                className="custom-input px-3 h-8 text-sm"
              >
                <option
                className="px-2 mt-4"
                value="">Select a zone</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.name}>
                    {zone.name}
                  </option>
                ))}
                <option 
                className="my-2"
                value="Create Name">Create Zone</option>
              </select>
            </div>

            {showCreateZone && (
              <div className="flex flex-col gap-2 p-4 bg-customDarkSlateBlue rounded-md">
                <div className="flex justify-between items-center">
                  <div>Zone Name</div>
                  <input
                    onChange={(e) => { setCreateZones(e.target.value) }}
                    value={createZone}
                    type="text"
                    placeholder="Enter your create zone name"
                    className="custom-input px-3 h-8 text-sm"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>Location Zone</div>
                  <input
                    onChange={(e) => { setLocationZone(e.target.value) }}
                    value={locationZone}
                    type="text"
                    placeholder="Enter your location"
                    className="custom-input px-3 h-8 text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      postCreateZone();
                      setShowCreateZone(false);
                    }}
                    className="btn btn-outline"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}

            {/* Camera input fields */}
            <div className="flex justify-between items-center ">
              <div>Camera Name</div>
              <input
                onChange={(e) => { setCameraName(e.target.value) }}
                placeholder="Enter your camera name..."
                value={cameraName}
                type="text"
                className="custom-input px-3 h-8 text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Location</div>
              <input
                onChange={(e) => { setLocation(e.target.value) }}
                placeholder="Enter your Location..."
                value={location}
                className="custom-input px-3 h-8 text-sm"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>IP</div>
              <input
                onChange={(e) => { setIp(e.target.value) }}
                placeholder="Enter your IP..."
                value={ip}
                type="text"
                className="custom-input px-3 h-8 text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Port</div>
              <input
                onChange={(e) => { setPort(e.target.value) }}
                placeholder="Enter your Port..."
                value={port}
                type="url"
                className="custom-input px-3 h-8 text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Path</div>
              <input
                onChange={(e) => { setPath(e.target.value) }}
                placeholder="Enter your Path..."
                value={path}
                type="url"
                className="custom-input px-3 h-8 text-sm"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>ONVIF Username</div>
              <input
                onChange={(e) => { setOnvifUsername(e.target.value) }}
                placeholder="Enter your Username..."
                value={onvifUsername}
                type="text"
                className="custom-input px-3 h-8 text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>ONVIF Password</div>
              <input
                onChange={(e) => { setOnvifPassword(e.target.value) }}
                placeholder="Enter your Password..."
                value={onvifPassword}
                type="password"
                className="custom-input px-3 h-8 text-sm"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>RTSP URL</div>
              <input
                onChange={(e) => { setRtspUrl(e.target.value) }}
                placeholder="Enter your URL..."
                value={rtspUrl}
                type="text"
                className="custom-input px-3 h-8 text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>RTSP Username</div>
              <input
                onChange={(e) => { setRtspUsername(e.target.value) }}
                placeholder="Enter your RTSP Username..."
                value={rtspUsername}
                type="text"
                className="custom-input px-3 h-8 text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>RTSP Password</div>
              <input
                onChange={(e) => { setRtspPassword(e.target.value) }}
                placeholder="Enter your RTSP Password..."
                value={rtspPassword}
                type="password"
                className="custom-input px-3 h-8 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button 
              onClick={() => setOpenPopup(false)}
              className="btn btn-cancle">
                close
              </button>
              <button
                onClick={postCamera}
                className={`btn btn-outline px-3 ${
                  !isFormValid() ? "cursor-not-allowed" : "bg-customButton hover-none"
                }`}
                disabled={!isFormValid()}
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-auto gap-2 transition-all duration-300 ">
            <div className="text-2xl font-bold py-3">
              Create Zone
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="flex justify-between items-center">
                <div>Zone Name</div>
                <input
                  onChange={(e) => { setCreateZones(e.target.value) }}
                  placeholder="Enter your Zone Name..."
                  value={createZone}
                  type="text"
                  className="custom-input px-3 h-8 text-sm"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>Location Zone</div>
                <input
                  onChange={(e) => { setLocationZone(e.target.value) }}
                  placeholder="Enter your Location Zone..."
                  value={locationZone}
                  type="text"
                  className="custom-input px-3 h-8 text-sm"
                />
              </div>
              <div className="flex justify-end pt-3 gap-2">
              <button 
              onClick={() => setOpenPopup(false)}
              className="btn btn-cancle">
                close
              </button>
                <button
                  onClick={() => {
                    postCreateZone();
                    setShowCreateZone(false);
                  }}
                  className={`btn btn-outline px-3 ${!isFormValidZones() ? "cursor-not-allowed" : "bg-customButton"}`}

                 
                  disabled={!isFormValidZones()}
                >
                  Create
                </button>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCamera;
