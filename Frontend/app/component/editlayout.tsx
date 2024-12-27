import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function EditLayout() {
    const [LayoutActive, setLayoutActive] = useState(false);
    const [AddPopupActive, setAddPopupActive] = useState(false);
    const [EditCamera, setEditCamera] = useState(false);

    const toggleLayout = () => setLayoutActive(!LayoutActive);
    const toggleAddPopup = () => setAddPopupActive(!AddPopupActive);
    const toggleEditCamera = () => setEditCamera(!EditCamera);
    const closePopup = () => {
        setAddPopupActive(false);
        setEditCamera(false);
    };

    return (
        <div>
            {/* Layout */}
            {LayoutActive && (
                <div className="flex justify-end pr-5">
                    <div className="flex justify-center bg-customSlateBlue bg-opacity-30 rounded-md">
                        <div className="flex justify-center items-center p-2 hover:bg-customSlateBlue hover:rounded-md">
                            <Icon icon="material-symbols-light:grid-on" width="24" height="24" />
                        </div>
                        <div className="flex justify-center items-center p-2 hover:bg-customSlateBlue hover:rounded-md">
                            <Icon icon="mingcute:layout-8-fill" width="24" height="24" />
                        </div>
                        <div className="flex justify-center items-center p-2 hover:bg-customSlateBlue hover:rounded-md">
                            <Icon icon="flowbite:grid-solid" width="24" height="24" />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end p-2 w-full">
                <div>
                    <button
                        onClick={toggleAddPopup}
                        className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
                    >
                        <Icon icon="gg:add" width="24" height="24" />
                    </button>

                    {/* Add Camera Popup */}
                    {AddPopupActive && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="w-[550px] h-auto bg-customBlue p-8 shadow-lg rounded-2xl">
                                <div className="flex justify-end w-full cursor-pointer">
                                    <Icon onClick={closePopup} icon="icon-park-solid:close-one" width="30" height="30" />
                                </div>
                                <h1 className="pb-2 text-2xl font-bold">Add ONVIF Camera</h1>
                                <div className="bg-customwhite w-auto h-32 text-black p-2 rounded-sm">Something</div>
                                <div className="pt-8">
                                    <div className="flex justify-between items-center pb-2">
                                        <div>Auto scan</div>
                                        <input className="flex justify-center items-center bg-customwhite w-[230px] h-[30px] text-black text-sm rounded-sm p-2" />
                                    </div>
                                    <div className="flex justify-between items-center pb-2">
                                        <div>Name</div>
                                        <input className="flex justify-center items-center bg-customwhite w-[230px] h-[30px] text-black text-sm rounded-sm p-2" />
                                    </div>
                                    <div className="flex justify-between items-center pb-2">
                                        <div>URL</div>
                                        <input className="flex justify-center items-center bg-customwhite w-[230px] h-[30px] text-black text-sm rounded-sm p-2" />
                                    </div>
                                    <div className="flex justify-between items-center pb-2">
                                        <div>ONVIF Username</div>
                                        <input className="flex justify-center items-center bg-customwhite w-[230px] h-[30px] text-black text-sm rounded-sm p-2" />
                                    </div>
                                    <div className="flex justify-between items-center pb-2">
                                        <div>ONVIF Password</div>
                                        <input className="flex justify-center items-center bg-customwhite w-[230px] h-[30px] text-black text-sm rounded-sm p-2" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>Connections Test</div>
                                        <input className="flex justify-center items-center bg-customwhite w-[230px] h-[30px] text-black text-sm rounded-sm p-2" />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-8">
                                    <button className="flex justify-center items-center w-28 bg-customฺButton p-2 rounded-md hover:bg-customฺButtomHover">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Layout Button */}
                <button
                    onClick={toggleLayout}
                    className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
                >
                    <Icon icon="mingcute:layout-6-fill" width="24" height="24" />
                </button>

                {/* Edit Camera Button */}
                <button
                    onClick={toggleEditCamera}
                    className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
                >
                    <Icon icon="cuida:edit-outline" width="24" height="24" />
                </button>

                {/* Edit Camera Popup */}
                {EditCamera && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-customBlue p-2 rounded-md">
                            <div className="flex justify-end w-full cursor-pointer p-2">
                                <Icon onClick={closePopup} icon="icon-park-solid:close-one" width="30" height="30" />
                            </div>
                            <div className="w-80 h-auto bg-customBlue p-6 shadow-lg rounded-2xl">
                                <div className="text-2xl font-bold pb-2">Detections Detail</div>
                                <div className="flex justify-between pt-2">
                                    <div className="flex justify-center items-center">
                                        Zone Name
                                        <Icon className="p-1" icon="healthicons:yes-outline" width="24" height="24" style={{ color: 'green' }} />
                                    </div>
                                    <input className="flex justify-center items-center bg-customwhite w-32 h-[30px] text-black text-sm rounded-sm p-2" />
                                </div>
                                <div className="flex justify-between pt-2">
                                    <div>Camera Name</div>
                                    <input className="flex justify-center items-center bg-customwhite w-32 h-[30px] text-black text-sm rounded-sm p-2" />
                                </div>
                                <div className="flex justify-end pt-6">
                                    <button className="flex justify-center items-center w-28 bg-customฺButton p-2 rounded-md hover:bg-customฺButtomHover">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditLayout;
