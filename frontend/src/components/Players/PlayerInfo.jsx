import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiSaveLine } from "react-icons/ri";
import { IoReorderThree } from "react-icons/io5";
import useSWR from "swr";
export default function PlayerInfo() {
    const [isEdit, setIsEdit] = useState(false);
    const { id } = useParams();
    const [teamIDs, setTeamIDs] = useState([]);
    const [tournamentIDs, setTournamentIDs] = useState([]);
    const query_params = tournamentIDs.length != 0 ? `?tournament_ids=[${tournamentIDs}]` : "" + teamIDs.length != 0 ? `${tournamentIDs.length != 0 ? "&" : "?"}team_ids=[${teamIDs}]` : ""
    const player = useSWR(`http://localhost:6363/player/${id}`, (url) => fetch(url).then((res) => res.json()));
    const stats = useSWR(`http://localhost:6363/player/${id}/stats/${query_params}`, (url) => fetch(url).then((res) => res.json()));
    const years = ["2021", '2022', '2023', "2024"];
    const teams = useSWR(`http://localhost:6363/player/${id}/teams`, (url) => fetch(url).then((res) => res.json()));
    const tournaments = useSWR(`http://localhost:6363/player/${id}/tournaments`, (url) => fetch(url).then((res) => res.json()));

    useEffect(() => { console.log(tournamentIDs) }, [tournamentIDs]);
    const [isShrinked, setIsShrinked] = useState(false);
    return (
        <>
            {player.data && <div className="flex flex-col md:flex-row w-full gap-8 text-white text-sm ">
                {!isShrinked &&
                    <div className="relative md:w-1/4">
                        <div className="flex flex-col h-fit bg-gradient-to-br p-4 gap-4 justify-between items-center min-h-[80vh] from-accent_3 via-accent_2 to-accent_1 rounded ">
                            <button className=" left-1 top-1 absolute rounded-full p-1 bg-accent_1 hover:bg-accent_2 " onClick={() => setIsShrinked(!isShrinked)}>
                                <IoReorderThree size={20} />
                            </button>
                            <h3 className="text-xl font-semibold">
                                {player.data.firstName} {player.data.lastName}
                            </h3>
                            <img className="w-[180px] h-[200px]" src={player.data.image ? player.data.image : "http://placehold.co/180x200"} />
                            <div className="flex flex-col gap-0.5 items-center w-full">
                                {player.data.heigth && <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50" ><div>Height:</div> <div className="w-fit flex flex-row gap-1"><div>{player.data.height}</div><div> cm</div></div></div>}
                                {player.data.weight && <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50"><div>Weigth:</div> <div>{player.data.weigth} kg</div></div>}
                                {player.data.dateOfBirth && <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50"><div>Birthday:</div> <div>{new Date(player.data.dateOfBirth).toLocaleDateString()}</div></div>}
                                {player.data.country && <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50 text-nowrap"><div>Birthplace:</div> <div>{player.data.country}</div></div>}
                                {player.data.battingSide && player.data.throwingArm && <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50"><div>Batting/Throwing:</div><div>{player.data.battingSide}/{player.data.throwingArm}</div> </div>}
                            </div>
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
                    </div>
                }
                {isShrinked &&
                    <div className="size-16">
                        <div className="fixed size-16 bg-gradient-to-br p-4 flex flex-row from-accent_3 via-accent_2 to-accent_1 rounded text-white justify-center">
                            <button className="rounded-full p-2 absolute bg-accent_1 hover:bg-accent_3 " onClick={() => setIsShrinked(!isShrinked)}>
                                <IoReorderThree size={20} />
                            </button>

                        </div>
                    </div>}

                <div className="flex flex-row flex-1 gap-8">
                    <div className="flex flex-col flex-1 text-black gap-4 h-fit">
                        <h3 className="text-3xl font-semibold">Stats overview</h3>
                        <div className="flex flex-col md:flex-row justify-around mb-4 h-40 md:h-12">
                            <div className="md:w-1/4 rounded drop-shadow-lg">
                                <Autocomplete
                                    multiple
                                    limitTags={1}
                                    className="absolute inset-0"
                                    size="small"
                                    options={years}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField label="Year" className="bg-white rounded"{...params} />
                                    )}
                                />
                            </div>
                            <div className=" md:w-1/3 rounded  drop-shadow-lg">
                                <Autocomplete
                                    multiple
                                    limitTags={1}
                                    className="absolute inset-0"
                                    size="small"
                                    options={teams.data ? teams.data : []}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, newValues) => setTeamIDs([...newValues.map((value) => value.id)])}
                                    renderInput={(params) => (
                                        <TextField label="Team" className="bg-white rounded h-fit"{...params} />
                                    )}
                                />
                            </div>
                            <div className=" md:w-1/3 rounded  drop-shadow-lg">
                                <Autocomplete
                                    multiple
                                    limitTags={1}
                                    className="absolute inset-0"
                                    size="small"
                                    options={tournaments.data ? tournaments.data : []}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, newValues) => setTournamentIDs([...newValues.map((value) => value.id)])}
                                    renderInput={(params) => (
                                        <TextField label="Tournament" className="bg-white rounded"{...params} />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { label: "AVG", value: stats.data ? stats.data.AVG.toFixed(3) : 0.000, rank: "#4 in Leaderboard" },
                                { label: "AB", value: stats.data ? stats.data.AB : 0, rank: "#4 in Leaderboard" },
                                { label: "OBP", value: stats.data ? stats.data.OBP.toFixed(3) : 0.000, rank: "#2" },
                                { label: "SO", value: stats.data ? stats.data.SO : 0, rank: "#3" },
                                { label: "BB", value: stats.data ? stats.data.BB : 0, rank: "#5" },
                                { label: "H", value: stats.data ? stats.data.H : 0, rank: "#6" },
                                { label: "PA", value: stats.data ? stats.data.PA : 0, rank: "#11" }
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
                        <div className="flex flex-col md:flex-row justify-around mb-4 h-40 md:h-12">
                            <div className="md:w-1/4 rounded drop-shadow-lg">
                                <Autocomplete
                                    multiple
                                    limitTags={1}
                                    className="absolute inset-0"
                                    size="small"
                                    options={years}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField label="Year" className="bg-white rounded"{...params} />
                                    )}
                                />
                            </div>
                            <div className=" md:w-1/3 rounded  drop-shadow-lg">
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
                            <div className=" md:w-1/3 rounded  drop-shadow-lg">
                                <Autocomplete
                                    multiple
                                    limitTags={1}
                                    className="absolute inset-0"
                                    size="small"
                                    options={tournaments}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField label="Tournament" className="bg-white rounded"{...params} />
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
                        <hr className="border-t-2 border-line"></hr>
                        <h3 className="text-3xl font-semibold">Player comparison</h3>
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

                    </div>
                </div >
            </div >}
        </>)
}