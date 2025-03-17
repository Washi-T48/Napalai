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
            <div className="bg-customBlue p-6 rounded-lg ">
                <h1 className="text-lg font-medium text-white">Change Password</h1>

                <div className="flex flex-col space-y-3 pt-3">
                    <label htmlFor="oldpassword" className="text-xs px-2 text-white">Current Password</label>
                    <input
                        type="password"
                        id="oldpassword"
                        placeholder="Enter your current password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-96 px-3 py-2 mt-1 pb-8 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col space-y-3 pt-3">
                    <label htmlFor="newpassword" className="text-xs px-2 text-white">New Password</label>
                    <input
                        type="password"
                        id="newpassword"
                        placeholder="Enter a new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-96 px-3 py-2 mt-1 pb-8 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col space-y-3 pt-3">
                    <label htmlFor="confirmpassword" className="text-xs px-2 text-white">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-96 px-3 py-2 mt-1 pb-8 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-6 text-white">
                    <button
                        onClick={() => setOpenChangePassword(false)}
                        className="btn btn-cancle"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleChangePassword}
                        disabled={loading}
                        className="btn btn-outline"
                    >
                        
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassBox;