import { TextField } from "@mui/material";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaLink, FaYoutube } from "react-icons/fa";
import { useState, useEffect } from "react";
export default function InputFormTeam(props) {
    const icons = {
        facebook: <FaFacebook size={30} />,
        instagram: <FaInstagram size={30} />,
        youtube: <FaYoutube size={30} />,
        website: <FaLink size={30} />

    }
    const [links, setLinks] = useState({
        facebook: "",
        instagram: "",
        youtube: "",
        website: ""

    })
    const [mediaOption, setMediaOption] = useState("facebook");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const errorSubmit = name === "";
    useEffect((() => {
        if (isSubmitted) {
            fetch("http://localhost:6363/team", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    contact: contact,
                    socialMedia: links
                }),
            });
            setName("");
            setAddress("");
            setContact("");
            setLinks({
                facebook: "",
                instagram: "",
                youtube: "",
                website: ""
            });
            setIsSubmitted(false);
        }
    }), [isSubmitted]);
    return (
        <div className="top-10 fixed self-center z-20 w-7/12 p-2 px-4 bg-white rounded border-black border-[1px] drop-shadow-xl">
            <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            <div className="flex flex-col items-center gap-12 mt-12">
                <div className="flex flex-row w-full gap-12">
                    <div className='flex flex-col self-center gap-4'>
                        <div className='size-[200px] bg-gray-300 rounded'></div>
                        <button className='w-[200px] bg-blue-400 rounded p-3 text-white text-sm font-semibold'>Upload photo</button>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <TextField className="w-full" label={<div >Name*</div>} variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                        <div className="grid grid-cols-2 gap-4">
                            <TextField label={<div >Address</div>} onChange={(e) => { setAddress(e.target.value) }} value={address} variant="outlined" />
                            <TextField label={<div >Contact</div>} onChange={(e) => { setContact(e.target.value) }} value={contact} variant="outlined" />
                        </div>
                        <div className="flex flex-row gap-8 self-center text-gray-700">
                            {Object.entries(icons).map(([media, icon]) => <div className="cursor-pointer" onClick={() => setMediaOption(media)}>{icon}</div>)}
                        </div>
                        <TextField label={<div>{mediaOption.charAt().toUpperCase() + mediaOption.slice(1)} link</div>} variant="outlined" value={links[mediaOption]} onChange={(e) => { setLinks({ ...links, [mediaOption]: e.target.value }) }} />
                    </div>
                </div>
                <button className={`bg-primary_2  px-2 py-1 w-2/3  text-lg font-semibold rounded ${errorSubmit ? "cursor-not-allowed bg-primary_1 text-gray-400" : "hover:bg-primary_3 text-white"}`} onClick={() => {
                    if (!errorSubmit)
                        setIsSubmitted(true);
                }
                }>Submit</button>
            </div>
        </div >);
}