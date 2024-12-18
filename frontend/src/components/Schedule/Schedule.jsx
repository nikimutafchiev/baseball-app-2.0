import GameList from "../Games/GameList";
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function Schedule() {
    const tournaments = [
        {
            "id": 1,
            "name": "Bulgarian Cup",
            "start_date": "2024-01-01",
            "end_date": "2024-01-10"
        },
        {
            "id": 2,
            "name": "European Cup",
            "start_date": "2024-01-01",
            "end_date": "2024-01-10"
        },
        {
            "id": 3,
            "name": "Malta Cup",
            "start_date": "2024-01-01",
            "end_date": "2024-01-10"
        },
        {
            "id": 4,
            "name": "Serbian Cup",
            "start_date": "2024-01-01",
            "end_date": "2024-01-10"
        },
        {
            "id": 5,
            "name": "Moldovian Cup",
            "start_date": "2024-01-01",
            "end_date": "2024-01-10"
        },
        {
            "id": 6,
            "name": "Chinese Cup",
            "start_date": "2024-01-01",
            "end_date": "2024-01-10"
        }
    ]

    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-row justify-end px-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker disablePast format="DD/MM/YYYY" label="Pick date" className="bg-white rounded" />
                </LocalizationProvider>
            </div>
            {tournaments.map((tournament) =>
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold">{tournament.name}</h1>
                    <GameList size="normal" games={[]} />
                    <Link className="w-1/5 text-xl text-white font-semibold bg-accent_2 hover:bg-accent_3 p-3 self-end rounded text-center" to={`/tournaments/${tournament.id}/games`}>View tournament info</Link>
                </div>
            )}
        </div>)
}