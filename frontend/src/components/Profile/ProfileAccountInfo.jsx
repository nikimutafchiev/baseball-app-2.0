import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TextField } from "@mui/material";
import { RiSaveLine } from "react-icons/ri";
export default function ProfileAccountInfo() {
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({
        firstName: "Petar",
        lastName: "Petrov",

        email: "ppetrov@abc.bg",
        password: "*********"
    })
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
                    {!isEdit ? (
                        <span className="w-3/4 text-gray-800">{data.email}</span>
                    ) : (
                        <TextField
                            className="w-3/4"
                            variant="outlined"
                            size="small"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <label className="w-1/4 text-lg font-medium text-gray-700">Password:</label>
                    {!isEdit ? (
                        <span className="w-3/4 text-gray-800">{data.password}</span>
                    ) : (
                        <TextField
                            className="w-3/4"
                            variant="outlined"
                            size="small"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    )}
                </div>
            </div>
        </div>)
}