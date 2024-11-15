import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { TextField, InputAdornment, Button, InputLabel } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from "dayjs";

export default function InputFormPlayer() {
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

    const disabled = firstName.length === 0 || lastName.length === 0;
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

    return (
        <div className="justify-self-center w-1/2 p-2 px-4 text-white bg-slate-300 rounded border-black border-[1px] drop-shadow-xl my-2">

            <div className="py-4 flex flex-col items-center gap-8">
                <div className="w-full flex flex-col gap-8">
                    <div className='flex flex-col self-center gap-8'>
                        <div className='size-[200px] bg-white rounded'></div>
                        <button className='w-[200px] bg-blue-400 rounded p-4'>Качи снимка</button>
                    </div>
                    <TextField label="Име" variant="outlined" className="w-full" required onChange={(e) => { setFirstName(e.target.value) }} value={firstName}></TextField>
                    <TextField label="Фамилия" variant="outlined" className="w-full" required onChange={(e) => { setLastName(e.target.value) }} value={lastName}></TextField>
                    <div className=" w-3/5 flex flex-col gap-1 ">
                        <InputLabel> Дата на раждане</InputLabel>
                        <div className="flex flex-row gap-2">
                            <TextField label="Ден" variant="outlined" onChange={(e) => { setDateOfBirth({ ...dateOfBirth, day: e.target.value }) }} value={dateOfBirth.day}></TextField>
                            <TextField label="Месец" variant="outlined" onChange={(e) => { setDateOfBirth({ ...dateOfBirth, month: e.target.value }) }} value={dateOfBirth.month}></TextField>
                            <TextField label="Година" variant="outlined" onChange={(e) => { setDateOfBirth({ ...dateOfBirth, year: e.target.value }) }} value={dateOfBirth.year}></TextField>
                        </div>
                    </div>
                    <div className="gap-4 grid grid-cols-3">
                        <TextField
                            select
                            label="Пол"
                            onChange={(e) => { setGender(e.target.value) }}
                            value={gender}
                        >
                            {genders.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            type="number"
                            label="Височина"
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment >cm</InputAdornment>,
                                },
                            }}
                            onChange={(e) => { setHeight(e.target.value) }}
                            value={height}
                        />
                        <TextField
                            type="number"
                            label="Тегло"
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment >kg</InputAdornment>,
                                    type: "numeric"
                                },
                            }}
                            onChange={(e) => { setWeigth(e.target.value) }}
                            value={weigth}
                        />

                    </div>
                    <div className="w-full grid grid-cols-2 gap-4">
                        <TextField
                            select
                            label="Хвърляща ръка"
                            onChange={(e) => { setThrowingArm(e.target.value) }}
                            value={throwingArm}
                        >
                            {arms.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Батираща страна"
                            onChange={(e) => { setBattingSide(e.target.value) }}
                            value={battingSide}
                        >
                            {arms.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <Button onClick={() => setIsSubmitted(true)} disabled={disabled} sx={{ backgroundColor: "rgb(251,146,60)", fontSize: "16pt", color: "white" }} className="w-full p-4 bg-otext-3xl font-semibold self-end rounded hover:cursor-pointer" >Потвърди</Button>
            </div>
        </div>);
}