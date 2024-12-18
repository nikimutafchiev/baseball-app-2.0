import { FaFacebook, FaInstagram, FaLink, FaYoutube } from "react-icons/fa"
import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { IoReorderThree } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import useSWR from "swr"
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiSaveLine, RiTeamLine } from "react-icons/ri";
export default function TeamTournamentInfo(props) {
    const { team_id } = useParams();
    const icons = {
        facebook: <FaFacebook size={20} />,
        instagram: <FaInstagram size={20} />,
        website: <FaLink size={20} />,
        youtube: <FaYoutube size={20} />
    }
    const [isEdit, setIsEdit] = useState(false);
    const team = useSWR(`http://localhost:6363/team/${team_id}`, (url) => fetch(url).then((res) => res.json()));
    const [isShrinked, setIsShrinked] = useState(false);
    const years = ["2021", '2022', '2023', "2024"];
    const teams = ["Lions", "Blues", "Akademik", "Coyotes", "Buffaloes", "Yunak"];
    return (<>{
        team.data && <div className="w-full h-full flex flex-row gap-4">
            {!isShrinked &&
                <div className="w-1/5 h-fit ">
                    <div className="items-center flex flex-col gap-3 bg-white drop-shadow-lg p-2">
                        <button className="absolute text-black left-2 top-2 rounded-full hover:bg-gray-300 bg-gray-200 p-1" onClick={() => setIsShrinked(!isShrinked)}>
                            <IoReorderThree size={20} />
                        </button>
                        <div className="w-full flex flex-col items-center gap-4">
                            <img src="https://placehold.co/150x150"></img>
                            <h3 className="text-xl font-semibold">{team.data.name}</h3>
                        </div>
                        <hr className="border-t-2 w-full"></hr>
                        <div className="w-full flex flex-col text-gray-500 items-center gap-2 text-xs">
                            <div>Address: {team.data.address}</div>
                            <div>Contact: {team.data.contact}</div>
                        </div>
                        <hr className="border-t-2 w-full"></hr>
                        <div className="w-full flex flex-col text-gray-500 items-center gap-2 text-xs">
                            <div>Manager: {team.data.manager}</div>
                            <div>Head Coach: {team.data.headCoach}</div>
                        </div>
                        <div className="w-10/12 flex flex-row justify-around mt-2">
                            {Object.entries(team.data.socialMedia).map(([media, page]) => <a href={page} target="_blank">{icons[media]}</a>)}
                        </div>
                        <Link to={"roster"} className="flex flex-row  items-center border-black border-[1px] rounded w-full gap-4 p-1 px-2 text-xl font-semibold shadow-md hover:bg-gray-100">
                            <RiTeamLine />Roster
                        </Link>
                        <button className={`flex items-center gap-2 px-4 py-2 text-sm bg-white font-medium rounded border-2 transition ${isEdit
                            ? "border-green-500 text-green-600 hover:bg-green-50"
                            : "border-gray-500 text-gray-600 hover:bg-gray-50"
                            }`}
                            onClick={() => setIsEdit(!isEdit)}>
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
                </div>}
            {isShrinked && <div className="relative size-11 ">
                <div className="fixed size-11 bg-white drop-shadow-lg p-2">
                    <button className="absolute text-black left-2 top-2 rounded-full hover:bg-gray-300 bg-gray-200 p-1" onClick={() => setIsShrinked(!isShrinked)}>
                        <IoReorderThree size={20} />
                    </button>
                </div>
            </div>}
            <div className="flex flex-1 flex-row gap-8">
                <div className="bg-line w-[2px]"></div>
                <div className="flex flex-1 flex-col gap-4 h-fit">
                    <h3 className="text-3xl font-semibold">Stats overview</h3>
                    <div className="flex flex-row justify-around h-12">
                        <div className=" w-1/3 rounded  drop-shadow-lg">
                            <Autocomplete
                                multiple
                                limitTags={1}
                                className="absolute inset-0"
                                size="small"
                                options={teams}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField label="Team" className="bg-white rounded h-fit"{...params} />
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "AVG", value: "0.707", rank: "#4" },
                            { label: "W-L", value: "12-23", rank: "#2" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 h-28 rounded-2xl shadow-lg flex flex-col justify-between"
                            >
                                <div className="flex flex-row text-lg justify-between items-center">
                                    <div className="font-bold text-gray-800">{stat.label}</div>
                                    <div className=" text-gray-500">{stat.rank}</div>
                                </div>
                                <div className="text-5xl font-semibold text-gray-700">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                    <hr className="border-t-2 border-line"></hr>
                    <h3 className="text-3xl font-semibold">Detailed stats</h3>
                    <div className="flex flex-row justify-around h-12">

                        <div className=" w-1/3 rounded  drop-shadow-lg">
                            <Autocomplete
                                multiple
                                limitTags={1}
                                className="absolute inset-0"
                                size="small"
                                options={teams}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField label="Team" className="bg-white rounded h-fit"{...params} />
                                )}
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded self-center drop-shadow-lg">
                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                        >
                            <ToggleButton>Batting</ToggleButton>
                            <ToggleButton>Pitching</ToggleButton>
                            <ToggleButton>Fielding</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <div className="w-full bg-white rounded-2xl drop-shadow-lg h-96">
                        <div className="bg-white rounded">
                            <ToggleButtonGroup
                                color="primary"
                                exclusive
                            >
                                <ToggleButton>Graph</ToggleButton>
                                <ToggleButton>Table</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>

                </div>
            </div>

        </div >
    }
    </>
    )
}