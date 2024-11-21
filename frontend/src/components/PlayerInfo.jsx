import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
export default function PlayerInfo() {
    const years = ["2021", '2022', '2023', "2024"];
    const teams = ["Lions", "Blues", "Akademik", "Coyotes", "Buffaloes", "Yunak"];
    const tournaments = ["Bulgarian Cup", "Champions League", "World cup"];
    return (
        <div className="flex flex-row w-full p-10 gap-8 text-white text-sm">
            <div className="flex flex-col bg-gradient-to-br px-8 h-full py-4 gap-4 items-center from-accent_3 via-accent_2 to-accent_1 rounded ">
                <h3 className="text-2xl font-semibold">
                    Ivan Ivanov
                </h3>
                <img src="https://placehold.co/150x200" />
                <div className="flex flex-col gap-0.5 items-center w-full">
                    <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50"><div>Height:</div> <div>187 cm</div></div>
                    <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50"><div>Weigth:</div> <div>81 kg</div></div>
                    <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50"><div>Birthday:</div> <div>2002-12-12</div></div>
                    <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50"><div>Birthplace:</div> <div>Bulgaria</div></div>
                    <div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50"><div>Batting/Throwing:</div><div>L/R</div> </div>
                </div>
                <div className="text-gray-200 text-2xs italic text-center ">Success is the sum of small efforts repeated daily.</div>
            </div>
            <div className="flex flex-row flex-1 gap-8">
                <div className="bg-line w-[2px]"></div>
                <div className="flex flex-col flex-1 text-black gap-4 h-fit">
                    <h3 className="text-3xl font-semibold">Stats overview</h3>
                    <div className="flex flex-row justify-around h-12">
                        <div className="w-1/4 rounded drop-shadow-lg">
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
                        <div className=" w-1/3 rounded  drop-shadow-lg">
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

                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "AVG", value: "0.707", rank: "#4 in Leaderboard" },
                            { label: "OBP", value: "0.815", rank: "#2" },
                            { label: "ERA", value: "2.65", rank: "#1" },
                            { label: "SO", value: "235", rank: "#3" },
                            { label: "BB", value: "78", rank: "#5" },
                            { label: "H", value: "189", rank: "#6" },
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
                        <div className="w-1/4 rounded drop-shadow-lg">
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
                        <div className=" w-1/3 rounded  drop-shadow-lg">
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
        </div >)
}