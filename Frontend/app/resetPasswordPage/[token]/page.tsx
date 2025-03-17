"use client";

import Image from "next/image";
import Bg from "../../../public/imges/cycleBG.png";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Port from "@/app/port";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${Port.URL}/auth/reset/${token}`, {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
          setErrorMessage(data.message || "Invalid or expired token");
        }
      } catch (error) {
        setIsTokenValid(false);
        setErrorMessage("Failed to verify token. Please try again.");
      }
    };

    checkTokenValidity();
  }, [token]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isTokenValid) {
      setErrorMessage("Invalid or expired token.");
      return;
    }

    try {
      const response = await fetch(`${Port.URL}/auth/reset`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password: newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setIsSuccess(true);
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);  
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  if (!token) {
    return <div>Loading...</div>;
  }

  if (isTokenValid === null) {
    return <div>Verifying token...</div>;
  }

  return (
    <>
      <div className="flex justify-between fixed bg-customBlue text-white p-4 px-14 w-full h-16 z-50">
        <div className="text-3xl font-bold">NAPALAI</div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(170deg, rgba(13, 31, 45, 1) 38%, rgba(28, 47, 64, 1) 78%)",
        }}
        className="w-full h-screen bg-customBlue flex items-center relative"
      >
        <Image
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={Bg}
          alt="Background Image"
        />

        <div className="z-10 flex justify-center flex-col items-center border border-customฺBorder p-8 rounded-2xl w-80 m-auto bg-opacity-80">
          {isSuccess ? (
            <div className="text-green-600 text-center font-medium">
              Your password has been reset successfully! Redirecting to login...
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full space-y-3 text-white"
            >
              <h1 className="text-lg font-medium text-center">
                Reset Your Password
              </h1>

              {errorMessage && (
                <div className="text-red-500 text-center">{errorMessage}</div>
              )}

              <div className="space-y-1 w-full">
                <label htmlFor="newPassword" className="text-xs">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                  required
                />
              </div>

              <div className="space-y-1 w-full">
                <label htmlFor="confirmPassword" className="text-xs">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword
                }
                className="w-full h-8 p-1 rounded-sm text-sm bg-customฺButton hover:bg-customฺButtomHover disabled:bg-gray-400"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
