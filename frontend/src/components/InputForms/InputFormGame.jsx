import { TextField } from "@mui/material"
import { RiCloseCircleLine } from "react-icons/ri"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
export default function InputFormGame(props) {
    const errorSubmit = false;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTeam, setAwayTeam] = useState("");
    const [datetime, setDatetime] = useState(dayjs());
    useEffect(() => {
        if (isSubmitted) {
            const time = new Date(datetime);
            console.log({
                year: time.getUTCFullYear(),
                month: time.getUTCMonth() + 1,
                day: time.getUTCDate(),
                hour: time.getUTCHours(),
                minutes: time.getUTCMinutes(),
            });
            fetch("http://localhost:6363/game", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    homeTeam: homeTeam,
                    awayTeam: awayTeam,
                    startTime: {
                        year: time.getUTCFullYear(),
                        month: time.getUTCMonth() + 1,
                        day: time.getUTCDate(),
                        hour: time.getUTCHours(),
                        minutes: time.getUTCMinutes(),
                    }
                }),
            });
            setHomeTeam("");
            setAwayTeam("");
            setIsSubmitted(false);
        }
    }, [isSubmitted]);
    return (<>
        <div className="top-10 absolute self-center z-20 w-7/12 p-2 px-4 bg-white rounded border-black border-[1px] drop-shadow-xl">
            <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            <div className=" flex flex-col items-center gap-4 px-2">
                <div className="w-full grid grid-cols-1 gap-y-2 mt-12">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker value={datetime} onChange={(newValue) => setDatetime(newValue)} label="Start time" format="DD/MM/YYYY HH:mm" className="bg-white rounded" />
                    </LocalizationProvider>
                    <TextField label={<div >Home team</div>} value={homeTeam} onChange={(e) => { setHomeTeam(e.target.value) }} variant="outlined" />
                    <TextField label={<div >Away team</div>} value={awayTeam} onChange={(e) => { setAwayTeam(e.target.value) }} variant="outlined" />

                </div>
                <button className={`bg-primary_2 w-1/2 self-center px-2 py-1 align-middle  text-lg font-semibold rounded ${errorSubmit ? "cursor-not-allowed bg-primary_1 text-gray-400" : "hover:bg-primary_3 text-white"}`} onClick={() => {
                    if (!errorSubmit)
                        setIsSubmitted(true);
                }}>Submit</button>
            </div>
        </div>
    </>)
}