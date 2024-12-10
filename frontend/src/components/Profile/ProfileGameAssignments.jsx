import { MdClose, MdCheck } from "react-icons/md"
export default function ProfileGameAssignments() {
    const assignedGames = [
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park", assigner: "nm@abv.bg" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium", assigner: "nm@abv.bg" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park", assigner: "sdf@abv.bg" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium", assigner: "sog@abv.bg" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park", assigner: "lm@abv.bg" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium", assigner: "nm@abv.bg" },
    ]
    return (<div className="w-full flex flex-col">
        <h2 className="text-2xl font-semibold">Scoresheet assignments</h2>
        <div className="grid grid-cols-3 gap-4 py-5">
            {assignedGames.map((game) => <div className=" h-[280px] flex flex-col justify-around py-2 rounded items-center text-gray-500 bg-white  font-semibold drop-shadow-md">
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
    </div>)
}