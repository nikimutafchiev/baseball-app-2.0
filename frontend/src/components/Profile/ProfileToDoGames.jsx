export default function ProfileToDoGames() {
    const favoriteGames = [
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium" },
        { id: 4, datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended", venue: "Porter park" },
        { id: 5, datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live", venue: "Oktomvri stadium" },
    ]
    return (<div className="w-full flex flex-col ">
        <h2 className="text-2xl font-semibold">To do list</h2>
        <div className="grid grid-cols-3 gap-4 py-5 ">
            {favoriteGames.map((game) => <div className=" h-[240px] flex flex-col justify-around py-2 rounded items-center text-gray-500 bg-white  font-semibold drop-shadow-md">
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
    </div>)
}