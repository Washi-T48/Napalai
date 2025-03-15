"use client";
import React, { useState } from "react";
interface Props {
    setOpenChangePassword: (open: boolean) => void;
  }
const ChangePassBox:React.FC<Props> = ({ setOpenChangePassword }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            return alert("Please fill in all fields.");
        }
        if (newPassword !== confirmPassword) {
            return alert("New password and confirm password do not match.");
        }

        setLoading(true);
        try {
            const res = await fetch("/api/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ oldpassword: oldPassword, newpassword: newPassword }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            alert("Password changed successfully!");
            setOpenChangePassword(false); 
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unexpected error occurred.");
            }
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
                <h1 className="text-lg font-medium text-white">Change Password</h1>

                <div className="space-y-3 pt-3">
                    <label htmlFor="oldpassword" className="text-xs text-white">Current Password</label>
                    <input
                        type="password"
                        id="oldpassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-2 rounded-md text-sm h-10 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                    />
                </div>

                <div className="space-y-3 pt-3">
                    <label htmlFor="newpassword" className="text-xs text-white">New Password</label>
                    <input
                        type="password"
                        id="newpassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 rounded-md text-sm h-10 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                    />
                </div>

                <div className="space-y-3 pt-3">
                    <label htmlFor="confirmpassword" className="text-xs text-white">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 rounded-md text-sm h-10 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-6 text-white">
                    <button
                        onClick={() => setOpenChangePassword(false)}
                        className="flex justify-center items-center p-2 w-24 h-9 bg-customwhite text-black rounded-sm hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleChangePassword}
                        disabled={loading}
                        className="flex justify-center items-center p-2 w-24 h-9 bg-customฺButton text-white rounded-sm hover:bg-customฺButtomHover"
                    >
                        {/* {loading ? "Saving..." : "Change"} */}
                        submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassBox;