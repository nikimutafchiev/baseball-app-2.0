import { Link, useParams } from "react-router-dom";
import Roster from "../components/Roster/Roster";
import useSWR from "swr";
export default function RosterPage() {
    const { id } = useParams();
    const game = useSWR(`http://localhost:6363/game/${id}`, (url) => fetch(url).then((res) => res.json()));
    return (<>{
        game.data && <div className="bg-gray-200 min-h-[90vh] flex flex-row justify-around p-2 ">
            <Link className="rounded font-semibold bg-accent_2 hover:bg-accent_3 text-white drop-shadow-lg h-fit p-2" to={".."} relative="path">Back</Link>
            <Roster team={game.data.homeTeam} tournament={game.data.tournament} />
            <Roster team={game.data.awayTeam} tournament={game.data.tournament} />
            <Link className="rounded font-semibold bg-blue-500 hover:bg-blue-400 text-white drop-shadow-lg h-fit p-2" to={".."} relative="path">Save</Link>
        </div>
    }</>)
}