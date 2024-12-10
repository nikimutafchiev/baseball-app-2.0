import { Link } from "react-router-dom"
export default function ProfileFavoriteGames() {
    const favoriteGames = [
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium" },
    ]
    return (<div className="w-full flex flex-col">
        <h2 className="text-2xl font-semibold">Favorite games</h2>
        <div className="grid grid-cols-3 justify-around gap-4 flex-wrap py-5">
            {favoriteGames.map((game) => <div className=" h-[200px] flex flex-col justify-around py-2 rounded items-center text-gray-500 bg-white  font-semibold drop-shadow-md">
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
    </div>)
}