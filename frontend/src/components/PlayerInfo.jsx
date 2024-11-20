import { Autocomplete, TextField } from "@mui/material"
export default function PlayerInfo() {
    const years = ["2021", '2022', '2023', "2024"];
    const teams = ["Lions", "Blues", "Akademik", "Coyotes", "Buffaloes", "Yunak"];
    const tournaments = ["Bulgarian Cup", "Champions League", "World cup"];
    return (
        <div className="flex flex-row w-full h-full p-10 gap-8 text-white text-sm">
            <div className="flex flex-col bg-gradient-to-br px-8 py-4 justify-between items-center from-accent_3 via-accent_2 to-accent_1 rounded ">
                <h3 className="text-2xl font-semibold">
                    Ivan Ivanov
                </h3>
                <img src="https://placehold.co/150x200" />
                <div className="flex flex-col gap-1.5 items-center">
                    <div className="font-semibold">Height: 187 cm</div>
                    <div className="font-semibold">Weigth: 81 kg</div>
                    <div className="font-semibold">Birthday: 2002-12-12</div>
                    <div className="font-semibold">Birthplace: Bulgaria</div>
                    <div className="font-semibold">Batting/Throwing: L/R</div>
                </div>
                <div className="text-gray-200 text-2xs italic text-center ">Success is the sum of small efforts repeated daily.</div>
            </div>
            <div className="h-full bg-gray-800 w-[2px] rounded"></div>
            <div className="flex flex-col flex-1 text-black gap-4">
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
                                <TextField label="Година" className="bg-white rounded"{...params} />
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
                                <TextField label="Отбор" className="bg-white rounded h-fit"{...params} />
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
                                <TextField label="Турнир" className="bg-white rounded"{...params} />
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
                                <TextField label="Година" className="bg-white rounded"{...params} />
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
                                <TextField label="Отбор" className="bg-white rounded h-fit"{...params} />
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
                                <TextField label="Турнир" className="bg-white rounded"{...params} />
                            )}
                        />
                    </div>
                </div>


            </div>
        </div>)
}