import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TextField } from "@mui/material";
import { RiSaveLine } from "react-icons/ri";
export default function Profile() {
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({
        firstName: "Petar",
        lastName: "Petrov",
        username: "Peshkata36",
        email: "ppetrov@abc.bg",
        password: "*********"
    })
    return (
        <div className="h-full w-full flex flex-row gap-4 p-10">
            <div className="w-[300px] flex flex-col items-center gap-4 p-5 shadow-xl rounded-md bg-white">
                <img src="https://placehold.co/200x200" className="rounded-full border-black border-[1.5px]" />
                <div className="text-2xl font-semibold">
                    {data.firstName} {data.lastName}
                </div>
            </div>
            <div className="h-full bg-line w-[2px] rounded"></div>
            <div className="flex flex-col flex-1 gap-2 ">
                <div className="flex flex-col gap-8 drop-shadow-lg py-5 px-3 rounded bg-white">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-semibold">Account info</h2>
                        <button className="w-1/5 border-2 py-2 border-gray-500 rounded content-center text-lg font-semibold hover:bg-gray-200" onClick={() => setIsEdit(!isEdit)}>{!isEdit && <div className="flex flex-row gap-2 justify-center items-center ">Edit<BiEdit size={25} /></div>}{isEdit && <div className="flex flex-row gap-2 justify-center items-center ">Save<RiSaveLine size={25} /></div>}</button>
                    </div>
                    <div className="w-full h-12 flex flex-row justify-between items-center text-lg text-gray-700 font-semibold">
                        <div className="flex flex-row justify-center items-center w-1/3"><div>Username:</div>{data.username}</div>
                        <div className="flex flex-row justify-center items-center w-1/3"><div>Email:</div>{!isEdit && <div className="w-3/5">{data.email}</div>}{isEdit && <TextField className='w-3/5' variant="outlined" onChange={(e) => { setData({ ...data, email: e.target.value }) }} value={data.email} size="small"></TextField>}</div>
                        <div className="flex flex-row justify-center items-center w-1/3"><div>Password:</div>{!isEdit && <div className="w-3/5">{data.password}</div>}{isEdit && <TextField className='w-3/5' variant="outlined" onChange={(e) => { setData({ ...data, password: e.target.value }) }} value={data.password} size="small"></TextField>}</div>
                    </div>
                </div>
                <hr className="border-t-2 w-full border-line">
                </hr>
                <div className="bg-white flex flex-col drop-shadow-lg rounded py-5 px-3">
                    <h2 className="text-2xl font-semibold">Favorite games</h2>
                </div>
                <div className="bg-white flex flex-col drop-shadow-lg rounded py-5 px-3">
                    <h2 className="text-2xl font-semibold">Favorite teams</h2>
                </div>
                <div className="bg-white flex flex-col drop-shadow-lg rounded py-5 px-3">
                    <h2 className="text-2xl font-semibold">Scoresheet assignments</h2>
                </div>

            </div>
        </div>)
}