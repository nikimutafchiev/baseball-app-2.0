import { Link } from "react-router-dom"
export default function Tournament() {
    const tournament = {
        "id": 1,
        "name": "Bulgarian Cup",
        "start_date": "2024-01-01",
        "end_date": "2024-01-10",
        "place": "Bulgaria"
    }
    return (
        <div className="bg-white drop-shadow-lg items-center rounded flex flex-row gap-12">
            <img src="https://placehold.co/100x100" />
            <div className="text-sm font-semibold text-gray-700">
                {tournament.place}
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-semibold text-xl">
                    {tournament.name}
                </div>
                <div className="text-sm ">
                    {new Date(tournament.start_date).toLocaleDateString()} - {new Date(tournament.end_date).toLocaleDateString()}
                </div>
            </div>
            <Link className="w-1/5 text-white font-semibold bg-accent_2 hover:bg-accent_3 p-3 rounded text-center" to={`/tournaments/${tournament.id}/games`}>View more</Link>

        </div>)
}