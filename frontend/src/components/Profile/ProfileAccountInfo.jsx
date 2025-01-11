import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TextField } from "@mui/material";
import { RiSaveLine } from "react-icons/ri";
import { useAuth } from "../../AuthContext";
export default function ProfileAccountInfo() {
    const [isEdit, setIsEdit] = useState(false);
    const { user } = useAuth();
    return (
        <div className="w-full p-6 flex flex-col  bg-white rounded-lg shadow-md h-1/2">
            <div className="flex flex-row justify-between items-center mb-6 ">
                <h2 className="text-2xl font-bold text-gray-800">Account Info</h2>
                <button
                    className={`flex items-center gap-2 px-4 py-2 text-lg font-medium rounded border-2 transition ${isEdit
                        ? "border-green-500 text-green-600 hover:bg-green-50"
                        : "border-gray-500 text-gray-600 hover:bg-gray-50"
                        }`}
                    onClick={() => setIsEdit(!isEdit)}
                >
                    {isEdit ? (
                        <>
                            <RiSaveLine size={20} />
                            Save
                        </>
                    ) : (
                        <>
                            <BiEdit size={20} />
                            Edit
                        </>
                    )}
                </button>
            </div>
            <div className="flex flex-1 flex-col justify-around">
                <div className="flex items-center gap-4">
                    <label className="w-1/4 text-lg font-medium text-gray-700">Email:</label>

                    <span className="w-3/4 text-gray-800">{user.username}</span>

                </div>

            </div>
        </div>)
}