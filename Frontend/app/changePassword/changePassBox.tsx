"use client";
import React, { useState } from "react";

function ChangePassBox() {
    const [stateForgetPassword, setStateForgetPassword] = useState(false);
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
            if (!res.ok) throw new Error(data.error);

            alert("Password changed successfully!");
            setStateForgetPassword(false); // ปิดหน้าเปลี่ยนรหัสผ่าน
        } catch (error) {
            alert(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="z-10">
            <div className="flex justify-center flex-col items-center border border-customฺBorder p-12 rounded-2xl m-auto">
                {!stateForgetPassword ? (
                    <div className="text-white p-2 ">
                        <h1 className="text-lg font-medium">Change Password</h1>

                        <div className="space-y-3 pt-3">
                            <label htmlFor="oldpassword" className="text-xs">Current Password</label>
                            <input
                                type="password"
                                id="oldpassword"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                            />
                        </div>

                        <div className="space-y-3 pt-3">
                            <label htmlFor="newpassword" className="text-xs">New Password</label>
                            <input
                                type="password"
                                id="newpassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-1  rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                            />
                        </div>

                        <div className="space-y-3 pt-3">
                            <label htmlFor="confirmpassword" className="text-xs">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmpassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-6">
                            <button
                                onClick={handleChangePassword}
                                disabled={loading}
                                className="h-8 p-1 px-4 rounded-sm text-tiny bg-customฺButton hover:bg-customฺButtomHover"
                            >
                                {loading ? "Saving..." : "Change Password"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-white gap-10 h-auto">
                        <h1 className="text-lg font-medium">Change Password</h1>
                        <p>(ยังไม่เปลี่ยนส่วนนี้)</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChangePassBox;
