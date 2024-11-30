import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { TextField, InputAdornment, Button, InputLabel, Autocomplete } from "@mui/material";
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
    const [country, setCountry] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const arms = [{
        value: "LEFTY",
        label: "Left"
    },
    {
        value: "RIGHTY",
        label: "Right"
    },
    {
        value: "AMBIDEXTROUS",
        label: "Both"
    }
    ];

    const genders = [
        { value: "MALE", label: "Male" }, { value: "FEMALE", label: "Female" }
    ]
    const country_list = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
        "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
        "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
        "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
        "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire",
        "Cabo Verde", "Cambodia", "Cameroon", "Canada",
        "Central African Republic", "Chad", "Chile", "China",
        "Colombia", "Comoros", "Congo", "Costa Rica",
        "Croatia", "Cuba", "Cyprus", "Czechia",
        "Democratic Republic of the Congo", "Denmark", "Djibouti",
        "Dominica", "Dominican Republic", "Ecuador", "Egypt",
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
        "Eswatini", "Ethiopia", "Fiji", "Finland",
        "France", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
        "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras",
        "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
        "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
        "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
        "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
        "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
        "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
        "Morocco", "Mozambique", "Myanmar", "Namibia",
        "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
        "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
        "Oman", "Pakistan", "Palau", "Palestine State", "Panama",
        "Papua New Guinea", "Paraguay", "Peru", "Philippines",
        "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
        "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
        "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
        "South Africa", "South Korea", "South Sudan", "Spain",
        "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
        "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
        "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
        "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
        "United Arab Emirates", "United Kingdom", "United States of America",
        "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam",
        "Yemen", "Zambia", "Zimbabwe"
    ];
    useEffect((() => {
        if (isSubmitted) {
            fetch("http://localhost:6363/player", {
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
                    gender: gender,
                    country: country
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
            setCountry("");
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
        <div className="top-6 fixed self-center z-20 w-8/12  bg-white rounded border-black border-[1px] drop-shadow-xl">
            <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            <div className="w-full flex flex-col py-10 px-4">
                <div className="w-full flex flex-row gap-20 py-10 px-4">
                    <div className='flex flex-col self-center gap-4 items-center'>
                        <div className='w-[150px] h-[200px] bg-gray-300 rounded'></div>
                        <button className='w-[120px] h-fit bg-blue-400 rounded p-3 text-white text-sm font-semibold'>Upload photo</button>
                    </div>
                    <div className="py-2 flex flex-col  gap-4">
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
                        <Autocomplete
                            size="small"
                            className="w-3/5"
                            value={country}
                            onChange={(e, newValue) => {
                                setCountry(newValue);
                            }}
                            options={country_list}
                            renderInput={(params) => <TextField {...params} label={<div className="text-sm">Country</div>} />}
                        >
                        </Autocomplete>
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
                                helperText={errorHeight ? <div className="text-5xs text-nowrap w-fit">Height must be between 60 and 250 cm</div> : ""}
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
                                helperText={errorWeigth ? <div className="text-5xs text-nowrap w-fit">Weigth must be between 20 and 250 kg</div> : ""}
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
                </div>
                <button className={`bg-primary_2 w-1/2 self-center px-2 py-1 align-middle  text-lg font-semibold rounded ${errorSubmit ? "cursor-not-allowed bg-primary_1 text-gray-400" : "hover:bg-primary_3 text-white"}`} onClick={() => {
                    if (!errorSubmit)
                        setIsSubmitted(true);
                }}>Submit</button>
            </div>


        </div>);
}