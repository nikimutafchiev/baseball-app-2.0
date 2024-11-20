import { TextField } from "@mui/material";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa";
import { useState } from "react";
export default function InputFormTeam(props) {
    const icons = {
        facebook: <FaFacebook size={30} />,
        instagram: <FaInstagram size={30} />,
        website: <FaLink size={30} />
    }
    const [links, setLinks] = useState({
        facebook: "",
        instagram: "",
        website: ""
    })
    const [mediaOption, setMediaOption] = useState("facebook");
    const [name, setName] = useState("");
    const errorSubmit = name === "";
    return (
        <div className="top-10 fixed self-center z-20 w-5/12 p-2 px-4 bg-white rounded border-black border-[1px] drop-shadow-xl">
            <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            <div className="py-2 flex flex-col items-center gap-4">
                <div className="w-full flex flex-col gap-4">
                    <div className='flex flex-col self-center gap-4'>
                        <div className='size-[120px] bg-gray-300 rounded'></div>
                        <button className='w-[120px] bg-blue-400 rounded p-3 text-white text-sm font-semibold'>Качи снимка</button>
                    </div>
                    <TextField className="w-full" label={<div >Име *</div>} variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                        <TextField label={<div >Address</div>} variant="outlined" />
                        <TextField label={<div >Contact</div>} variant="outlined" />
                    </div>
                    <div className="flex flex-row gap-8 self-center text-gray-700">
                        {Object.entries(icons).map(([media, icon]) => <div className="cursor-pointer" onClick={() => setMediaOption(media)}>{icon}</div>)}
                    </div>
                    <TextField label={<div>{mediaOption.charAt().toUpperCase() + mediaOption.slice(1)} link</div>} variant="outlined" value={links[mediaOption]} onChange={(e) => { setLinks({ ...links, [mediaOption]: e.target.value }) }} />
                </div>
                <button className={`bg-primary_2  px-2 py-1 w-1/2  text-lg font-semibold rounded ${errorSubmit ? "cursor-not-allowed bg-primary_1 text-gray-400" : "hover:bg-primary_3 text-white"}`} > Потвърди</button>
            </div>
        </div >);
}