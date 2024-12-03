import { TextField } from "@mui/material";
import { RiCloseCircleLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function InputFormTournament(props) {
    const [name, setName] = useState("");
    const errorSubmit = name === "";
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format="DD/MM/YYYY" label="Start date" />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format="DD/MM/YYYY" label="End date" />
                            </LocalizationProvider>
                        </div>

                        <TextField className="w-full" label={<div>Place</div>} variant="outlined" />

                    </div>
                </div>
                <button className={`bg-primary_2  px-2 py-1 w-2/3  text-lg font-semibold rounded ${errorSubmit ? "cursor-not-allowed bg-primary_1 text-gray-400" : "hover:bg-primary_3 text-white"}`} >Submit</button>
            </div>
        </div >);
}