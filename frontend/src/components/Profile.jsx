import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TextField } from "@mui/material";
import { RiSaveLine } from "react-icons/ri";
import { MdCheck, MdClose } from 'react-icons/md';
import { Link } from "react-router-dom";
export default function Profile() {
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({
        firstName: "Petar",
        lastName: "Petrov",
        username: "Peshkata36",
        email: "ppetrov@abc.bg",
        password: "*********"
    })
    const favoriteGames = [
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium" },
    ]

    const assignedGames = [
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park", assigner: "nm@abv.bg" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium", assigner: "nm@abv.bg" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park", assigner: "sdf@abv.bg" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium", assigner: "sog@abv.bg" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park", assigner: "lm@abv.bg" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium", assigner: "nm@abv.bg" },
    ]
    return (
        <div className="h-full w-full flex flex-row gap-4 p-10">
            <div className="w-[300px] h-fit flex flex-col items-center gap-4 p-5 shadow-xl rounded-md bg-white">
                <img src="https://placehold.co/200x200" className="rounded-full border-black border-[1.5px]" />
                <div className="text-2xl font-semibold">
                    {data.firstName} {data.lastName}
                </div>
            </div>
            <div className="h-full bg-line w-[2px] rounded"></div>
            <div className="flex flex-col flex-1 gap-2 ">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Account Info</h2>
                        <button
                            className={`flex items-center gap-2 px-4 py-2 text-lg font-medium rounded border-2 transition ${isEdit
                                ? "border-green-500 text-green-600 hover:bg-green-50"
                                : "border-gray-500 text-gray-600 hover:bg-gray-50"
                                }`}
                            onClick={() => setIsEdit(!isEdit)}
                        >
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
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <label className="w-1/4 text-lg font-medium text-gray-700">Email:</label>
                            {!isEdit ? (
                                <span className="w-3/4 text-gray-800">{data.email}</span>
                            ) : (
                                <TextField
                                    className="w-3/4"
                                    variant="outlined"
                                    size="small"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="w-1/4 text-lg font-medium text-gray-700">Password:</label>
                            {!isEdit ? (
                                <span className="w-3/4 text-gray-800">{data.password}</span>
                            ) : (
                                <TextField
                                    className="w-3/4"
                                    variant="outlined"
                                    size="small"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <hr className="border-t-2 w-full border-line">
                </hr>
                <div className="bg-white flex flex-col drop-shadow-lg rounded py-5 px-3">
                    <h2 className="text-2xl font-semibold">Favorite games</h2>
                    <div className="flex flex-row justify-around gap-y-2 flex-wrap h-[230px] overflow-y-auto py-5 px-2">
                        {favoriteGames.map((game) => <div className="w-[30%] h-[200px] flex flex-col justify-around py-2 rounded items-center text-gray-500 bg-white  font-semibold drop-shadow-md">
                            <div className="flex flex-col text-gray-500 text-2xs font-semibold ">
                                <div className="text-center">
                                    {game.venue}
                                </div>
                                <div className="text-center">
                                    {new Date(game.datetime).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="grid grid-cols-3  w-10/12">
                                <div className="flex flex-col items-center gap-2 text-3xs font-semibold text-nowrap">
                                    <img src={game.home.logo}></img>
                                    {game.home.teamName}
                                </div>
                                <div className="flex flex-row gap-2 items-center justify-center text-lg font-semibold">
                                    <h3>
                                        {game.home.result}
                                    </h3>
                                    -
                                    <h3>
                                        {game.away.result}
                                    </h3>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-3xs font-semibold text-nowrap">
                                    <img src={game.away.logo}></img>
                                    {game.away.teamName}
                                </div>
                            </div>
                            <Link className="p-2 rounded bg-blue-500 hover:bg-blue-400 text-white text-xs ease-in-out text-center duration-150" to={`/games/${game.id}`}>More Info</Link>
                        </div>)}
                    </div>
                </div>
                <div className="bg-white flex flex-col drop-shadow-lg rounded py-5 px-3">
                    <h2 className="text-2xl font-semibold">Scoresheet assignments</h2>
                    <div className="flex flex-row justify-around gap-y-2 flex-wrap h-[350px] overflow-y-auto py-5 px-2">
                        {assignedGames.map((game) => <div className="w-[30%] h-[280px] flex flex-col justify-around py-2 rounded items-center text-gray-500 bg-white  font-semibold drop-shadow-md">
                            <div className="text-sm">
                                Assigned by: {game.assigner}
                            </div>
                            <div className="flex flex-col text-gray-500 text-2xs font-semibold ">
                                <div className="text-center">
                                    {game.venue}
                                </div>
                                <div className="text-center">
                                    {new Date(game.datetime).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="grid grid-cols-3  w-10/12">
                                <div className="flex flex-col items-center gap-2 text-3xs font-semibold text-nowrap">
                                    <img src={game.home.logo}></img>
                                    {game.home.teamName}
                                </div>
                                <div className="flex flex-row gap-2 items-center justify-center text-lg font-semibold">
                                    <h3>
                                        {game.home.result}
                                    </h3>
                                    -
                                    <h3>
                                        {game.away.result}
                                    </h3>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-3xs font-semibold text-nowrap">
                                    <img src={game.away.logo}></img>
                                    {game.away.teamName}
                                </div>
                            </div>

                            <div className="flex flex-row justify-around w-3/4 text-sm">
                                <button className="p-2 bg-accent_2 hover:bg-accent_3 flex flex-row items-center rounded text-white">
                                    <MdClose size={20} />  Reject
                                </button>
                                <button className="p-2 bg-primary_2 hover:bg-primary_3 flex flex-row items-center rounded  text-white">
                                    <MdCheck size={20} />  Accept
                                </button>

                            </div>
                        </div>)}
                    </div>
                </div>
                <div className="bg-white flex flex-col drop-shadow-lg rounded py-5 px-3">
                    <h2 className="text-2xl font-semibold">To do list</h2>
                    <div className="flex flex-row justify-around gap-y-2 flex-wrap h-[270px] overflow-y-auto py-5 px-2">
                        {favoriteGames.map((game) => <div className="w-[30%] h-[240px] flex flex-col justify-around py-2 rounded items-center text-gray-500 bg-white  font-semibold drop-shadow-md">
                            <div className="flex flex-col text-gray-500 text-2xs font-semibold ">
                                <div className="text-center">
                                    {game.venue}
                                </div>
                                <div className="text-center">
                                    {new Date(game.datetime).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="grid grid-cols-3  w-10/12">
                                <div className="flex flex-col items-center gap-2 text-3xs font-semibold text-nowrap">
                                    <img src={game.home.logo}></img>
                                    {game.home.teamName}
                                </div>
                                <div className="flex flex-row gap-2 items-center justify-center text-lg font-semibold">
                                    <h3>
                                        {game.home.result}
                                    </h3>
                                    -
                                    <h3>
                                        {game.away.result}
                                    </h3>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-3xs font-semibold text-nowrap">
                                    <img src={game.away.logo}></img>
                                    {game.away.teamName}
                                </div>
                            </div>

                            <button className="bg-orange-500 hover:bg-orange-400 text-white text-sm p-2 rounded">
                                Score game
                            </button>
                        </div>)}
                    </div>
                </div>

            </div>
        </div>)
}