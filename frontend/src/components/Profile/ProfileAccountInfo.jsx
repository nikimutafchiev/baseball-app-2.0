import { useState } from "react";
import { useAuth } from "../../AuthContext";
export default function ProfileAccountInfo() {
    const { user } = useAuth();
    return (
        <div className="w-full p-6 flex flex-col  bg-white rounded-lg shadow-md h-1/2">
            <div className="flex flex-row justify-between items-center mb-6 ">
                <h2 className="text-2xl font-bold text-gray-800">Account Info</h2>
            </div>
            <div className="flex flex-1 flex-col justify-around">
                <div className="flex items-center gap-4">
                    <label className="w-1/4 text-lg font-medium text-gray-700">Email:</label>

                    <span className="w-3/4 text-gray-800">{user.username}</span>

                </div>

            </div>
        </div>)
}