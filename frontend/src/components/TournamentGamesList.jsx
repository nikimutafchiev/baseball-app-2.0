import GameList from "./GameList";

export default function TournamentGamesList() {
    const tournaments = [
        "Bulgarian Cup",
        "European Cup",
        "Malta Cup",
        "Serbian Cup",
        "Moldovian Cup",
        "Chinese Cup"
    ]
    return (
        <div className="flex flex-col pl-20 py-10">
            {tournaments.map((tournament) =>
                <div >
                    <h1 className="text-5xl font-semibold">{tournament}</h1>
                    <GameList />
                </div>
            )}
        </div>)
}