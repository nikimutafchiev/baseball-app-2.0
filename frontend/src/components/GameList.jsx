import { RiCalendarScheduleLine, RiCheckDoubleLine, RiLiveLine } from "react-icons/ri";
export default function GameList() {
    const games = [
        { datetime: "2015-03-25T12:00:00Z", home: { teamName: "Levski FC", result: 0 }, away: { teamName: "CSKA Sofia", result: 0 }, status: "scheduled" },
        { datetime: "2015-03-25T12:00:00Z", home: { teamName: "Levski FC", result: 0 }, away: { teamName: "CSKA Sofia", result: 0 }, status: "live" },
        { datetime: "2015-03-25T12:00:00Z", home: { teamName: "Levski FC", result: 0 }, away: { teamName: "CSKA Sofia", result: 0 }, status: "scheduled" },
        { datetime: "2015-03-25T12:00:00Z", home: { teamName: "Levski FC", result: 0 }, away: { teamName: "CSKA Sofia", result: 0 }, status: "ended" },
        { datetime: "2015-03-25T12:00:00Z", home: { teamName: "Levski FC", result: 0 }, away: { teamName: "CSKA Sofia", result: 0 }, status: "live" }
    ];
    const statusIcons = {
        live: <RiLiveLine color="red" size={30} />,
        scheduled: <RiCalendarScheduleLine size={30} />,
        ended: <RiCheckDoubleLine size={30} />
    };
    return (
        <div className="my-20 mx-10 flex flex-col gap-8" >
            {
                games.map((game) =>
                    <div className="w-full flex flex-row justify-evenly px-10 py-4 rounded items-center bg-primary_2 text-white font-semibold text-xl  drop-shadow-xl">
                        <div className="w-[20%] flex flex-col gap-2 items-center"><div className="flex flex-row gap-2">{statusIcons[game.status]}{game.status}</div><div className=" font-semibold text-sm" >{new Date(game.datetime).toLocaleString()}</div></div>
                        <div className="flex flex-row justify-around items-center w-3/5">
                            <div>{game.home.teamName}</div>
                            <div className="text-5xl font-bold">{game.home.result} - {game.away.result}</div>
                            <div>{game.away.teamName}</div>
                        </div>
                        <button className="w-[15%] px-2 py-3 bg-accent_1 rounded text-white hover:bg-accent_2 ease-in-out duration-150">More info</button>
                    </div>
                )
            }

        </div >)
}