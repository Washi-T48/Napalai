import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import EditLayout from "../component/editlayout"

function Sidebar() {
    const [ShowCameraZone, setShowCameraZone] = useState(false);

    const toggleCameraZone = () => setShowCameraZone(!ShowCameraZone);

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Camera Zone */}
            <div className="w-64 h-screen bg-customBlue text-white flex flex-col">
                <h2 className="text-xl font-bold mb-10">Sidebar</h2>

                <div className="flex-1">
                    {/* Toggle Camera Zone */}
                    <div className="flex justify-start items-center hover:bg-customSlateBlue px-8 h-16">
                        <div
                            onClick={toggleCameraZone}
                            className="flex justify-start items-center cursor-pointer border-b border-customSlateBlue w-full h-16"
                        >
                            <Icon className="p-2" icon="material-symbols:activity-zone" width="40" height="40" />
                            Zone2
                        </div>
                    </div>

                    {/* Camera Zone List */}
                    {ShowCameraZone && (
                        <div>
                            <div className="hover:bg-customSlateBlue px-8 h-16 flex justify-center items-center cursor-pointer">
                                <div className="flex justify-center border-b border-customSlateBlue w-full h-16">
                                    <div className="flex justify-start items-center text-sm">
                                        <Icon className="p-2" icon="mdi:cctv" width="40" height="40" />
                                        Camera Zone 1
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Icon className="pl-6" icon="ph:dots-three" width="40" height="40" />
                                    </div>
                                </div>
                            </div>
                            <div className="hover:bg-customSlateBlue px-8 h-16 flex justify-center items-center cursor-pointer">
                                <div className="flex justify-center border-b border-customSlateBlue w-full h-16">
                                    <div className="flex justify-start items-center text-sm">
                                        <Icon className="p-2" icon="mdi:cctv" width="40" height="40" />
                                        Camera Zone 2
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Icon className="pl-6" icon="ph:dots-three" width="40" height="40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    )}
                </div>
                <div className="mt-auto">
                    <EditLayout/>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
