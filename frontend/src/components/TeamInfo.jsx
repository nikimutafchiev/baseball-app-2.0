import { FaFacebook, FaInstagram, FaLink, FaYoutube } from "react-icons/fa"
import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { Link } from "react-router-dom"
export default function TeamInfo() {
    const icons = {
        facebook: <FaFacebook size={30} />,
        instagram: <FaInstagram size={30} />,
        website: <FaLink size={30} />,
        youtube: <FaYoutube size={30} />
    }
    const socialMedia = {
        "facebook": "https://google.com",
        "instagram": "https://google.com",
        "website": "https://google.com",
        "youtube": "https://google.com"
    }
    const years = ["2021", '2022', '2023', "2024"];
    const teams = ["Lions", "Blues", "Akademik", "Coyotes", "Buffaloes", "Yunak"];
    const tournaments = ["Bulgarian Cup", "Champions League", "World cup"];
    return (
        <div className="w-full h-full flex flex-row gap-4 p-10">
            <div className="w-1/5 items-center flex flex-col gap-4 bg-white drop-shadow-lg p-2 h-fit">
                <div className="w-full flex flex-col items-center gap-4">
                    <img src="https://placehold.co/150x150"></img>
                    <h3 className="text-xl font-semibold">Akademiks Sofia</h3>
                </div>
                <hr className="border-t-2 w-full"></hr>
                <div className="w-full flex flex-col text-gray-500 items-center gap-2 text-xs">
                    <div>Home stadium: Oktomvri Stadium</div>
                    <div>Contacts: +0888 123 456</div>
                </div>
                <hr className="border-t-2 w-full"></hr>
                <div className="w-full flex flex-col text-gray-500 items-center gap-2 text-xs">
                    <div>Manager: Youri Alkalay</div>
                    <div>Head Coach: Yavor Andreev</div>
                </div>
                <div className="w-10/12  flex flex-row justify-around mt-2">
                    {Object.entries(socialMedia).map(([media, page]) => <a href={page} target="_blank">{icons[media]}</a>)}
                </div>
            </div>

            <div className="flex flex-1 flex-row gap-8">
                <div className="bg-line w-[2px]"></div>
                <div className="flex flex-1 flex-col gap-4 h-fit">
                    <h3 className="text-3xl font-semibold">Stats overview</h3>
                    <div className="flex flex-row justify-around h-12">
                        <div className="w-1/4 rounded drop-shadow-lg">
                            <Autocomplete
                                multiple
                                limitTags={1}
                                className="absolute inset-0"
                                size="small"
                                options={years}
                                defaultValue={[years[years.length - 1]]}
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
                    <h3 className="text-3xl font-semibold">Head 2 head with other teams</h3>
                    <div className="flex flex-col">
                        <div
                            className="bg-white p-4 h-28 rounded-2xl shadow-lg flex flex-col justify-between w-1/2 items-center self-center"
                        >
                            <div className="text-2xl font-bold text-gray-800">W-L</div>
                            <div className="text-5xl font-semibold text-gray-700">12-11</div>
                        </div>
                        <div>
                            <h6 className="text-lg font-semibold">H2H stats</h6>
                            <div className="grid grid-cols-3 font-semibold bg-white px-6 py-3 rounded drop-shadow-lg">
                                {
                                    [
                                        { "team1": "12", "type": "H", "team2": "24" },
                                        { "team1": "0.070", "type": "OPS", "team2": "0.123" },
                                        { "team1": "0.637", "type": "OBP", "team2": "0.125" },
                                        { "team1": "0.327", "type": "AVG", "team2": "0.789" }
                                    ].map((stat) => <>
                                        <div className={`text-left border-r-2 ${stat.team1 > stat.team2 ? "bg-green-100" : ""}`}>{stat.team1}</div>
                                        <div className="text-center">{stat.type}</div>
                                        <div className={`text-right border-l-2 ${stat.team1 < stat.team2 ? "bg-green-100" : ""}`}>{stat.team2}</div>
                                    </>)
                                }
                            </div>
                        </div>
                        <div>
                            <h6 className="text-lg font-semibold">Last 5 games</h6>
                            <div className="flex flex-col w-full gap-2">
                                {[
                                    { id: 1, datetime: "2024-01-15T18:00:00Z", isAdmin: true, home: { logo: "https://placehold.co/40x40", teamName: "Levski FC", result: 2 }, away: { logo: "https://placehold.co/40x40", teamName: "CSKA Sofia", result: 1 }, status: "ended" },
                                    { id: 2, datetime: "2024-01-16T15:30:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Ludogorets", result: 3 }, away: { logo: "https://placehold.co/40x40", teamName: "Beroe", result: 3 }, status: "live" },
                                    { id: 3, datetime: "2024-01-17T20:00:00Z", isAdmin: true, home: { logo: "https://placehold.co/40x40", teamName: "Cherno More", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Lokomotiv Plovdiv", result: 0 }, status: "scheduled" },
                                    { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended" },
                                    { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live" },
                                ].map((game) =>
                                    <div className="w-full flex flex-row justify-around px-8 py-2 rounded items-center text-gray-500 bg-white  font-semibold  drop-shadow-xl">
                                        <div className="w-1/5 flex flex-col gap-2 items-center"><div className=" font-semibold text-2xs" >{new Date(game.datetime).toLocaleString()}</div></div>
                                        <div className="flex flex-row justify-around items-center w-[70%]">
                                            <div className='w-[20%] text-xs flex flex-row gap-4 items-center'><div className='w-1/2 text-center'>{game.home.teamName}</div><img src={game.home.logo}></img></div>
                                            <div className="text-xl font-bold w-[10%]">{game.home.result} - {game.away.result}</div>
                                            <div className='w-[20%] text-xs flex flex-row gap-4 items-center'><img src={game.away.logo}></img><div className='w-1/2 text-center text-xs'>{game.away.teamName}</div></div>
                                        </div>
                                        <Link className="w-[10%] py-2 rounded bg-blue-500 hover:bg-blue-400 text-white text-xs ease-in-out text-center duration-150" to={`/games/${game.id}`}>More Info</Link>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}