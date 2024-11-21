import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { TextField, InputAdornment, Button, InputLabel } from "@mui/material";
import { RiCloseCircleLine } from "react-icons/ri";

export default function InputFormPlayer(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState({ day: "", month: "", year: "" });
    const [height, setHeight] = useState("");
    const [weigth, setWeigth] = useState("");
    const [throwingArm, setThrowingArm] = useState("");
    const [battingSide, setBattingSide] = useState("");
    const [gender, setGender] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const arms = [{
        value: "L",
        label: "Left"
    },
    {
        value: "R",
        label: "Right"
    },
    {
        value: "S",
        label: "Both"
    }
    ];

    const genders = [
        { value: "M", label: "Male" }, { value: "F", label: "Female" }
    ]


    useEffect((() => {
        if (isSubmitted) {
            fetch("http://localhost:5000/add_player", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth,
                    height: height,
                    weigth: weigth,
                    throwingArm: throwingArm,
                    battingSide: battingSide,
                    gender: gender
                }),
            });
            setFirstName("");
            setLastName("");
            setDateOfBirth({ day: "", month: "", year: "" });
            setHeight("");
            setWeigth("");
            setThrowingArm("");
            setBattingSide("");
            setGender("");
            setIsSubmitted(false);
        }
    }), [isSubmitted]);
    const [errorWeigth, setErrorWeigth] = useState(false);
    const [errorHeight, setErrorHeigth] = useState(false);
    const [errorDay, setErrorDay] = useState(false);
    const [errorMonth, setErrorMonth] = useState(false);
    const [errorYear, setErrorYear] = useState(false);
    const errorSubmit = errorHeight || errorWeigth || errorDay || errorMonth || errorYear || firstName === "" || lastName === "";
    const maxDays = (month, year) => {
        if (month == "" || errorMonth)
            return 31;
        if (year == "")
            return months[month - 1];
        return months[month - 1] + (month == 2 && year % 400 == 0 || (year % 100 != 0 && year % 4 == 0));
    }
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return (
        <div className="top-10 fixed self-center z-20 w-5/12 p-2 px-4 bg-white rounded border-black border-[1px] drop-shadow-xl">
            <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            <div className="py-2 flex flex-col items-center gap-4">
                <div className="w-full flex flex-col gap-4">
                    <div className='flex flex-row self-center gap-4 items-center'>
                        <div className='w-[150px] h-[200px] bg-gray-300 rounded'></div>
                        <button className='w-[120px] h-fit bg-blue-400 rounded p-3 text-white text-sm font-semibold'>Upload photo</button>
                    </div>
                    <div className="flex flex-row gap-2">
                        <TextField label={<div className="text-sm">First name*</div>} variant="outlined" className="w-1/2" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} size="small"></TextField>
                        <TextField label={<div className="text-sm">Last name*</div>} variant="outlined" className="w-1/2" onChange={(e) => { setLastName(e.target.value) }} value={lastName} size="small"></TextField>
                    </div>
                    <div className=" w-4/5 flex flex-col gap-1 ">
                        <InputLabel><div className="text-sm">Date of birth</div></InputLabel>
                        <div className="grid grid-cols-3 gap-2">
                            <TextField size="small" type="number" label={<div className="text-sm">Day</div>} variant="outlined" onChange={(e) => { setDateOfBirth({ ...dateOfBirth, day: e.target.value }); setErrorDay(e.target.value !== "" && (e.target.value < 1 || e.target.value > maxDays(dateOfBirth.month, dateOfBirth.year))) }} value={dateOfBirth.day} error={errorDay} helperText={errorDay ? <div className="w-fit text-nowrap text-5xs">Date must be in range (1-{maxDays(dateOfBirth.month, dateOfBirth.year)})</div> : ""}></TextField>
                            <TextField size="small" type="number" label={<div className="text-sm">Month</div>} variant="outlined" onChange={(e) => { setDateOfBirth({ ...dateOfBirth, month: e.target.value }); setErrorMonth(e.target.value !== "" && (e.target.value < 1 || e.target.value > 12)) }} value={dateOfBirth.month} error={errorMonth} helperText={errorMonth ? <div className="w-fit text-nowrap text-5xs">Month must be in range (1-12)</div> : ""}></TextField>
                            <TextField size="small" type="number" label={<div className="text-sm">Year</div>} variant="outlined" onChange={(e) => { setDateOfBirth({ ...dateOfBirth, year: e.target.value }); setErrorYear(e.target.value !== "" && (e.target.value < 1900 || e.target.value > 2024)) }} value={dateOfBirth.year} error={errorYear} helperText={errorYear ? <div className="w-fit text-nowrap text-5xs">Date must be in range (1900-2024)</div> : ""}></TextField>
                        </div>
                    </div>
                    <div className="gap-6 grid grid-cols-3">
                        <TextField
                            size="small"
                            select
                            label={<div className="text-sm">Gender</div>}
                            onChange={(e) => { setGender(e.target.value) }}
                            value={gender}
                        >
                            {genders.map((option) => (
                                <MenuItem key={option.value} value={option.value} >
                                    {<div className="text-sm">{option.label}</div>}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            size="small"
                            type="number"
                            label={<div className="text-sm">Height</div>}
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment >{<div className="text-sm ml-1">cm</div>}</InputAdornment>,
                                },
                            }}
                            onChange={(e) => { setHeight(e.target.value); setErrorHeigth(e.target.value !== "" && (e.target.value < 60 || e.target.value > 250)) }}
                            value={height}
                            error={errorHeight}
                            helperText={errorHeight ? "60 ÷ 250 cm" : ""}
                        />
                        <TextField
                            size="small"
                            type="number"
                            label={<div className="text-sm">Weigth</div>}
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment >{<div className="text-sm ml-1">kg</div>}</InputAdornment>,
                                },
                            }}
                            onChange={(e) => { setWeigth(e.target.value); setErrorWeigth(e.target.value !== "" && (e.target.value < 20 || e.target.value > 250)) }}
                            value={weigth}
                            error={errorWeigth}
                            helperText={errorWeigth ? "20 ÷ 250 kg" : ""}
                        />

                    </div>
                    <div className="w-full grid grid-cols-2 gap-4">
                        <TextField
                            size="small"
                            select
                            label={<div className="text-sm">Throwing arm</div>}
                            onChange={(e) => { setThrowingArm(e.target.value) }}
                            value={throwingArm}
                        >
                            {arms.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {<div className="text-sm">{option.label}</div>}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            size="small"
                            select
                            label={<div className="text-sm">Batting side</div>}
                            onChange={(e) => { setBattingSide(e.target.value) }}
                            value={battingSide}
                        >
                            {arms.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {<div className="text-sm">{option.label}</div>}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <button className={`bg-primary_2  px-2 py-1 w-1/2  text-lg font-semibold rounded ${errorSubmit ? "cursor-not-allowed bg-primary_1 text-gray-400" : "hover:bg-primary_3 text-white"}`}>Submit</button>
            </div>
        </div>);
}